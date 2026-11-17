export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(503).json({ error: "Admin connection is not configured." });
  }
  return res.status(200).json({ url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY });
}
