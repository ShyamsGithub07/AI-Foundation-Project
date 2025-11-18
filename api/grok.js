export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "POST only" });

  try {
    const { prompt, key } = req.body;

    const response = await fetch(
      "https://api.deepl.com/v2/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "DeepL-Auth-Key " + key,
        },
        body: JSON.stringify({
          model: "deepl-completion",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7
        }),
      }
    );

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
