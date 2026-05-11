import type { ValidationResult, ValidationSettings } from '../types';

export const generateOpenAIReport = async (
    data: ValidationResult[],
    settings: ValidationSettings
): Promise<string> => {
    const apiKey = settings.aiIntegration.apiKeys.openai;
    if (!apiKey) {
        throw new Error('OpenAI API Key is missing. Please configure it in Settings.');
    }

    const systemPrompt = `You are an expert Storage Area Network (SAN) and Multipathing Subject Matter Expert (SME). 
Analyze the provided multipathing JSON data and generate a smart report. 
Your report must include:
1. Executive Summary
2. Full Details & Observations
3. Key Insights (Identified single points of failure, unconfigured zones, etc.)
4. Action Plan / Recommendations

Format the response in cleanly structured Markdown. Use tables where appropriate to summarize the data.`;

    const userPrompt = `Here is the multipathing validation data:
\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\`
Please analyze this and provide the report.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-5.4',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            temperature: 1
        })
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API Error: ${response.status} ${response.statusText} - ${errData.error?.message || 'Unknown error'}`);
    }

    const responseData = await response.json();
    return responseData.choices?.[0]?.message?.content || 'No content generated.';
};
