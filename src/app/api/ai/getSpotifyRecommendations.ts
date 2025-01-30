const authRequest = await import('../spotify/authorization-request');

async function getSpotifyRecommendations(mood: string) {
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
        headers: {
          Authorization: `Bearer ${Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ':' +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64')}`,
        },
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

export default getSpotifyRecommendations;
