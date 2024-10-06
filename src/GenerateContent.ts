import OpenAI from "openai"

const API_KEY = import.meta.env.VITE_GPT_KEY
const FORMAT = import.meta.env.VITE_FORMAT
export const generateContent = async (data: 
    {   platforms: string[], 
        audiences: string[], 
        tones: string[], 
        industry: string, 
        includeCTA: boolean, 
        frequency: number, 
        metrics: string,
        description: string
    }
) => {
    const { platforms, audiences, tones, industry, includeCTA, frequency, metrics, description } = data
    const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true })
    const aiModel = 'gpt-4o-mini'
    const completion = await openai.chat.completions.create({
        model: aiModel,
        messages: [
            {role: 'system',content: 'you are a helpful assistant'},
            {role: 'user',
                content: `Help me to write a social media content.
                Platforms: ${platforms.join('')}. Audiences: ${audiences.join('')}. Tones: ${tones.join('')}. Industry: ${industry}. IncludeCTA: ${includeCTA}. Frequency: ${frequency}. Metrics: ${metrics}. Description: ${description} Send back in JSON, ${FORMAT}`}
        ]
    })
    let aiResponse = completion.choices[0].message.content
    const jsonRegex = /{(.|\n)*}/
    const match = aiResponse?.match(jsonRegex)
    if (match) {
        aiResponse = match[0].trim()
    } else {
        throw new Error('No valid JSON object found in response')
    }
    return aiResponse
}