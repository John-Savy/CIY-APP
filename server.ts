import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get("/api/config", (req, res) => {
    const key = process.env.API_KEY || process.env.GEMINI_API_KEY || "";
    res.json({ 
      apiKey: key,
      maskedKey: key ? `${key.substring(0, 4)}...${key.substring(key.length - 4)}` : "none"
    });
  });

  // Vite middleware for development
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    // If the request looks like a static file (has a dot like .js, .css, .png), 
    // let it fall through to Vite or 404 normally.
    // Otherwise, serve index.html for SPA routing.
    const isAsset = url.includes(".") && !url.endsWith(".html");
    if (isAsset) {
      return next();
    }

    try {
      // 1. Read index.html
      const template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );

      // 2. Apply Vite HTML transforms
      const html = await vite.transformIndexHtml(url, template);

      // 3. Send with cache busting
      res.status(200).set({ 
        "Content-Type": "text/html",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
