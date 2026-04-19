/**
 * patronVidsrc - Built from src/patronVidsrc/
 * Generated: 2026-04-19T16:04:26.395Z
 */
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/patronVidsrc/http.js
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36",
  "Referer": "https://vidsrc.me/"
};

// src/patronVidsrc/extractor.js
var TMDB_API_KEY = "500330721680edb6d5f7f12ba7cd9023";
var VERSION = "1.0.0";
var EMBED_DOMAINS = [
  "vidsrc.me",
  "vidsrc-embed.ru",
  "vidsrc-embed.su",
  "vsembed.ru",
  "vsembed.su"
];
function extractStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      const typePath = mediaType === "movie" ? "movie" : "tv";
      const tmdbUrl = `https://api.themoviedb.org/3/${typePath}/${tmdbId}?api_key=${TMDB_API_KEY}&language=tr-TR&append_to_response=external_ids`;
      const tmdbRes = yield fetch(tmdbUrl);
      const d = yield tmdbRes.json();
      const imdbId = d.external_ids ? d.external_ids.imdb_id : null;
      const title = d.title || d.name || "\u0130\xE7erik";
      const contentId = imdbId && imdbId.startsWith("tt") ? imdbId : tmdbId;
      const streams = [];
      for (const domain of EMBED_DOMAINS) {
        let targetUrl = "";
        let displayTitle = title;
        if (mediaType === "movie") {
          targetUrl = `https://${domain}/embed/movie/${contentId}`;
          const releaseYear = (d.release_date || "").slice(0, 4);
          displayTitle += releaseYear ? ` (${releaseYear})` : "";
        } else {
          targetUrl = `https://${domain}/embed/tv/${contentId}/${season}-${episode}`;
          displayTitle += ` - S${String(season).padStart(2, "0")}E${String(episode).padStart(2, "0")}`;
        }
        try {
          const checkRes = yield fetch(targetUrl, { method: "HEAD" });
          if (checkRes.status === 200) {
            const serverName = domain.replace("vidsrc.me", "VidSrc").replace("vidsrc-embed.ru", "VidSrc RU").replace("vidsrc-embed.su", "VidSrc SU").replace("vsembed.ru", "VSEmbed RU").replace("vsembed.su", "VSEmbed SU");
            streams.push({
              url: targetUrl,
              name: serverName,
              title: displayTitle,
              quality: "Auto",
              headers: {
                "Referer": `https://${domain}/`,
                "User-Agent": HEADERS["User-Agent"]
              }
            });
            break;
          }
        } catch (linkErr) {
          console.log(`[PatronVidsrc V${VERSION}] ${domain} ba\u011Flant\u0131 hatas\u0131, sonraki domain deneniyor...`);
          continue;
        }
      }
      return streams;
    } catch (e) {
      console.error(`[PatronVidsrc V${VERSION}] HATA: ${e.message}`);
      return [];
    }
  });
}

// src/patronVidsrc/index.js
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[PatronVidsrc] Request: ${mediaType} ${tmdbId} S${season || "-"}E${episode || "-"}`);
      const streams = yield extractStreams(tmdbId, mediaType, season, episode);
      console.log(`[PatronVidsrc] Found ${streams.length} stream(s)`);
      return streams;
    } catch (error) {
      console.error(`[PatronVidsrc] Error: ${error.message}`);
      return [];
    }
  });
}
module.exports = { getStreams };
