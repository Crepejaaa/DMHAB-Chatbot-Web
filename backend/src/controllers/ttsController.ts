import { Request, Response } from "express";
import axios from "axios";

export const getTTSAudio = async (req: Request, res: Response): Promise<void> => {
  try {
    const text = String(req.query.text || "").slice(0, 200);
    const lang = req.query.lang === "en" ? "en" : "th";
    if (!text) {
      res.status(400).json({ error: "missing text" });
      return;
    }

    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`;
    const upstream = await axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        Referer: "https://translate.google.com/",
      },
      timeout: 8000,
    });

    res.set("Content-Type", "audio/mpeg");
    res.set("Cache-Control", "public, max-age=86400");
    res.send(Buffer.from(upstream.data));
  } catch (error) {
    console.error("TTS proxy error:", (error as any)?.message || error);
    res.status(502).json({ error: "ไม่สามารถสร้างเสียงได้" });
  }
};
