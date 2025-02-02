const model = '@cf/meta/llama-3.1-8b-instruct';
const BASE_URL = process.env.CLOUDFARE_BASE_URL;

/**
 * Generate a secret mission for a music trivia game.
 * @param gameId The game ID.
 * @param theme The game theme.
 * @returns The secret mission.
 * @throws If the HTTP request fails.
 * @example const mission = await generateMission('123', '80s Music');
 */
export async function generateMission(
  gameId: string,
  theme: string
): Promise<string> {
  const url = BASE_URL + model;

  const prompt = `
  Generate a secret mission for a music trivia game with the theme "${theme}".
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
