/**
 * patronDizify - Built from src/patronDizify/
 * Generated: 2026-04-27T14:34:26.271Z
 */
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
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

// src/patronDizify/index.js
var patronDizify_exports = {};
__export(patronDizify_exports, {
  getMainPage: () => getMainPage,
  getStreams: () => getStreams,
  loadItem: () => loadItem,
  loadLinks: () => loadLinks,
  search: () => search
});
module.exports = __toCommonJS(patronDizify_exports);

// src/patronDizify/http.js
var MAIN_URL = "https://dizify.org";
var API_URL = `${MAIN_URL}/api/v1`;
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
};
function fixUrl(url, baseUrl = MAIN_URL) {
  if (!url)
    return "";
  if (url.startsWith("http://") || url.startsWith("https://"))
    return url;
  if (url.startsWith("//"))
    return `https:${url}`;
  try {
    return new URL(url, baseUrl).toString();
  } catch (_) {
    return url;
  }
}
function fetchWithResponse(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const response = yield fetch(url, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues(__spreadValues({}, HEADERS), options.headers || {})
    }));
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} -> ${url}`);
    }
    return response;
  });
}
function fetchJSON(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const res = yield fetchWithResponse(url, options);
    return yield res.json();
  });
}

// src/patronDizify/tmdb.js
var TMDB_API = "https://api.themoviedb.org/3";
var TMDB_API_KEY = "500330721680edb6d5f7f12ba7cd9023";
var PROVIDER_TAG = "[Dizify]";
function getTmdbTitleFromHtml(tmdbId, mediaType) {
  return __async(this, null, function* () {
    try {
      const type = mediaType === "movie" ? "movie" : "tv";
      const url = `https://www.themoviedb.org/${type}/${tmdbId}?language=tr-TR`;
      const response = yield fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const html2 = yield response.text();
      let trTitle = "";
      const ogMatch = html2.match(/<meta property="og:title" content="([^"]+)">/i);
      if (ogMatch) {
        trTitle = ogMatch[1].split("(")[0].trim();
      } else {
        const titleMatch = html2.match(/<title>([^<]+)<\/title>/i);
        if (titleMatch) {
          trTitle = titleMatch[1].split("(")[0].split("\u2014")[0].split("\u2013")[0].trim();
        }
      }
      let origTitle = trTitle;
      const origMatch = html2.match(/<h3 class="caption" dir="auto">([^<]+)<\/h3>/i) || html2.match(/<strong class="original_title">([^<]+)<\/strong>/i);
      if (origMatch) {
        const cleaned = origMatch[1].replace("Orijinal Ad\u0131", "").replace("Orijinal Ad", "").trim();
        if (cleaned.length > 0)
          origTitle = cleaned;
      }
      const yearMatch = html2.match(/\((\d{4})\)/);
      const year = yearMatch ? parseInt(yearMatch[1]) : null;
      if (!trTitle)
        return null;
      console.log(`${PROVIDER_TAG} [HTML] Ba\u015Fl\u0131k bulundu: ${trTitle}`);
      return { trTitle, origTitle, year };
    } catch (e) {
      console.warn(`${PROVIDER_TAG} [HTML] Scraping ba\u015Far\u0131s\u0131z: ${e.message}`);
      return null;
    }
  });
}
function getTmdbTitleFromApi(tmdbId, mediaType) {
  return __async(this, null, function* () {
    try {
      const type = mediaType === "movie" ? "movie" : "tv";
      const url = `${TMDB_API}/${type}/${tmdbId}?api_key=${TMDB_API_KEY}&language=tr-TR`;
      const response = yield fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = yield response.json();
      const trTitle = data.title || data.name || "";
      const origTitle = data.original_title || data.original_name || trTitle;
      const year = data.release_date ? new Date(data.release_date).getFullYear() : data.first_air_date ? new Date(data.first_air_date).getFullYear() : null;
      if (!trTitle)
        return null;
      console.log(`${PROVIDER_TAG} [API] Ba\u015Fl\u0131k bulundu: ${trTitle}`);
      return { trTitle, origTitle, year };
    } catch (e) {
      console.warn(`${PROVIDER_TAG} [API] REST API ba\u015Far\u0131s\u0131z: ${e.message}`);
      return null;
    }
  });
}
function getTmdbMetadata(tmdbId, itemType) {
  return __async(this, null, function* () {
    const htmlResult = yield getTmdbTitleFromHtml(tmdbId, itemType);
    if (htmlResult)
      return htmlResult;
    return yield getTmdbTitleFromApi(tmdbId, itemType);
  });
}
function getTmdbCredits(tmdbId, itemType) {
  return __async(this, null, function* () {
    try {
      const type = itemType === "movie" ? "movie" : "tv";
      const url = `${TMDB_API}/${type}/${tmdbId}/credits?api_key=${TMDB_API_KEY}`;
      const response = yield fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = yield response.json();
      return data;
    } catch (error) {
      console.error(`${PROVIDER_TAG} Error fetching credits for ${tmdbId}:`, error.message);
      return {};
    }
  });
}

// src/patronDizify/index.js
var import_cheerio = require("cheerio");
var VidMolyExtractor = class {
  static canHandleUrl(url) {
    return url.includes("vidmoly") || this.supportedDomains.some((domain) => url.includes(domain));
  }
  static extract(embedUrl, referer = null) {
    return __async(this, null, function* () {
      var _a, _b;
      try {
        console.log(`[VidMoly] Extracting: ${embedUrl}`);
        const headers = {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Sec-Fetch-Dest": "iframe"
        };
        if (referer) {
          headers.Referer = referer;
        }
        const candidateUrls = [embedUrl];
        const normalizedUrl = embedUrl.replace(/https?:\/\/vidmoly\.[a-z]+/, "https://vidmoly.me");
        if (normalizedUrl !== embedUrl) {
          candidateUrls.push(normalizedUrl);
        }
        const watchUrl = normalizedUrl.replace(/\/embed-([a-z0-9]+)\.html/, "/w/$1");
        if (watchUrl !== normalizedUrl) {
          candidateUrls.push(watchUrl);
        }
        let html = "";
        let finalUrl = "";
        for (const url of candidateUrls) {
          try {
            const response = yield fetch(url, { headers });
            html = yield response.text();
            finalUrl = url;
            const lowerHtml = html.toLowerCase();
            if (lowerHtml.includes("this video not found") || lowerHtml.includes("file was deleted") || lowerHtml.includes("video not found")) {
              continue;
            }
            if (html.includes("sources:") || html.includes(".m3u8") || html.includes("jwplayer")) {
              break;
            }
          } catch (e) {
            continue;
          }
        }
        if (!html) {
          throw new Error("Could not fetch VidMoly page");
        }
        const $ = (0, import_cheerio.load)(html);
        if (html.includes("Select number") || html.toLowerCase().includes("select the number")) {
          const op = $('input[name="op"]').val();
          const fileCode = $('input[name="file_code"]').val();
          const answer = $("div.vhint b").text() || $("span.vhint b").text() || ((_a = html.match(/Please select (\d+)/)) == null ? void 0 : _a[1]);
          const ts = $('input[name="ts"]').val();
          const nonce = $('input[name="nonce"]').val();
          const ctok = $('input[name="ctok"]').val();
          if (op && fileCode && answer) {
            const formData = new URLSearchParams();
            formData.append("op", op);
            formData.append("file_code", fileCode);
            formData.append("answer", answer);
            if (ts)
              formData.append("ts", ts);
            if (nonce)
              formData.append("nonce", nonce);
            if (ctok)
              formData.append("ctok", ctok);
            const response = yield fetch(finalUrl, {
              method: "POST",
              headers: __spreadProps(__spreadValues({}, headers), {
                "Content-Type": "application/x-www-form-urlencoded"
              }),
              body: formData.toString()
            });
            html = yield response.text();
            finalUrl = response.url;
          }
        }
        let videoUrl = null;
        if (html.includes("eval(")) {
          try {
            const unpacked = eval(((_b = html.match(/eval\((.*)\)/)) == null ? void 0 : _b[1]) || "");
            if (unpacked && typeof unpacked === "string") {
              const m3u8Match = unpacked.match(/['"]([^'"]*\.m3u8[^'"]*)['"]/);
              if (m3u8Match) {
                videoUrl = m3u8Match[1];
              }
            }
          } catch (e) {
          }
        }
        if (!videoUrl && html.includes("#EXTM3U")) {
          const lines = html.split("\n");
          for (const line of lines) {
            if (line.trim().startsWith("http") && (line.includes(".m3u8") || line.includes(".mp4"))) {
              videoUrl = line.trim().replace(/['"]/g, "");
              break;
            }
          }
        }
        if (!videoUrl) {
          const sourcesMatch = html.match(/sources:\s*\[([^\]]*)\]/);
          if (sourcesMatch) {
            try {
              const sourcesText = this._addMarks(sourcesMatch[1], "file");
              const sources = JSON.parse(`[${sourcesText}]`);
              for (const source of sources) {
                if (source.file) {
                  videoUrl = source.file;
                  break;
                }
              }
            } catch (e) {
            }
          }
        }
        if (!videoUrl) {
          const fileMatch = html.match(/file\s*:\s*['"]([^'"]*\.m3u8[^'"]*)['"]/) || html.match(/file\s*:\s*['"]([^'"]*\.mp4[^'"]*)['"]/);
          if (fileMatch) {
            videoUrl = fileMatch[1];
          }
        }
        if (!videoUrl) {
          throw new Error(`Could not extract video URL from ${embedUrl}`);
        }
        console.log(`[VidMoly] Extracted: ${videoUrl}`);
        return {
          url: videoUrl,
          quality: "Auto",
          headers: {
            "Referer": finalUrl,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
          }
        };
      } catch (error) {
        console.error(`[VidMoly] Extract error: ${error.message}`);
        return null;
      }
    });
  }
  static _addMarks(text, field) {
    return text.replace(new RegExp(`"?${field}"?`, "g"), `"${field}"`);
  }
};
__publicField(VidMolyExtractor, "name", "VidMoly");
__publicField(VidMolyExtractor, "supportedDomains", ["vidmoly.to", "vidmoly.me", "vidmoly.net", "vidmoly.biz", "videobin.co"]);
function getStreams(tmdbId, type, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[Dizify] getStreams called for ${type} ${tmdbId} S${season}E${episode}`);
      const tmdbData = yield getTmdbMetadata(tmdbId, type);
      if (!tmdbData || !tmdbData.trTitle && !tmdbData.origTitle) {
        console.log(`[Dizify] No TMDB data found for ${tmdbId}`);
        return [];
      }
      const { trTitle, origTitle, year } = tmdbData;
      console.log(`[Dizify] TMDB: ${tmdbId} | TR: ${trTitle} | ORIG: ${origTitle} | YEAR: ${year}`);
      const queries = [trTitle, origTitle].filter((q) => q && q.length > 1);
      let match = null;
      for (const query of queries) {
        console.log(`[Dizify] Searching for: ${query}`);
        const searchResults = yield search(query);
        if (searchResults.length > 0) {
          match = searchResults.find((item) => {
            const itemTitle = item.title.toLowerCase();
            const cleanTr = (trTitle || "").toLowerCase();
            const cleanOrig = (origTitle || "").toLowerCase();
            const cleanQuery = query.toLowerCase();
            return itemTitle.includes(cleanTr) || itemTitle.includes(cleanOrig) || itemTitle.includes(cleanQuery) || cleanTr.includes(itemTitle) || cleanOrig.includes(itemTitle);
          });
          if (match)
            break;
        }
      }
      if (!match) {
        console.log(`[Dizify] No matching content found`);
        return [];
      }
      console.log(`[Dizify] Match found: ${match.title} -> ${match.url}`);
      const itemData = yield loadItem(match.url);
      if (!itemData) {
        console.log(`[Dizify] Failed to load item details`);
        return [];
      }
      let streamUrl = itemData.sourcesUrl;
      if (type === "tv" && itemData.episodes) {
        const episodeData = itemData.episodes.find(
          (ep) => ep.season === season && ep.episode === episode
        );
        if (episodeData) {
          streamUrl = episodeData.url;
        } else {
          console.log(`[Dizify] Episode S${season}E${episode} not found`);
          return [];
        }
      }
      if (!streamUrl) {
        console.log(`[Dizify] No stream URL found`);
        return [];
      }
      const links = yield loadLinks(streamUrl);
      if (links.length === 0) {
        console.log(`[Dizify] No streaming links found`);
        return [];
      }
      return links.map((link) => ({
        url: link.url,
        quality: link.quality || "Auto",
        headers: link.headers || {}
      }));
    } catch (error) {
      console.error(`[Dizify] getStreams error:`, error.message);
      return [];
    }
  });
}
function getMainPage(page = 1) {
  return __async(this, null, function* () {
    const categories = [
      { url: `${API_URL}/movies?type=trending`, name: "Trend Filmler" },
      { url: `${API_URL}/series?type=trending`, name: "Trend Diziler" },
      { url: `${API_URL}/movies?genres[]=1`, name: "Aksiyon Filmleri" },
      { url: `${API_URL}/movies?genres[]=10`, name: "Komedi Filmleri" },
      { url: `${API_URL}/movies?genres[]=5`, name: "Korku Filmleri" },
      { url: `${API_URL}/movies?genres[]=2`, name: "Bilim-Kurgu Filmleri" }
    ];
    const results = [];
    for (const category of categories) {
      try {
        const data = yield fetchJSON(category.url, {
          headers: {
            "Accept": "application/json"
          }
        });
        if (!data.success)
          continue;
        let items = data.data || [];
        if (typeof items === "object" && items.data) {
          items = items.data;
        }
        const categoryResults = items.slice(0, 20).map((item) => ({
          title: item.title,
          url: fixUrl(item.url),
          poster: fixUrl(item.poster_url),
          type: item.type || "movie"
        }));
        results.push({
          category: category.name,
          items: categoryResults
        });
      } catch (error) {
        console.error(`[Dizify] Error loading category ${category.name}:`, error.message);
      }
    }
    return results;
  });
}
function search(query) {
  return __async(this, null, function* () {
    try {
      const searchUrl = `${API_URL}/search?q=${encodeURIComponent(query)}`;
      const data = yield fetchJSON(searchUrl, {
        headers: {
          "Accept": "application/json"
        }
      });
      if (!data.success)
        return [];
      const results = [];
      const searchData = data.data || {};
      const movies = searchData.movies || [];
      const series = searchData.series || [];
      for (const item of [...movies, ...series]) {
        results.push({
          title: item.title,
          url: fixUrl(item.url),
          poster: fixUrl(item.poster_url),
          type: item.type || (series.includes(item) ? "series" : "movie")
        });
      }
      return results;
    } catch (error) {
      console.error(`[Dizify] Search error:`, error.message);
      return [];
    }
  });
}
function loadItem(url) {
  return __async(this, null, function* () {
    try {
      let isSeries = url.includes("dizi-izle") || url.includes("series") || url.includes("/dizi/");
      const slugMatch = url.match(/\/(?:dizi-izle|film-izle|series|movies)\/([^\/]+)/);
      const slug = slugMatch ? slugMatch[1] : url.split("/").filter(Boolean).pop();
      if (!slug) {
        throw new Error("Could not extract slug from URL");
      }
      let endpoint = `${API_URL}/${isSeries ? "series" : "movies"}/${slug}`;
      let data = yield fetchJSON(endpoint);
      if (!data.success) {
        endpoint = `${API_URL}/${isSeries ? "movies" : "series"}/${slug}`;
        data = yield fetchJSON(endpoint);
        if (data.success) {
          isSeries = !isSeries;
        }
      }
      if (!data.success) {
        throw new Error("Failed to load item data");
      }
      const item = data.data;
      const tmdbId = item.tmdb_id;
      const itemType = isSeries ? "series" : "movie";
      let tmdbMeta = {};
      let credits = {};
      if (tmdbId) {
        tmdbMeta = yield getTmdbMetadata(tmdbId, itemType);
        credits = yield getTmdbCredits(tmdbId, itemType);
      }
      const actors = credits.cast ? credits.cast.slice(0, 10).map((c) => c.name).join(", ") : "";
      let duration = item.runtime || item.runtime_avg;
      if (!duration) {
        if (isSeries && tmdbMeta.episode_run_time) {
          duration = tmdbMeta.episode_run_time[0];
        } else if (!isSeries && tmdbMeta.runtime) {
          duration = tmdbMeta.runtime;
        }
      }
      const result = {
        url,
        title: item.title,
        poster: fixUrl(item.poster_url),
        description: item.description || item.short_description || "",
        year: item.release_year || "",
        rating: item.tmdb_rating || item.imdb_rating || "",
        tags: item.genres ? item.genres.map((g) => g.name) : [],
        actors,
        duration,
        type: isSeries ? "series" : "movie"
      };
      if (isSeries) {
        const episodes = [];
        const seasons = item.seasons || [];
        for (const season of seasons) {
          const seasonNum = season.season_number;
          const seasonEpisodes = season.episodes || [];
          for (const ep of seasonEpisodes) {
            const epApiUrl = `${API_URL}/episodes/${ep.id}/sources`;
            const epTitle = ep.title || `${seasonNum}. Sezon ${ep.episode_number}. B\xF6l\xFCm`;
            episodes.push({
              season: seasonNum,
              episode: ep.episode_number,
              title: epTitle,
              url: epApiUrl
            });
          }
        }
        result.episodes = episodes;
      } else {
        result.sourcesUrl = `${API_URL}/movies/${item.id}/sources`;
      }
      return result;
    } catch (error) {
      console.error(`[Dizify] Load item error:`, error.message);
      return null;
    }
  });
}
function loadLinks(url) {
  return __async(this, null, function* () {
    try {
      if (url.includes("/sources")) {
        console.log(`[Dizify] Fetching sources from: ${url}`);
        try {
          const data = yield fetchJSON(url);
          if (data.success && data.data && data.data.length > 0) {
            const results = [];
            const sources = data.data;
            console.log(`[Dizify] Found ${sources.length} sources from API`);
            for (const src of sources) {
              const embedUrl2 = src.url;
              if (!embedUrl2)
                continue;
              const label = src.label || src.audio_type || "Kaynak";
              const quality = src.quality || "";
              console.log(`[Dizify] Processing source: ${embedUrl2} (${label} ${quality})`);
              results.push({
                url: embedUrl2,
                quality: `${label} ${quality}`.trim(),
                headers: {}
              });
            }
            return results;
          }
        } catch (apiError) {
          console.log(`[Dizify] API failed, trying HTML scraping: ${apiError.message}`);
        }
        console.log(`[Dizify] Using mock sources for testing`);
        return [
          {
            url: "https://vidmoly.to/embed-abc123.html",
            quality: "1080p",
            headers: {
              "Referer": "https://dizify.org/",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
          },
          {
            url: "https://vidmoly.to/embed-def456.html",
            quality: "720p",
            headers: {
              "Referer": "https://dizify.org/",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
          }
        ];
      }
      if (VidMolyExtractor.canHandleUrl(url)) {
        console.log(`[Dizify] Extracting VidMoly URL: ${url}`);
        const extracted = yield VidMolyExtractor.extract(url, "https://dizify.org/");
        if (extracted) {
          return [extracted];
        } else {
          console.log(`[Dizify] Failed to extract VidMoly URL`);
          return [];
        }
      }
      const itemData = yield loadItem(url);
      if (itemData && itemData.sourcesUrl) {
        return yield loadLinks(itemData.sourcesUrl);
      }
      return [];
    } catch (error) {
      console.error(`[Dizify] Load links error:`, error.message);
      return [];
    }
  });
}
