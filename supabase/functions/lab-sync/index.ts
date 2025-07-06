import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    const { action, lab_data } = await req.json()

    switch (action) {
      case 'create_order':
        return await createLabOrder(supabaseClient, user.id, lab_data)
      case 'process_results':
        return await processLabResults(supabaseClient, user.id, lab_data)
      case 'get_pending_orders':
        return await getPendingOrders(supabaseClient, user.id)
      case 'analyze_trends':
        return await analyzeLabTrends(supabaseClient, user.id, lab_data)
      default:
        throw new Error('Invalid action')
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

async function createLabOrder(supabaseClient: any, userId: string, labData: any) {
  const { error } = await supabaseClient
    .from('lab_data')
    .insert({
      user_id: userId,
      patient_id: labData.patient_id,
      lab_order_id: labData.lab_order_id || `LAB-${Date.now()}`,
      test_type: labData.test_type,
      test_name: labData.test_name,
      priority_level: labData.priority_level || 'normal',
      test_category: labData.test_category,
      ordered_date: new Date().toISOString(),
      lab_name: labData.lab_name,
      status: 'pending'
    })

  if (error) throw error

  return new Response(
    JSON.stringify({ success: true, message: 'Lab order created successfully' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function processLabResults(supabaseClient: any, userId: string, labData: any) {
  const { error } = await supabaseClient
    .from('lab_data')
    .update({
      result_value: labData.result_value,
      reference_range: labData.reference_range,
      unit: labData.unit,
      status: 'completed',
      completed_date: new Date().toISOString(),
      technician_notes: labData.technician_notes,
      doctor_notes: labData.doctor_notes
    })
    .eq('lab_order_id', labData.lab_order_id)
    .eq('user_id', userId)

  if (error) throw error

  return new Response(
    JSON.stringify({ success: true, message: 'Lab results processed successfully' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function getPendingOrders(supabaseClient: any, userId: string) {
  const { data, error } = await supabaseClient
    .from('lab_data')
    .select(`
      *,
      patients(first_name, last_name, email)
    `)
    .eq('user_id', userId)
    .eq('status', 'pending')
    .order('ordered_date', { ascending: false })

  if (error) throw error

  return new Response(
    JSON.stringify({ success: true, data }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function analyzeLabTrends(supabaseClient: any, userId: string, params: any) {
  const { data, error } = await supabaseClient
    .from('lab_data')
    .select('*')
    .eq('user_id', userId)
    .eq('patient_id', params.patient_id)
    .eq('test_type', params.test_type)
    .eq('status', 'completed')
    .order('completed_date', { ascending: true })

  if (error) throw error

  // Simple trend analysis
  const trends = data.map((record: any) => ({
    date: record.completed_date,
    value: parseFloat(record.result_value),
    test_name: record.test_name
  }))

  return new Response(
    JSON.stringify({ success: true, trends }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}