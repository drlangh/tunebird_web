import type { NextApiRequest, NextApiResponse } from 'next';

async function getSpotifyRecommendations(mood: string) {
  // 1. Obtener tu accessToken (usualmente guardado en sesión o refrescado con client credentials)
  const accessToken = await getSpotifyAccessToken();

  // 2. Elegir algunos "seed_genres" según el mood, o hacer una pequeña lógica:
  let seedGenres = 'chill'; // Ejemplo
  if (mood.toLowerCase().includes('triste')) {
    seedGenres = 'sad';
  }

  // 3. Ajustar valence, energy, etc.
  const valence = mood.includes('feliz') ? 0.8 : 0.4;
  const energy = mood.includes('enérgico') ? 0.7 : 0.3;

  // 4. Llamar al endpoint
  const response = await fetch(
    'https://api.spotify.com/v1/recommendations',
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      body: {
        seed_genres: seedGenres,
        target_valence: valence,
        target_energy: energy,
        limit: 10,
      },
    }
  );

  // 5. Formatear la respuesta
  const tracks = response.data.tracks.map((track: any) => ({
    title: track.name,
    artist: track.artists.map((a: any) => a.name).join(', '),
    spotifyUrl: track.external_urls.spotify,
    previewUrl: track.preview_url, // si quieres el preview de 30s
  }));

  return tracks;
}

async function generateCoverImage(
  playlistName: string,
  mood: string
): Promise<string> {
  const prompt = `Create an abstract cover art for a playlist named "${playlistName}". Mood: ${mood}.`;

  // Llamada a la API de OpenAI:
  /*
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "512x512" 
  });
  const imageUrl = response.data.data[0].url;
  */

  return 'https://ruta-de-la-imagen-generada.png'; // Hardcoded para ejemplo
}

// Ejemplo de cómo podría lucir tu handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { mood } = req.body; // El texto que describe cómo se siente el usuario

    // 1. Generar nombre de la playlist (opcionalmente palabras clave) con un modelo de IA de texto
    const playlistName = await generatePlaylistName(mood);

    // 2. Obtener canciones de Spotify basadas en el mood
    const tracks = await getSpotifyRecommendations(mood);

    // 3. Generar portada con IA de imágenes
    const coverUrl = await generateCoverImage(playlistName, mood);

    return res.status(200).json({
      playlistName,
      coverUrl,
      tracks,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Error generating playlist' });
  }
}
