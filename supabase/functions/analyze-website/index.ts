
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
    const { domain } = await req.json()
    
    if (!domain) {
      return new Response(
        JSON.stringify({ error: 'Domain is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get Gemini API key from secrets
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Construct the analysis prompt
    const prompt = `Analyze the website ${domain} and return a compelling project narrative (2-3 paragraphs) and technical metadata. 

Please return a JSON response with this structure:
{
  "title": "Project Title",
  "description": "Brief description (1-2 sentences)",
  "category": "Web Application/E-commerce/Blog/etc",
  "tags": ["tag1", "tag2", "tag3"],
  "techStack": ["technology1", "technology2"],
  "aiNarrative": "Compelling 2-3 paragraph narrative about the project",
  "logo": "🎨",
  "previewImage": "https://via.placeholder.com/600x400",
  "featured": false,
  "notes": "Additional technical or design notes"
}

Maintain a professional but warm tone. Focus on what makes this project unique and valuable.`

    // Call Gemini API
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        }
      })
    })

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.statusText}`)
    }

    const geminiData = await geminiResponse.json()
    let analysisText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text

    if (!analysisText) {
      throw new Error('No response from Gemini API')
    }

    // Try to extract JSON from the response
    let projectData
    try {
      // Look for JSON in the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        projectData = JSON.parse(jsonMatch[0])
      } else {
        // Fallback: create structured data from text
        projectData = {
          title: `Website Analysis: ${domain}`,
          description: "AI-generated analysis of the website",
          category: "Web Application",
          tags: ["web", "analysis"],
          techStack: ["unknown"],
          aiNarrative: analysisText,
          logo: "🌐",
          previewImage: "https://via.placeholder.com/600x400",
          featured: false,
          notes: "Generated from Gemini API analysis"
        }
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      projectData = {
        title: `Website Analysis: ${domain}`,
        description: "AI-generated analysis of the website",
        category: "Web Application",
        tags: ["web", "analysis"],
        techStack: ["unknown"],
        aiNarrative: analysisText,
        logo: "🌐",
        previewImage: "https://via.placeholder.com/600x400",
        featured: false,
        notes: "Generated from Gemini API analysis"
      }
    }

    // Add additional metadata
    projectData.url = domain.startsWith('http') ? domain : `https://${domain}`
    projectData.publishedDate = new Date().toISOString()
    projectData.is_published = false

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: projectData,
        raw_response: analysisText 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error analyzing website:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to analyze website' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
