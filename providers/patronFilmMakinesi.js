/**
 * patronFilmMakinesi - Built from src/patronFilmMakinesi/
 * Generated: 2026-04-18T22:13:46.769Z
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

// src/patronFilmMakinesi/http.js
var cheerio = __toESM(require("cheerio-without-node-native"));
var MAIN_URL = "https://filmmakinesi.to";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
};
function fetchText(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    try {
      const fetchOptions = __spreadValues({
        headers: __spreadValues(__spreadValues({}, HEADERS), options.headers || {})
      }, options);
      const response = yield fetch(url, fetchOptions);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return yield response.text();
    } catch (e) {
      console.error(`[PatronFilmMakinesi] fetchText hatas\u0131 (${url}):`, e.message);
      throw e;
    }
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

// src/patronFilmMakinesi/tmdb.js
function getTmdbTitle(tmdbId, mediaType) {
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
        throw new Error(`TMDB HTML fetch hatas\u0131: ${response.status}`);
      }
      const html = yield response.text();
      let title = "";
      const ogMatch = html.match(/<meta property="og:title" content="([^"]+)">/);
      if (ogMatch) {
        title = ogMatch[1];
      } else {
        const titleMatch = html.match(/<title>([^<]+)<\/title>/);
        if (titleMatch) {
          title = titleMatch[1].split("(")[0].split("\u2014")[0].trim();
        }
      }
      let origTitle = title;
      const origMatch = html.match(/<h3 class="caption" dir="auto">([^<]+)<\/h3>/) || html.match(/<strong class="original_title">([^<]+)<\/strong>/);
      if (origMatch) {
        let matchedOrig = origMatch[1].replace("Orijinal Ad\u0131", "").trim();
        if (matchedOrig.length > 0)
          origTitle = matchedOrig;
      }
      return { trTitle: title, origTitle };
    } catch (e) {
      console.error(`[PatronFilmMakinesi] TMDB ba\u015Fl\u0131k hatas\u0131: ${e.message}`);
      return { trTitle: "", origTitle: "" };
    }
  });
}

// src/patronFilmMakinesi/extractors/closeload.js
function unpackJS(code) {
  try {
    const match = code.match(/}\('([^']*)',(\d+),(\d+),'([^']*)'\.split\('\|'\)/);
    if (!match)
      return code;
    let p = match[1];
    const a = parseInt(match[2], 10);
    const c = parseInt(match[3], 10);
    const k = match[4].split("|");
    const e = (c2) => {
      return (c2 < a ? "" : e(parseInt(c2 / a, 10))) + (c2 % a > 35 ? String.fromCharCode(c2 % a + 29) : (c2 % a).toString(36));
    };
    let map = {};
    for (let i = 0; i < c; i++) {
      map[e(i)] = k[i];
    }
    const dictRegex = new RegExp("\\b(" + Object.keys(map).filter((key) => key).join("|") + ")\\b", "g");
    const unpacked = p.replace(dictRegex, function(match2) {
      return map[match2] || match2;
    });
    return unpacked;
  } catch (err) {
    return code;
  }
}
function extractCloseLoad(url, referer) {
  return __async(this, null, function* () {
    try {
      let headers = {
        "User-Agent": HEADERS["User-Agent"],
        "Referer": "https://closeload.filmmakinesi.to/",
        "Origin": "https://closeload.filmmakinesi.to"
      };
      let response = yield fetch(url, { headers });
      let html = yield response.text();
      let videoUrl = null;
      const scriptMatches = html.match(/eval\(function\(p,a,c,k,e,?[d]?\).*?\)\)/g);
      if (scriptMatches) {
        for (let script of scriptMatches) {
          const unpacked = unpackJS(script);
          const vidMatch = unpacked.match(/file\s*:\s*["']([^"']+\.m3u8[^"']*)["']/i) || unpacked.match(/src\s*:\s*["']([^"']+\.m3u8[^"']*)["']/i) || unpacked.match(/["'](https?:\/\/[^"']+\.(?:m3u8|mp4)[^"']*)["']/i);
          if (vidMatch) {
            videoUrl = vidMatch[1];
            break;
          }
        }
      }
      if (!videoUrl) {
        const vidMatch = html.match(/file\s*:\s*["']([^"']+\.m3u8[^"']*)["']/i) || html.match(/["'](https?:\/\/[^"']+\.(?:m3u8|mp4)[^"']*)["']/i);
        if (vidMatch) {
          videoUrl = vidMatch[1];
        }
      }
      if (videoUrl) {
        return {
          url: videoUrl,
          quality: "1080p",
          headers
        };
      }
      return null;
    } catch (err) {
      console.error("[CloseLoad] Error extracting:", err.message);
      return null;
    }
  });
}

// src/patronFilmMakinesi/extractor.js
var cheerio2 = __toESM(require("cheerio-without-node-native"));
function searchMovie(query) {
  return __async(this, null, function* () {
    const searchUrl = `${MAIN_URL}/arama/?s=${encodeURIComponent(query)}`;
    const html = yield fetchText(searchUrl);
    const $ = cheerio2.load(html);
    const results = [];
    $("div.film-list div.item-relative").each((i, el) => {
      const anchor = $(el).find("a.item").first();
      const title = anchor.attr("data-title") ? anchor.attr("data-title").trim() : "";
      const href = anchor.attr("href");
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
    const $ = cheerio2.load(html);
    const streams = [];
    const linkUrls = [];
    const iframeSrc = $("iframe").attr("data-src") || $("iframe").attr("src");
    if (iframeSrc && iframeSrc.trim() !== "") {
      linkUrls.push({ url: fixUrl(iframeSrc.trim()), title: "Ana Sunucu" });
    }
    $(".video-parts a[data-video_url]").each((i, el) => {
      const vUrl = $(el).attr("data-video_url");
      const title = $(el).text().trim() || `Sunucu ${i + 1}`;
      if (vUrl && vUrl.trim() !== "") {
        linkUrls.push({ url: fixUrl(vUrl.trim()), title });
      }
    });
    for (let i = 0; i < linkUrls.length; i++) {
      const { url: embedUrl, title: label } = linkUrls[i];
      try {
        if (embedUrl.includes("closeload.filmmakinesi")) {
          const clRes = yield extractCloseLoad(embedUrl, movieUrl);
          if (clRes) {
            streams.push({
              name: "PatronFilmMakinesi",
              title: `CloseLoad - ${label}`,
              url: clRes.url,
              quality: clRes.quality || "720p",
              headers: clRes.headers || { Referer: MAIN_URL + "/" }
            });
            continue;
          }
        }
        if (embedUrl.includes(".m3u8") || embedUrl.includes(".mp4")) {
          streams.push({
            name: "PatronFilmMakinesi",
            title: label,
            url: embedUrl,
            quality: "720p",
            headers: { Referer: movieUrl }
          });
        } else {
          streams.push({
            name: "PatronFilmMakinesi",
            title: `Embed - ${label}`,
            url: embedUrl,
            quality: "720p",
            headers: { Referer: movieUrl }
          });
        }
      } catch (err) {
        console.error(`[PatronFilmMakinesi] \xC7\u0131karma hatas\u0131: ${err.message}`);
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
    console.log(`[PatronFilmMakinesi] TMDB: ${tmdbId} | Ba\u015Fl\u0131k: ${trTitle}`);
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
      console.warn(`[PatronFilmMakinesi] Site'de i\xE7erik bulunamad\u0131: ${trTitle || origTitle}`);
      return [];
    }
    console.log(`[PatronFilmMakinesi] Sayfa bulundu: ${movieUrl}`);
    const streams = yield extractFromMoviePage(movieUrl);
    console.log(`[PatronFilmMakinesi] Toplam stream: ${streams.length}`);
    return streams;
  });
}

// src/patronFilmMakinesi/index.js
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[PatronFilmMakinesi] \u0130stek: ${mediaType} | TMDB: ${tmdbId}`);
      if (mediaType !== "movie") {
        return [];
      }
      const streams = yield extractStreams(tmdbId, mediaType);
      return streams;
    } catch (error) {
      console.error(`[PatronFilmMakinesi] Hata: ${error.message}`);
      return [];
    }
  });
}
module.exports = { getStreams };
