
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

    console.log(`Analyzing domain: ${domain}`)

    // Get Gemini API key from secrets
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      console.error('Gemini API key not configured')
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Enhanced prompt to get better structured data from Gemini
    const prompt = `Analyze the website ${domain} and create a comprehensive project overview. 

Please return a JSON response with this exact structure:
{
  "title": "Clear, descriptive project title",
  "description": "Brief description (1-2 sentences maximum)",
  "category": "Choose from: Web Application, E-commerce, Blog, Portfolio, SaaS, Mobile App, API, or Other",
  "tags": ["relevant", "technology", "keywords", "max-5-tags"],
  "techStack": ["technology1", "technology2", "technology3"],
  "aiNarrative": "Write a compelling 2-3 paragraph narrative about this project. Focus on what makes it unique, its purpose, target audience, and key features. Be professional but engaging.",
  "logo": "🌐",
  "previewImage": "https://via.placeholder.com/600x400?text=${domain}",
  "featured": false,
  "notes": "Technical notes, architecture insights, or interesting implementation details",
  "url": "${domain.startsWith('http') ? domain : `https://${domain}`}",
  "publishedDate": "${new Date().toISOString()}",
  "is_published": false
}

Focus on creating engaging, accurate content. If you cannot access the website directly, make reasonable assumptions based on the domain name and common patterns. Keep the tone professional but approachable.`

    console.log('Calling Gemini API...')

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
          maxOutputTokens: 2000,
        }
      })
    })

    if (!geminiResponse.ok) {
      console.error(`Gemini API error: ${geminiResponse.status} ${geminiResponse.statusText}`)
      throw new Error(`Gemini API error: ${geminiResponse.statusText}`)
    }

    const geminiData = await geminiResponse.json()
    console.log('Gemini response received:', JSON.stringify(geminiData, null, 2))
    
    let analysisText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text

    if (!analysisText) {
      console.error('No response from Gemini API')
      throw new Error('No response from Gemini API')
    }

    console.log('Raw analysis text:', analysisText)

    // Try to extract JSON from the response
    let projectData
    try {
      // Look for JSON in the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        projectData = JSON.parse(jsonMatch[0])
        console.log('Parsed project data:', projectData)
      } else {
        console.log('No JSON found, creating fallback data')
        // Fallback: create structured data from text
        projectData = {
          title: `${domain} - Website Analysis`,
          description: "AI-generated analysis of the website",
          category: "Web Application",
          tags: ["web", "analysis", "ai-generated"],
          techStack: ["unknown"],
          aiNarrative: analysisText,
          logo: "🌐",
          previewImage: `https://via.placeholder.com/600x400?text=${encodeURIComponent(domain)}`,
          featured: false,
          notes: "Generated from Gemini API analysis",
          url: domain.startsWith('http') ? domain : `https://${domain}`,
          publishedDate: new Date().toISOString(),
          is_published: false
        }
      }
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError)
      // Fallback if JSON parsing fails
      projectData = {
        title: `${domain} - Website Analysis`,
        description: "AI-generated analysis of the website",
        category: "Web Application",
        tags: ["web", "analysis", "ai-generated"],
        techStack: ["unknown"],
        aiNarrative: analysisText,
        logo: "🌐",
        previewImage: `https://via.placeholder.com/600x400?text=${encodeURIComponent(domain)}`,
        featured: false,
        notes: "Generated from Gemini API analysis - JSON parsing failed",
        url: domain.startsWith('http') ? domain : `https://${domain}`,
        publishedDate: new Date().toISOString(),
        is_published: false
      }
    }

    console.log('Final project data:', JSON.stringify(projectData, null, 2))

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
      JSON.stringify({ 
        success: false,
        error: error.message || 'Failed to analyze website' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
