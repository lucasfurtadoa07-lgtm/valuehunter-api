// api/team-stats.js
// Proxy para SofaScore — resolve CORS para o ValueHunter
// Deploy gratuito no Vercel

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=3600'); // cache 1 hora

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { teamId, tournamentId, seasonId } = req.query;

  if (!teamId || !tournamentId || !seasonId) {
    return res.status(400).json({ error: 'Parâmetros obrigatórios: teamId, tournamentId, seasonId' });
  }

  const url = `https://api.sofascore.com/api/v1/team/${teamId}/unique-tournament/${tournamentId}/season/${seasonId}/statistics/overall`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
        'Referer': 'https://www.sofascore.com/',
        'Origin': 'https://www.sofascore.com',
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `SofaScore retornou ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
