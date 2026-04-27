/**
 * patron666Film - Built from src/patron666Film/
 * Generated: 2026-04-27T13:08:31.930Z
 */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/patron666Film/index.js
var patron666Film_exports = {};
__export(patron666Film_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patron666Film_exports);

// src/patron666Film/http.js
var MAIN_URL = "https://666filmizle.site";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8"
};
function fetchText(_0) {
  return __async(this, arguments, function* (url, extraHeaders = {}) {
    const res = yield fetch(url, {
      headers: __spreadValues(__spreadValues({}, HEADERS), extraHeaders),
      redirect: "follow"
    });
    if (!res.ok)
      throw new Error(`HTTP ${res.status} \u2192 ${url}`);
    return yield res.text();
  });
}
function fixUrl(url) {
  if (!url)
    return "";
  if (url.startsWith("http"))
    return url;
  if (url.startsWith("//"))
    return "https:" + url;
  if (url.startsWith("/"))
    return MAIN_URL + url;
  return MAIN_URL + "/" + url;
}

// src/patron666Film/tmdb.js
var TMDB_API_KEY = "500330721680edb6d5f7f12ba7cd9023";
var PROVIDER_TAG = "[Patron666Film]";
function getTmdbTitleFromHtml(tmdbId, mediaType) {
  return __async(this, null, function* () {
    try {
      const type = mediaType === "movie" ? "movie" : "tv";
      const url = `https://www.themoviedb.org/${type}/${tmdbId}?language=tr-TR`;
      const response = yield fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const html = yield response.text();
      let trTitle = "";
      const ogMatch = html.match(/<meta property="og:title" content="([^"]+)">/);
      if (ogMatch) {
        trTitle = ogMatch[1];
      } else {
        const titleMatch = html.match(/<title>([^<]+)<\/title>/);
        if (titleMatch) {
          trTitle = titleMatch[1].split("(")[0].split("\u2014")[0].trim();
        }
      }
      let origTitle = trTitle;
      const origMatch = html.match(/<h3 class="caption" dir="auto">([^<]+)<\/h3>/) || html.match(/<strong class="original_title">([^<]+)<\/strong>/);
      if (origMatch) {
        const cleaned = origMatch[1].replace("Orijinal Ad\u0131", "").trim();
        if (cleaned.length > 0)
          origTitle = cleaned;
      }
      if (!trTitle)
        return null;
      console.log(`${PROVIDER_TAG} [HTML] Ba\u015Fl\u0131k bulundu: ${trTitle}`);
      return { trTitle, origTitle };
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
      const url = `https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${TMDB_API_KEY}&language=tr-TR`;
      const response = yield fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = yield response.json();
      const trTitle = data.title || data.name || "";
      const origTitle = data.original_title || data.original_name || trTitle;
      if (!trTitle)
        return null;
      console.log(`${PROVIDER_TAG} [API] Ba\u015Fl\u0131k bulundu: ${trTitle}`);
      return { trTitle, origTitle };
    } catch (e) {
      console.warn(`${PROVIDER_TAG} [API] REST API ba\u015Far\u0131s\u0131z: ${e.message}`);
      return null;
    }
  });
}
function getTmdbTitle(tmdbId, mediaType) {
  return __async(this, null, function* () {
    const htmlResult = yield getTmdbTitleFromHtml(tmdbId, mediaType);
    if (htmlResult)
      return htmlResult;
    console.log(`${PROVIDER_TAG} HTML scraping ba\u015Far\u0131s\u0131z, TMDB REST API deneniyor...`);
    const apiResult = yield getTmdbTitleFromApi(tmdbId, mediaType);
    if (apiResult)
      return apiResult;
    console.error(`${PROVIDER_TAG} Her iki y\xF6ntem de ba\u015Far\u0131s\u0131z oldu: TMDB ID=${tmdbId}`);
    return { trTitle: "", origTitle: "" };
  });
}

// src/patron666Film/extractor.js
var import_cheerio_without_node_native = __toESM(require("cheerio-without-node-native"));
function searchMovie(query) {
  return __async(this, null, function* () {
    const searchUrl = `${MAIN_URL}/arama/?q=${encodeURIComponent(query)}`;
    const html = yield fetchText(searchUrl);
    const $ = import_cheerio_without_node_native.default.load(html);
    const results = [];
    $("a.film-card__link").each((i, el) => {
      const href = $(el).attr("href");
      const title = $(el).find("h3").first().text().trim();
      if (title && href) {
        results.push({ title, href: fixUrl(href) });
      }
    });
    if (results.length === 0)
      return null;
    const queryLower = query.toLowerCase();
    let exact = results.find((r) => r.title.toLowerCase() === queryLower) || results.find((r) => r.title.toLowerCase().startsWith(queryLower));
    if (!exact) {
      exact = results.find((r) => r.title.toLowerCase().includes(queryLower));
    }
    return exact ? exact.href : results[0].href;
  });
}
function extractFromMoviePage(movieUrl) {
  return __async(this, null, function* () {
    const html = yield fetchText(movieUrl);
    const $ = import_cheerio_without_node_native.default.load(html);
    const streams = [];
    const linkUrls = [];
    $("button.player-sources__btn").each((i, el) => {
      let title = $(el).text().trim() || `Sunucu ${i + 1}`;
      let src = $(el).attr("data-frame");
      if (src && src.trim() !== "") {
        linkUrls.push({ url: fixUrl(src.trim()), title });
      }
    });
    $("div.player-content iframe, iframe").each((i, el) => {
      let src = $(el).attr("src") || $(el).attr("data-src");
      if (src && src.trim() !== "" && !src.includes("youtube")) {
        linkUrls.push({ url: fixUrl(src.trim()), title: `Alternatif Embed ${i + 1}` });
      }
    });
    const addedUrls = /* @__PURE__ */ new Set();
    for (const link of linkUrls) {
      let { url: embedUrl, title: label } = link;
      if (addedUrls.has(embedUrl))
        continue;
      addedUrls.add(embedUrl);
      try {
        if (embedUrl.includes("rapidplay.website")) {
          const idMatch = embedUrl.match(/#([^&]+)/);
          if (idMatch) {
            let cleanId = idMatch[1].replace("=", "");
            let m3u8Url = `https://p.rapidplay.website/videos/${cleanId}/master.m3u8`;
            streams.push({
              name: "Patron666Film",
              title: `Rapidplay - ${label}`,
              url: m3u8Url,
              quality: "Auto",
              headers: {
                "Referer": "https://p.rapidplay.website/",
                "Origin": "https://p.rapidplay.website"
              }
            });
          }
          continue;
        }
        if (embedUrl.includes("strp2p.com") || embedUrl.includes("strp.watch")) {
          continue;
        }
        if (embedUrl.includes(".m3u8") || embedUrl.includes(".mp4")) {
          streams.push({
            name: "Patron666Film",
            title: label,
            url: embedUrl,
            quality: "Auto",
            headers: { Referer: movieUrl }
          });
        }
      } catch (err) {
        console.error(`[Patron666Film] \xC7\u0131karma hatas\u0131: ${err.message}`);
      }
    }
    return streams;
  });
}
function extractStreams(tmdbId, mediaType) {
  return __async(this, null, function* () {
    if (mediaType !== "movie")
      return [];
    const { trTitle, origTitle } = yield getTmdbTitle(tmdbId, mediaType);
    console.log(`[Patron666Film] TMDB: ${tmdbId} | Ba\u015Fl\u0131k: ${trTitle}`);
    if (!trTitle && !origTitle)
      return [];
    let movieUrl = null;
    if (trTitle) {
      movieUrl = yield searchMovie(trTitle);
    }
    if (!movieUrl && origTitle && origTitle !== trTitle) {
      movieUrl = yield searchMovie(origTitle);
    }
    if (!movieUrl) {
      console.warn(`[Patron666Film] Site'de i\xE7erik bulunamad\u0131: ${trTitle || origTitle}`);
      return [];
    }
    console.log(`[Patron666Film] Sayfa bulundu: ${movieUrl}`);
    const streams = yield extractFromMoviePage(movieUrl);
    console.log(`[Patron666Film] Toplam stream: ${streams.length}`);
    return streams;
  });
}

// src/patron666Film/index.js
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[Patron666Film] \u0130stek: ${mediaType} | TMDB: ${tmdbId}`);
      if (mediaType !== "movie") {
        return [];
      }
      const streams = yield extractStreams(tmdbId, mediaType);
      return streams;
    } catch (error) {
      console.error(`[Patron666Film] Hata: ${error.message}`);
      return [];
    }
  });
}
