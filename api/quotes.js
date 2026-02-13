export default async function handler(req, res) {
  try {
    const symbolsParam = (req.query.symbols || "").toString().trim();
    if (!symbolsParam) {
      return res.status(400).json({ error: "Missing ?symbols=MSOS,TLRY" });
    }

    const symbols = symbolsParam
      .split(",")
      .map(s => s.trim().toUpperCase())
      .filter(Boolean)
      .slice(0, 50);

    const token = process.env.FINNHUB_API_KEY;
    if (!token) {
      return res.status(500).json({ error: "Missing FINNHUB_API_KEY in Vercel env vars" });
    }

    const out = {};

    await Promise.all(symbols.map(async (sym) => {
      const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(sym)}&token=${encodeURIComponent(token)}`;
      const r = await fetch(url);
      const j = await r.json();
      out[sym] = j;
    }));

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ data: out });

  } catch (e) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}
