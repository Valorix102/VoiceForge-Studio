// src/ai/flows/voice-cloning-quality-assessment.ts
'use server';
/**
 * @fileOverview A flow for assessing the quality of a cloned voice.
 *
 * - assessVoiceCloningQuality - A function that handles the voice cloning quality assessment process.
 * - AssessVoiceCloningQualityInput - The input type for the assessVoiceCloningQuality function.
 * - AssessVoiceCloningQualityOutput - The return type for the assessVoiceCloningQuality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessVoiceCloningQualityInputSchema = z.object({
  originalAudioDataUri: z
    .string()
    .describe(
      "The original audio sample used for cloning, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  clonedAudioDataUri: z
    .string()
    .describe(
      "The audio generated from the cloned voice, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  voiceName: z.string().describe('The name of the cloned voice.'),
});
export type AssessVoiceCloningQualityInput = z.infer<
  typeof AssessVoiceCloningQualityInputSchema
>;

const AssessVoiceCloningQualityOutputSchema = z.object({
  overallQuality: z
    .string()
    .describe('An overall assessment of the cloned voice quality.'),
  issues: z
    .array(z.string())
    .describe('A list of potential issues with the cloned voice.'),
  areasForImprovement:
    z.string().describe('Suggestions for improving the cloned voice.'),
});
export type AssessVoiceCloningQualityOutput = z.infer<
  typeof AssessVoiceCloningQualityOutputSchema
>;

export async function assessVoiceCloningQuality(
  input: AssessVoiceCloningQualityInput
): Promise<AssessVoiceCloningQualityOutput> {
  return assessVoiceCloningQualityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessVoiceCloningQualityPrompt',
  input: {schema: AssessVoiceCloningQualityInputSchema},
  output: {schema: AssessVoiceCloningQualityOutputSchema},
  prompt: `You are an expert in voice cloning and audio quality assessment.

You will receive the original audio sample used for cloning and the audio generated from the cloned voice.
Your task is to assess the quality of the cloned voice, highlight any potential issues, and provide areas for improvement.

Voice Name: {{{voiceName}}}
Original Audio: {{media url=originalAudioDataUri}}
Cloned Audio: {{media url=clonedAudioDataUri}}

Consider the following aspects:
- Similarity to the original voice
- Clarity and naturalness of the generated speech
- Any artifacts, distortions, or inconsistencies
- Emotional tone and expressiveness

Based on your assessment, provide an overall quality assessment, list any specific issues, and suggest areas for improvement.

Ensure that the output is well-structured and easy to understand.
`,
});

const assessVoiceCloningQualityFlow = ai.defineFlow(
  {
    name: 'assessVoiceCloningQualityFlow',
    inputSchema: AssessVoiceCloningQualityInputSchema,
    outputSchema: AssessVoiceCloningQualityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
