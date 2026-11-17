export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(503).json({ error: "Booking service is not configured yet." });
  }
  const body = req.body || {};
  if (body.website) return res.status(200).json({ ok: true, reference: "GOTS-" + crypto.randomUUID().slice(0, 8).toUpperCase() });
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const tour = String(body.tour || "Bespoke Egypt journey").trim();
  const message = String(body.message || "").trim();
  const guests = Number(body.guests || 2);
  const date = String(body.date || "");
  if (name.length < 2 || name.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      tour.length > 190 || message.length > 5000 || !Number.isInteger(guests) || guests < 1 || guests > 50 ||
      (date && !/^\d{4}-\d{2}-\d{2}$/.test(date))) {
    return res.status(422).json({ error: "Please check your name, email, travel date and number of travellers." });
  }
  const reference_code = "GOTS-" + new Date().toISOString().slice(2,10).replaceAll("-","") + "-" + crypto.randomUUID().slice(0,6).toUpperCase();
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        reference_code, name, email, travel_date: date || null, guests, tour, message,
        status: "new"
      })
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error("Supabase insert failed:", response.status, detail);
      return res.status(500).json({ error: "We could not save your enquiry. Please try again." });
    }
    return res.status(200).json({ ok: true, reference: reference_code });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Booking service temporarily unavailable." });
  }
}
