// api/standings.js
// Proxy para standings do SofaScore (lista de times da liga)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=86400'); // cache 24 horas

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { tournamentId, seasonId } = req.query;

  if (!tournamentId || !seasonId) {
    return res.status(400).json({ error: 'Parâmetros obrigatórios: tournamentId, seasonId' });
  }

  const url = `https://api.sofascore.com/api/v1/unique-tournament/${tournamentId}/season/${seasonId}/standings/total`;

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
