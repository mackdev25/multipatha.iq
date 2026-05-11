import type { ValidationResult, ValidationSettings } from '../types';
import { generateOpenAIReport } from './openai';
import { generateClaudeReport } from './claude';
import { generateGeminiReport } from './gemini';
import { generateAzureReport } from './azure';

export const generateAIReport = async (
    data: ValidationResult[],
    settings: ValidationSettings
): Promise<string> => {
    if (!settings.aiIntegration?.enabled) {
        throw new Error('AI Integration is not enabled.');
    }

    const { selectedModel } = settings.aiIntegration;

    switch (selectedModel) {
        case 'openai':
            return await generateOpenAIReport(data, settings);
        case 'claude':
            return await generateClaudeReport(data, settings);
        case 'gemini':
            return await generateGeminiReport(data, settings);
        case 'azure':
            return await generateAzureReport(data, settings);
        default:
            throw new Error(`Unsupported AI model: ${selectedModel}`);
    }
};
