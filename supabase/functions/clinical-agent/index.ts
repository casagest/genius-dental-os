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

    const { action, clinical_data } = await req.json()

    switch (action) {
      case 'create_record':
        return await createClinicalRecord(supabaseClient, user.id, clinical_data)
      case 'ai_diagnosis_assist':
        return await aiDiagnosisAssist(supabaseClient, user.id, clinical_data)
      case 'drug_interaction_check':
        return await checkDrugInteractions(supabaseClient, user.id, clinical_data)
      case 'risk_assessment':
        return await performRiskAssessment(supabaseClient, user.id, clinical_data)
      case 'voice_to_text':
        return await processVoiceNotes(supabaseClient, user.id, clinical_data)
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

async function createClinicalRecord(supabaseClient: any, userId: string, recordData: any) {
  const { error } = await supabaseClient
    .from('clinical_records')
    .insert({
      user_id: userId,
      patient_id: recordData.patient_id,
      appointment_id: recordData.appointment_id,
      record_type: recordData.record_type,
      chief_complaint: recordData.chief_complaint,
      history_of_present_illness: recordData.history_of_present_illness,
      physical_examination: recordData.physical_examination || {},
      vital_signs: recordData.vital_signs || {},
      diagnosis: recordData.diagnosis,
      treatment_plan: recordData.treatment_plan,
      medications: recordData.medications || [],
      procedures: recordData.procedures || [],
      follow_up_instructions: recordData.follow_up_instructions,
      next_appointment_date: recordData.next_appointment_date,
      doctor_name: recordData.doctor_name,
      voice_notes: recordData.voice_notes
    })

  if (error) throw error

  return new Response(
    JSON.stringify({ success: true, message: 'Clinical record created successfully' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function aiDiagnosisAssist(supabaseClient: any, userId: string, clinicalData: any) {
  // Get OpenAI API key from secrets
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
  if (!openaiApiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const symptoms = clinicalData.symptoms
  const patientHistory = clinicalData.patient_history || ''
  const vitalSigns = clinicalData.vital_signs || {}

  const prompt = `
  Based on the following clinical information, provide differential diagnosis suggestions:
  
  Symptoms: ${symptoms}
  Patient History: ${patientHistory}
  Vital Signs: ${JSON.stringify(vitalSigns)}
  
  Please provide:
  1. Top 3 differential diagnoses with likelihood percentages
  2. Recommended additional tests or examinations
  3. Red flags to watch for
  4. Confidence level of assessment
  
  Format as JSON.
  `

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-2025-04-14',
      messages: [
        {
          role: 'system',
          content: 'You are a medical AI assistant. Provide diagnostic suggestions for educational purposes only. Always remind that final diagnosis requires human medical professional evaluation.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    })
  })

  const aiResponse = await response.json()
  const aiInsights = aiResponse.choices[0].message.content

  // Store AI analysis
  const { error } = await supabaseClient
    .from('ai_analysis')
    .insert({
      user_id: userId,
      patient_id: clinicalData.patient_id,
      analysis_type: 'diagnosis_suggestion',
      input_data: clinicalData,
      ai_response: { content: aiInsights },
      model_used: 'gpt-4.1-2025-04-14',
      processing_time_ms: Date.now() - clinicalData.start_time
    })

  if (error) throw error

  return new Response(
    JSON.stringify({ success: true, ai_insights: aiInsights }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function checkDrugInteractions(supabaseClient: any, userId: string, medicationData: any) {
  const medications = medicationData.medications || []
  
  // Simple drug interaction simulation (in real implementation, use a proper drug database)
  const commonInteractions = {
    'warfarin': ['aspirin', 'ibuprofen', 'amoxicillin'],
    'aspirin': ['warfarin', 'ibuprofen', 'metformin'],
    'ibuprofen': ['warfarin', 'aspirin', 'lisinopril']
  }

  const interactions = []
  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const med1 = medications[i].toLowerCase()
      const med2 = medications[j].toLowerCase()
      
      if (commonInteractions[med1]?.includes(med2) || commonInteractions[med2]?.includes(med1)) {
        interactions.push({
          medication1: medications[i],
          medication2: medications[j],
          severity: 'moderate',
          description: `Possible interaction between ${medications[i]} and ${medications[j]}. Monitor patient closely.`
        })
      }
    }
  }

  // Store analysis
  const { error } = await supabaseClient
    .from('ai_analysis')
    .insert({
      user_id: userId,
      patient_id: medicationData.patient_id,
      analysis_type: 'drug_interaction',
      input_data: medicationData,
      ai_response: { interactions },
      confidence_score: 0.85
    })

  if (error) throw error

  return new Response(
    JSON.stringify({ success: true, interactions }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function performRiskAssessment(supabaseClient: any, userId: string, patientData: any) {
  const age = patientData.age
  const medicalHistory = patientData.medical_history || []
  const vitalSigns = patientData.vital_signs || {}

  // Simple risk scoring algorithm
  let riskScore = 0
  const riskFactors = []

  // Age factor
  if (age > 65) {
    riskScore += 2
    riskFactors.push('Advanced age (>65)')
  }

  // Medical history factors
  if (medicalHistory.includes('diabetes')) {
    riskScore += 3
    riskFactors.push('Diabetes mellitus')
  }
  if (medicalHistory.includes('hypertension')) {
    riskScore += 2
    riskFactors.push('Hypertension')
  }
  if (medicalHistory.includes('heart_disease')) {
    riskScore += 4
    riskFactors.push('Cardiovascular disease')
  }

  // Vital signs factors
  if (vitalSigns.systolic_bp > 140) {
    riskScore += 2
    riskFactors.push('Elevated blood pressure')
  }

  const riskLevel = riskScore <= 2 ? 'Low' : riskScore <= 5 ? 'Medium' : 'High'

  const assessment = {
    risk_score: riskScore,
    risk_level: riskLevel,
    risk_factors: riskFactors,
    recommendations: getRiskRecommendations(riskLevel, riskFactors)
  }

  // Store analysis
  const { error } = await supabaseClient
    .from('ai_analysis')
    .insert({
      user_id: userId,
      patient_id: patientData.patient_id,
      analysis_type: 'risk_assessment',
      input_data: patientData,
      ai_response: assessment,
      confidence_score: 0.75
    })

  if (error) throw error

  return new Response(
    JSON.stringify({ success: true, assessment }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

function getRiskRecommendations(riskLevel: string, riskFactors: string[]) {
  const recommendations = []
  
  if (riskLevel === 'High') {
    recommendations.push('Close monitoring required')
    recommendations.push('Consider specialist consultation')
  }
  
  if (riskFactors.includes('Diabetes mellitus')) {
    recommendations.push('Monitor blood glucose levels')
    recommendations.push('Annual eye examination')
  }
  
  if (riskFactors.includes('Hypertension')) {
    recommendations.push('Regular blood pressure monitoring')
    recommendations.push('Lifestyle modifications (diet, exercise)')
  }

  return recommendations
}

async function processVoiceNotes(supabaseClient: any, userId: string, voiceData: any) {
  // This would integrate with a speech-to-text service like OpenAI Whisper
  // For now, return a placeholder response
  
  return new Response(
    JSON.stringify({ 
      success: true, 
      transcription: "Voice transcription feature will be implemented with OpenAI Whisper API",
      confidence: 0.95
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}