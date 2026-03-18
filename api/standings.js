export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=3600');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { tournamentId, seasonId } = req.query;
  if (!tournamentId) return res.status(400).json({ error: 'Obrigatorio: tournamentId' });

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/json',
    'Referer': 'https://www.sofascore.com/',
    'Origin': 'https://www.sofascore.com',
  };

  try {
    let sid = seasonId;
    if (!sid) {
      const r = await fetch(`https://api.sofascore.com/api/v1/unique-tournament/${tournamentId}/seasons`, { headers });
      const d = await r.json();
      sid = d?.seasons?.[0]?.id;
    }
    if (!sid) return res.status(404).json({ error: 'Season nao encontrada' });

    const url = `https://api.sofascore.com/api/v1/unique-tournament/${tournamentId}/season/${sid}/standings/total`;
    const response = await fetch(url, { headers });
    const data = await response.json();
    return res.status(200).json({ ...data, _seasonId: sid });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
