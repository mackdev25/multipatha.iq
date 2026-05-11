import type { ValidationResult, ValidationSettings } from '../types';

export const generateGeminiReport = async (
    data: ValidationResult[],
    settings: ValidationSettings
): Promise<string> => {
    const apiKey = settings.aiIntegration.apiKeys.gemini;
    if (!apiKey) {
        throw new Error('Gemini API Key is missing. Please configure it in Settings.');
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

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
            contents: [
                {
                    parts: [{ text: userPrompt }]
                }
            ],
            generationConfig: {
                temperature: 0.2
            }
        })
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(`Gemini API Error: ${response.status} ${response.statusText} - ${errData.error?.message || 'Unknown error'}`);
    }

    const responseData = await response.json();
    return responseData.candidates?.[0]?.content?.parts?.[0]?.text || 'No content generated.';
};
