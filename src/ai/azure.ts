import type { ValidationResult, ValidationSettings } from '../types';

export const generateAzureReport = async (
    data: ValidationResult[],
    settings: ValidationSettings
): Promise<string> => {
    const apiKey = settings.aiIntegration.apiKeys.azure;
    const endpoint = settings.aiIntegration.azureEndpoint;

    if (!apiKey || !endpoint) {
        throw new Error('Azure API Key or Endpoint is missing. Please configure them in Settings.');
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

    const url = new URL(endpoint);
    
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey
        },
        body: JSON.stringify({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.2
        })
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(`Azure API Error: ${response.status} ${response.statusText} - ${errData.error?.message || 'Unknown error'}`);
    }

    const responseData = await response.json();
    return responseData.choices?.[0]?.message?.content || 'No content generated.';
};
