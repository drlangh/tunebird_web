function generateCodeVerifier(length: number) {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );
  }
  return text;
}

async function getAccessToken(code: string): Promise<string> {
  const verifier = generateCodeVerifier(128);

  const params = new URLSearchParams();
  params.append('client_id', process.env.SPOTIFY_CLIENT_ID!);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append(
    'redirect_uri',
    `${process.env.NEXT_PUBLIC_BASE_URL}/callback`
  );
  params.append('code_verifier', verifier!);

  const result = await fetch(
    'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    }
  );

  const { access_token } = await result.json();
  return access_token;
}
