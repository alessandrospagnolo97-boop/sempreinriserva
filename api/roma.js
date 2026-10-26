// Proxy minimo verso Mappa Carburanti (CommonJS, funziona senza package.json).
module.exports = async function handler(req, res) {
  try {
    const r = await fetch('https://mappacarburanti.it/api/prezzi/citta/roma.json');
    if (!r.ok) return res.status(502).json({ error: 'upstream ' + r.status });
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json(await r.json());
  } catch (e) {
    res.status(502).json({ error: String(e && e.message || e) });
  }
};
