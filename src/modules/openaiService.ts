import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function generateMission(prompt: string): Promise<string> {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 100,
  });

  return response.data.choices[0].text.trim();
}

export async function generateHostComment(prompt: string): Promise<string> {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 100,
  });

  return response.data.choices[0].text.trim();
}
