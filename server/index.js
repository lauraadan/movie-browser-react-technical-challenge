import fs from "node:fs";
import path from "node:path";
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const resolve = (p) => path.resolve(process.cwd(), p);
const app = express();
const port = process.env.PORT || 5173;

// Basic cookie parsing (no external middleware)
function parseWishlistCookie(req) {
  const raw = req.headers.cookie || "";
  const cookies = Object.fromEntries(
    raw
      .split(";")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => {
        const idx = c.indexOf("=");
        return [
          decodeURIComponent(c.slice(0, idx)),
          decodeURIComponent(c.slice(idx + 1)),
        ];
      })
  );
  try {
    return JSON.parse(cookies["wishlist"] || "[]");
  } catch {
    return [];
  }
}

// TMDB Helpers
const TMDB_API_KEY = process.env.TMDB_API_KEY || "";
const TMDB_BASE = "https://api.themoviedb.org/3";

async function tmdb(pathname) {
  if (!TMDB_API_KEY) {
    throw new Error("Missing TMDB_API_KEY in environment");
  }
  const sep = pathname.includes("?") ? "&" : "?";
  const url = `${TMDB_BASE}${pathname}${sep}api_key=${TMDB_API_KEY}&language=en-US`;
  const r = await fetch(url);
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`TMDB error ${r.status}: ${text}`);
  }
  return r.json();
}

async function fetchHomeData() {
  const [popular, top_rated, now_playing] = await Promise.all([
    tmdb("/movie/popular?page=1"),
    tmdb("/movie/top_rated?page=1"),
    tmdb("/movie/now_playing?page=1"),
  ]);
  return {
    page: "home",
    categories: {
      popular: popular.results,
      top_rated: top_rated.results,
      now_playing: now_playing.results,
    },
  };
}

async function fetchMovieData(id, category) {
  const movie = await tmdb(`/movie/${id}`);
  return {
    page: "movie",
    movie,
    category: category || null,
  };
}

app.use("/api", express.json());

app.get("/api/movies", async (req, res) => {
  try {
    const cat = req.query.category || "popular";
    const data = await tmdb(`/movie/${cat}?page=1`);
    res.json(data.results);
  } catch (e) {
    res.status(500).json({ error: String(e.message || e) });
  }
});

app.get("/api/movie/:id", async (req, res) => {
  try {
    const data = await tmdb(`/movie/${req.params.id}`);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: String(e.message || e) });
  }
});

async function createViteServerIfNeeded() {
  if (!isProd) {
    const vite = await (
      await import("vite")
    ).createServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
    return vite;
  }
  return null;
}

const start = async () => {
  const vite = await createViteServerIfNeeded();

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      const wishlist = parseWishlistCookie(req);

      // Route-aware preloading
      let initialState;
      if (url === "/" || url.startsWith("/?")) {
        initialState = await fetchHomeData();
      } else if (url.startsWith("/movie/")) {
        const match = url.match(/\/movie\/(\d+)(?:\?cat=([a-z_]+))?/);
        const id = match?.[1];
        const cat = match?.[2];
        initialState = await fetchMovieData(id, cat);
      } else if (url.startsWith("/wishlist")) {
        initialState = { page: "wishlist" };
      } else {
        initialState = { page: "notfound" };
      }

      // Normalize wishlist: if it's an array of numeric IDs (saved by client), fetch full movie objects server-side.
      try {
        if (Array.isArray(wishlist) && wishlist.length > 0) {
          const allNumbers = wishlist.every((x) => typeof x === "number");
          if (allNumbers) {
            // fetch full movie details for SSR
            const movies = await Promise.all(
              wishlist.map((id) => tmdb(`/movie/${id}`).catch(() => null))
            );
            initialState.wishlist = movies.filter(Boolean);
          } else if (
            Array.isArray(wishlist) &&
            wishlist.length > 0 &&
            typeof wishlist[0] === "object"
          ) {
            // already full objects in cookie
            initialState.wishlist = wishlist;
          } else {
            initialState.wishlist = [];
          }
        } else {
          initialState.wishlist = [];
        }
      } catch (e) {
        initialState.wishlist = [];
      }

      let template, render;
      if (!isProd) {
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      } else {
        template = fs.readFileSync(resolve("dist/client/index.html"), "utf-8");
        render = (
          await import(path.join(process.cwd(), "dist/server/entry-server.js"))
        ).render;
        app.use(
          "/assets",
          express.static(resolve("dist/client/assets"), { maxAge: "1y" })
        );
      }

      const appHtml = await render(url, initialState);
      const html = template
        .replace("<!--app-html-->", appHtml)
        .replace(
          "<!--initial-state-->",
          `<script>window.__INITIAL_STATE__=${JSON.stringify(
            initialState
          ).replace(/</g, "\\u003c")}</script>`
        );

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      !isProd && vite && vite.ssrFixStacktrace && vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.stack || e.toString());
    }
  });

  app.listen(port, () => {
    console.log(
      `Server running at http://localhost:${port} (${isProd ? "prod" : "dev"})`
    );
  });
};

start();
