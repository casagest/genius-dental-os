import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { patientData, appointmentData, inventoryData } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an AI assistant for MedicalCor dental practice. Analyze the provided data and generate actionable insights for practice optimization. Focus on:
            1. Revenue optimization opportunities
            2. Inventory management alerts  
            3. Patient behavior patterns
            4. Operational efficiency improvements
            
            Return insights in JSON format with this structure:
            {
              "insights": [
                {
                  "type": "revenue_optimization|inventory_alert|patient_behavior|operational",
                  "title": "Brief title",
                  "message": "Detailed insight message",
                  "confidence": 85,
                  "impact": "high|medium|low",
                  "actionable": true
                }
              ]
            }`
          },
          {
            role: 'user',
            content: `Analyze this dental practice data:
            
            Patient Data: ${JSON.stringify(patientData || 'No recent patient data')}
            Appointment Data: ${JSON.stringify(appointmentData || 'No appointment data')}
            Inventory Data: ${JSON.stringify(inventoryData || 'No inventory data')}
            
            Generate 3-4 actionable insights for practice optimization.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let aiResponse;
    
    try {
      aiResponse = JSON.parse(data.choices[0].message.content);
    } catch {
      // If JSON parsing fails, create a structured response
      aiResponse = {
        insights: [
          {
            type: "operational",
            title: "AI Analysis Complete",
            message: data.choices[0].message.content,
            confidence: 75,
            impact: "medium",
            actionable: true
          }
        ]
      };
    }

    console.log('AI Insights generated:', aiResponse);

    return new Response(JSON.stringify(aiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-insights function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      insights: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});