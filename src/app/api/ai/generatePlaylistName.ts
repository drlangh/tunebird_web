import { BASE_URL } from './cloudfare';

const model = '@cf/meta/llama-3.1-8b-instruct';

/**
 * Generates a creative playlist name based on a given mood using an AI model.
 *
 * @param mood - The emotional mood or theme to base the playlist name on
 * @returns A Promise that resolves to a string containing the generated playlist name
 * @throws {Error} When the API request fails with a non-200 status code
 *
 * @example
 * ```ts
 * const name = await generatePlaylistName("happy");
 * console.log(name); // "Sunshine Vibes & Summer Smiles"
 * ```
 */
async function generatePlaylistName(mood: string): Promise<string> {
  const url = BASE_URL + model;

  const prompt = `
  Generate a creative playlist name for the mood: "${mood}".
  Return it in no more than 12 words.
  And only give me the name of the playlist without any other details.
  `;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFARE_AI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export default generatePlaylistName;
