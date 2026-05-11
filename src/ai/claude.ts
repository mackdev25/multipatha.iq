import type { ValidationResult, ValidationSettings } from '../types';

export const generateClaudeReport = async (
    data: ValidationResult[],
    settings: ValidationSettings
): Promise<string> => {
    const apiKey = settings.aiIntegration.apiKeys.claude;
    if (!apiKey) {
        throw new Error('Claude API Key is missing. Please configure it in Settings.');
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

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            system: systemPrompt,
            messages: [
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.2
        })
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(`Claude API Error: ${response.status} ${response.statusText} - ${errData.error?.message || 'Unknown error'}`);
    }

    const responseData = await response.json();
    return responseData.content?.[0]?.text || 'No content generated.';
};
