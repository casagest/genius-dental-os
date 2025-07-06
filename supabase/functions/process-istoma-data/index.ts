import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface IStomaData {
  patients?: any[]
  appointments?: any[]
  invoices?: any[]
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    const { scraped_data, sync_type } = await req.json()

    // Start sync log
    const { data: syncLog, error: syncLogError } = await supabaseClient
      .from('sync_logs')
      .insert({
        user_id: user.id,
        sync_type: sync_type || 'full_sync',
        status: 'started',
        sync_data: { source: 'firecrawl' }
      })
      .select()
      .single()

    if (syncLogError) {
      throw new Error('Failed to create sync log')
    }

    let processedRecords = 0
    let failedRecords = 0
    const results: any = {}

    try {
      // Process patients data
      if (scraped_data.patients) {
        const patientsResult = await processPatients(supabaseClient, user.id, scraped_data.patients)
        results.patients = patientsResult
        processedRecords += patientsResult.processed
        failedRecords += patientsResult.failed
      }

      // Process appointments data
      if (scraped_data.appointments) {
        const appointmentsResult = await processAppointments(supabaseClient, user.id, scraped_data.appointments)
        results.appointments = appointmentsResult
        processedRecords += appointmentsResult.processed
        failedRecords += appointmentsResult.failed
      }

      // Process invoices data
      if (scraped_data.invoices) {
        const invoicesResult = await processInvoices(supabaseClient, user.id, scraped_data.invoices)
        results.invoices = invoicesResult
        processedRecords += invoicesResult.processed
        failedRecords += invoicesResult.failed
      }

      // Update sync log with completion
      await supabaseClient
        .from('sync_logs')
        .update({
          status: 'completed',
          total_records: processedRecords + failedRecords,
          processed_records: processedRecords,
          failed_records: failedRecords,
          completed_at: new Date().toISOString(),
          sync_data: { ...syncLog.sync_data, results }
        })
        .eq('id', syncLog.id)

      return new Response(
        JSON.stringify({
          success: true,
          sync_log_id: syncLog.id,
          processed_records: processedRecords,
          failed_records: failedRecords,
          results
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )

    } catch (processingError) {
      // Update sync log with failure
      await supabaseClient
        .from('sync_logs')
        .update({
          status: 'failed',
          error_message: processingError.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', syncLog.id)

      throw processingError
    }

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

async function processPatients(supabaseClient: any, userId: string, patients: any[]) {
  let processed = 0
  let failed = 0

  for (const patientData of patients) {
    try {
      // Transform iStoma patient data to our schema
      const patient = {
        user_id: userId,
        istoma_patient_id: patientData.id || patientData.patient_id,
        first_name: patientData.first_name || patientData.nume || '',
        last_name: patientData.last_name || patientData.prenume || '',
        email: patientData.email,
        phone: patientData.phone || patientData.telefon,
        date_of_birth: patientData.date_of_birth || patientData.data_nasterii,
        address: patientData.address || patientData.adresa,
        medical_history: patientData.medical_history || {},
        insurance_info: patientData.insurance || {},
        synced_from_istoma: true,
        last_sync_at: new Date().toISOString()
      }

      const { error } = await supabaseClient
        .from('patients')
        .upsert(patient, { 
          onConflict: 'user_id,istoma_patient_id',
          ignoreDuplicates: false 
        })

      if (error) throw error
      processed++
    } catch (error) {
      console.error('Failed to process patient:', error)
      failed++
    }
  }

  return { processed, failed }
}

async function processAppointments(supabaseClient: any, userId: string, appointments: any[]) {
  let processed = 0
  let failed = 0

  for (const appointmentData of appointments) {
    try {
      // Transform iStoma appointment data to our schema
      const appointment = {
        user_id: userId,
        istoma_appointment_id: appointmentData.id || appointmentData.appointment_id,
        title: appointmentData.title || appointmentData.nume_tratament || 'Programare',
        description: appointmentData.description || appointmentData.descriere,
        appointment_date: appointmentData.date || appointmentData.data_programare,
        duration_minutes: appointmentData.duration || 60,
        appointment_type: appointmentData.type || appointmentData.tip_tratament,
        status: appointmentData.status || 'scheduled',
        doctor_name: appointmentData.doctor || appointmentData.medic,
        treatment_plan: appointmentData.treatment_plan || {},
        notes: appointmentData.notes || appointmentData.observatii,
        synced_from_istoma: true,
        last_sync_at: new Date().toISOString()
      }

      const { error } = await supabaseClient
        .from('appointments')
        .upsert(appointment, { 
          onConflict: 'user_id,istoma_appointment_id',
          ignoreDuplicates: false 
        })

      if (error) throw error
      processed++
    } catch (error) {
      console.error('Failed to process appointment:', error)
      failed++
    }
  }

  return { processed, failed }
}

async function processInvoices(supabaseClient: any, userId: string, invoices: any[]) {
  let processed = 0
  let failed = 0

  for (const invoiceData of invoices) {
    try {
      // Transform iStoma invoice data to our schema
      const invoice = {
        user_id: userId,
        istoma_invoice_id: invoiceData.id || invoiceData.invoice_id,
        invoice_number: invoiceData.number || invoiceData.numar_factura,
        invoice_date: invoiceData.date || invoiceData.data_factura,
        due_date: invoiceData.due_date || invoiceData.data_scadenta,
        subtotal: parseFloat(invoiceData.subtotal || invoiceData.subtotal || 0),
        tax_amount: parseFloat(invoiceData.tax || invoiceData.tva || 0),
        total_amount: parseFloat(invoiceData.total || invoiceData.total || 0),
        currency: invoiceData.currency || 'RON',
        status: invoiceData.status || 'pending',
        payment_method: invoiceData.payment_method || invoiceData.modalitate_plata,
        payment_date: invoiceData.payment_date || invoiceData.data_plata,
        services: invoiceData.services || invoiceData.servicii || [],
        notes: invoiceData.notes || invoiceData.observatii,
        synced_from_istoma: true,
        last_sync_at: new Date().toISOString()
      }

      const { error } = await supabaseClient
        .from('invoices')
        .upsert(invoice, { 
          onConflict: 'user_id,istoma_invoice_id',
          ignoreDuplicates: false 
        })

      if (error) throw error
      processed++
    } catch (error) {
      console.error('Failed to process invoice:', error)
      failed++
    }
  }

  return { processed, failed }
}