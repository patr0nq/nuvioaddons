/**
 * patronJetFilmizle - Built from src/patronJetFilmizle/
 * Generated: 2026-08-02T11:53:29.314Z
 */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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

// src/patronJetFilmizle/index.js
var patronJetFilmizle_exports = {};
__export(patronJetFilmizle_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patronJetFilmizle_exports);
var import_cheerio_without_node_native2 = __toESM(require("cheerio-without-node-native"));

// src/patronJetFilmizle/http.js
var MAIN_URL = "https://jetfilmizle.net";
var HEADERS = {
  "Referer": `${MAIN_URL}/`,
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
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
function fetchText(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const res = yield fetchWithResponse(url, options);
    return yield res.text();
  });
}

// src/patronJetFilmizle/tmdb.js
var TMDB_API_KEY = "500330721680edb6d5f7f12ba7cd9023";
var PROVIDER_TAG = "[PatronJetFilmizle]";
function getTmdbTitle(tmdbId, mediaType) {
  return __async(this, null, function* () {
    try {
      const type = mediaType === "movie" ? "movie" : "tv";
      const url = `https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${TMDB_API_KEY}&language=tr-TR`;
      const response = yield fetch(url, {
        headers: {
          "Accept": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = yield response.json();
      let trTitle = type === "movie" ? data.title : data.name;
      let origTitle = type === "movie" ? data.original_title : data.original_name;
      if (!trTitle) {
        trTitle = origTitle;
      }
      trTitle = (trTitle == null ? void 0 : trTitle.trim()) || "";
      origTitle = (origTitle == null ? void 0 : origTitle.trim()) || "";
      console.log(`${PROVIDER_TAG} [API] Baslik bulundu: ${trTitle}`);
      return { trTitle, origTitle };
    } catch (e) {
      console.warn(`${PROVIDER_TAG} [API] REST API basarisiz: ${e.message}`);
      return { trTitle: "", origTitle: "" };
    }
  });
}

// src/patronJetFilmizle/extractor.js
var import_cheerio_without_node_native = __toESM(require("cheerio-without-node-native"));
var PROVIDER_TAG2 = "[PatronJetFilmizle]";
function getD2rsLink(iframeUrl) {
  return __async(this, null, function* () {
    try {
      const apiUrl = iframeUrl.replace("/?", "/get_video.php?");
      const response = yield fetch(apiUrl, {
        headers: { "Referer": MAIN_URL }
      });
      const data = yield response.json();
      if (data && data.success && data.masterUrl) {
        return {
          url: data.masterUrl,
          referer: data.referrerUrl || MAIN_URL
        };
      }
    } catch (e) {
      console.warn(`${PROVIDER_TAG2} D2RS hatasi: ${e.message}`);
    }
    return null;
  });
}
function getPixeldrainLink(pdUrl) {
  try {
    const urlParts = pdUrl.replace(/\/$/, "").split("/");
    const pixelId = urlParts[urlParts.length - 1];
    const downloadLink = `https://pixeldrain.com/api/file/${pixelId}?download`;
    return {
      url: downloadLink,
      referer: pdUrl
    };
  } catch (e) {
    return null;
  }
}
function extractFromMoviePage(movieUrl) {
  return __async(this, null, function* () {
    const streams = [];
    try {
      console.log(`${PROVIDER_TAG2} Film Sayfasi Taran\u0131yor: ${movieUrl}`);
      const html = yield fetchText(movieUrl);
      const $ = import_cheerio_without_node_native.default.load(html);
      const iframes = $("div#active-player iframe, div.player-container iframe, iframe");
      for (let i = 0; i < iframes.length; i++) {
        const iframe = iframes.eq(i);
        let src = iframe.attr("data-litespeed-src") || iframe.attr("src");
        if (src) {
          src = fixUrl(src);
          if (src.includes("d2rs")) {
            const d2rsData = yield getD2rsLink(src);
            if (d2rsData) {
              streams.push({
                name: "PatronJetFilmizle - D2RS",
                title: "D2RS | Auto",
                url: d2rsData.url,
                quality: "Auto",
                type: "hls",
                headers: { "Referer": d2rsData.referer, "User-Agent": HEADERS["User-Agent"] }
              });
            }
          } else if (!src.includes("youtube")) {
            streams.push({
              name: `PatronJetFilmizle - Iframe`,
              title: `Sunucu | Auto`,
              url: src,
              quality: "Auto",
              headers: { "Referer": movieUrl, "User-Agent": HEADERS["User-Agent"] }
            });
          }
        }
      }
      const pdLinks = $("a.download-btn[href*='pixeldrain.com'], a[href*='pixeldrain.com']");
      pdLinks.each((i, el) => {
        const href = $(el).attr("href");
        if (href) {
          const pdData = getPixeldrainLink(href);
          if (pdData) {
            streams.push({
              name: "PatronJetFilmizle - PixelDrain",
              title: "PixelDrain | \u0130ndir",
              url: pdData.url,
              quality: "Auto",
              headers: { "Referer": pdData.referer, "User-Agent": HEADERS["User-Agent"] }
            });
          }
        }
      });
      const uniqueStreams = [];
      const seen = /* @__PURE__ */ new Set();
      for (const stream of streams) {
        if (!seen.has(stream.url)) {
          seen.add(stream.url);
          uniqueStreams.push(stream);
        }
      }
      console.log(`${PROVIDER_TAG2} Toplam ${uniqueStreams.length} stream bulundu.`);
      return uniqueStreams;
    } catch (e) {
      console.error(`${PROVIDER_TAG2} Extract hatas\u0131: ${e.message}`);
      return streams;
    }
  });
}

// src/patronJetFilmizle/index.js
var PROVIDER_TAG3 = "[PatronJetFilmizle]";
function getStreams(tmdbId, type, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`${PROVIDER_TAG3} \u0130stek: ${type} | TMDB: ${tmdbId}`);
      const { trTitle, origTitle } = yield getTmdbTitle(tmdbId, type);
      console.log(`${PROVIDER_TAG3} TMDB: ${tmdbId} | Baslik: ${trTitle}`);
      if (!trTitle && !origTitle) {
        console.warn(`${PROVIDER_TAG3} Baslik bulunamadi, cikiliyor.`);
        return [];
      }
      const queries = [...new Set([trTitle, origTitle].filter((q) => q && q.length > 1))];
      let movieUrl = null;
      for (const query of queries) {
        console.log(`${PROVIDER_TAG3} Aran\u0131yor: "${query}"`);
        const searchUrl = `${MAIN_URL}/?s=${encodeURIComponent(query)}`;
        try {
          const searchHtml = yield fetchText(searchUrl);
          const $ = import_cheerio_without_node_native2.default.load(searchHtml);
          const results = [];
          $("div.film-card, div.card, article").each((i, el) => {
            const anchor = $(el).find("a").first();
            const href = anchor.attr("href");
            let title = $(el).find(".card-title a, .film-title, h2, h3").text().trim();
            if (!title && anchor.attr("title"))
              title = anchor.attr("title").trim();
            if (title && href) {
              results.push({ title: title.replace(" izle", "").trim(), href: fixUrl(href) });
            }
          });
          if (results.length > 0) {
            const queryLower = query.toLowerCase();
            const normalize = (str) => (str || "").toLowerCase().replace(/[^a-z0-9ğüşıöç]/g, "");
            const cleanQ = normalize(queryLower);
            let exactMatch = results.find((r) => normalize(r.title) === cleanQ);
            if (!exactMatch) {
              exactMatch = results.find((r) => normalize(r.title).includes(cleanQ) || cleanQ.includes(normalize(r.title)));
            }
            if (exactMatch) {
              movieUrl = exactMatch.href;
              console.log(`${PROVIDER_TAG3} E\u015Fle\u015Fme bulundu: ${exactMatch.title} -> ${movieUrl}`);
              break;
            } else if (results.length > 0) {
              movieUrl = results[0].href;
              console.log(`${PROVIDER_TAG3} Yak\u0131n e\u015Fle\u015Fme kullan\u0131l\u0131yor: ${results[0].title} -> ${movieUrl}`);
              break;
            }
          }
        } catch (err) {
          console.warn(`${PROVIDER_TAG3} Arama hatasi (${query}): ${err.message}`);
        }
      }
      if (!movieUrl) {
        console.warn(`${PROVIDER_TAG3} \u0130cerik bulunamadi.`);
        return [];
      }
      if (type === "tv") {
        console.warn(`${PROVIDER_TAG3} Dizi b\xF6l\xFCm\xFC mant\u0131\u011F\u0131 tam desteklenmiyor, film sayfas\u0131 gibi taranacak.`);
      }
      const streams = yield extractFromMoviePage(movieUrl);
      return streams;
    } catch (e) {
      console.error(`${PROVIDER_TAG3} Genel Hata: ${e.message}`);
      return [];
    }
  });
}
