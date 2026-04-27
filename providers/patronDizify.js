/**
 * patronDizify - Built from src/patronDizify/
 * Generated: 2026-04-27T14:08:30.041Z
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
function getTmdbMetadata(tmdbId, itemType) {
  return __async(this, null, function* () {
    if (!tmdbId)
      return {};
    const mediaType = itemType === "movie" ? "movie" : "tv";
    try {
      const url = `${TMDB_API}/${mediaType}/${tmdbId}?api_key=${TMDB_API_KEY}&language=tr-TR`;
      const data = yield fetchJSON(url);
      return data;
    } catch (error) {
      console.error(`[TMDB] Error fetching metadata for ${tmdbId}:`, error.message);
      return {};
    }
  });
}
function getTmdbCredits(tmdbId, itemType) {
  return __async(this, null, function* () {
    if (!tmdbId)
      return {};
    const mediaType = itemType === "movie" ? "movie" : "tv";
    try {
      const url = `${TMDB_API}/${mediaType}/${tmdbId}/credits?api_key=${TMDB_API_KEY}`;
      const data = yield fetchJSON(url);
      return data;
    } catch (error) {
      console.error(`[TMDB] Error fetching credits for ${tmdbId}:`, error.message);
      return {};
    }
  });
}

// src/patronDizify/index.js
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
        const data = yield fetchJSON(url);
        if (!data.success)
          return [];
        const results = [];
        const sources = data.data || [];
        for (const src of sources) {
          const embedUrl = src.url;
          if (!embedUrl)
            continue;
          const label = src.label || src.audio_type || "Kaynak";
          const quality = src.quality || "";
          results.push({
            url: embedUrl,
            quality: `${label} ${quality}`.trim(),
            headers: {}
          });
        }
        return results;
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
