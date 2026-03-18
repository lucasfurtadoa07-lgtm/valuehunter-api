export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=3600');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { teamId, tournamentId, seasonId } = req.query;
  if (!teamId || !tournamentId || !seasonId) return res.status(400).json({ error: 'Missing params' });

  const url = `https://api.sofascore.com/api/v1/team/${teamId}/unique-tournament/${tournamentId}/season/${seasonId}/statistics/overall`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Referer': 'https://www.sofascore.com/',
        'Origin': 'https://www.sofascore.com',
      }
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
