/**
 * patronJetFilmizle - Built from src/patronJetFilmizle/
 * Generated: 2026-08-23T17:26:49.637Z
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
var MAIN_URL = "https://jetfilmizle.now";
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
      const response = yield fetchWithResponse(apiUrl, {
        headers: { "Referer": MAIN_URL }
      });
      const text = yield response.text();
      const data = JSON.parse(text);
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
function getVideoparkLink(iframeUrl, referer) {
  return __async(this, null, function* () {
    try {
      const response = yield fetch(iframeUrl, {
        headers: __spreadProps(__spreadValues({}, HEADERS), { "Referer": referer })
      });
      if (!response.ok)
        return null;
      const html = yield response.text();
      const workerUrlMatch = html.match(/(?:const|var|let)\s+WORKER_URL\s*=\s*['"]([^'"]+)['"]/);
      const videoIdMatch = html.match(/(?:const|var|let)\s+VIDEO_ID\s*=\s*['"]([^'"]+)['"]/);
      const pubIdMatch = html.match(/(?:const|var|let)\s+PUB_ID\s*=\s*['"]([^'"]+)['"]/);
      const publMatch = html.match(/(?:const|var|let)\s+PUBLISHER_ID\s*=\s*['"]([^'"]+)['"]/);
      const titleMatch = html.match(/(?:const|var|let)\s+VIDEO_TITLE\s*=\s*['"]([^'"]+)['"]/);
      if (!workerUrlMatch)
        return null;
      const workerUrl = workerUrlMatch[1];
      const videoId = videoIdMatch ? videoIdMatch[1] : "";
      const pubId = pubIdMatch ? pubIdMatch[1] : "";
      const publId = publMatch ? publMatch[1] : "";
      const title = titleMatch ? titleMatch[1] : videoId;
      let apiUrl = "";
      if (pubId) {
        apiUrl = `${workerUrl}/api/stream?pubId=${encodeURIComponent(pubId)}&title=${encodeURIComponent(title)}`;
        if (publId)
          apiUrl += `&publisherId=${encodeURIComponent(publId)}`;
      } else if (videoId) {
        apiUrl = `${workerUrl}/api/video?id=${encodeURIComponent(videoId)}`;
      }
      if (!apiUrl)
        return null;
      const apiRes = yield fetch(apiUrl, {
        headers: __spreadProps(__spreadValues({}, HEADERS), { "Referer": referer })
      });
      if (!apiRes.ok)
        return null;
      const apiData = yield apiRes.json();
      if (apiData.hlsSource && apiData.hlsSource.file) {
        return { url: apiData.hlsSource.file, type: "hls" };
      } else if (apiData.mp4Sources && apiData.mp4Sources.length > 0) {
        return { url: apiData.mp4Sources[0].file, type: "mp4" };
      }
    } catch (e) {
      console.warn(`${PROVIDER_TAG2} Videopark hatasi: ${e.message}`);
    }
    return null;
  });
}
function getPixeldrainLink(pdUrl) {
  try {
    const pixelId = pdUrl.replace(/\/$/, "").split("/").pop();
    const downloadLink = `https://pixeldrain.com/api/file/${pixelId}?download`;
    return {
      url: downloadLink,
      referer: pdUrl
    };
  } catch (e) {
    return null;
  }
}
function getJetvLink(iframeUrl) {
  return __async(this, null, function* () {
    try {
      const html = yield fetchText(iframeUrl);
      const match = html.match(/"sources":\s*\[(.*?)\]/);
      if (match && match[1]) {
        let sourceStr = `{${match[1]}}`;
        sourceStr = sourceStr.replace(/'/g, '"').replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":');
        try {
          const son = JSON.parse(sourceStr);
          if (son.file) {
            return {
              url: son.file,
              label: son.label || "Jetv"
            };
          }
        } catch (e) {
          const fileMatch = match[1].match(/file\s*:\s*["']([^"']+)["']/);
          const labelMatch = match[1].match(/label\s*:\s*["']([^"']+)["']/);
          if (fileMatch) {
            return {
              url: fileMatch[1],
              label: labelMatch ? labelMatch[1] : "Jetv"
            };
          }
        }
      }
    } catch (e) {
      console.warn(`${PROVIDER_TAG2} Jetv hatasi: ${e.message}`);
    }
    return null;
  });
}
function extractFromMoviePage(movieUrl) {
  return __async(this, null, function* () {
    const streams = [];
    try {
      console.log(`${PROVIDER_TAG2} Film Sayfasi Taran\u0131yor: ${movieUrl}`);
      const html = yield fetchText(movieUrl);
      const $ = import_cheerio_without_node_native.default.load(html);
      const iframes = [];
      const filmId = $("input[name=film_id]").attr("value");
      if (filmId) {
        console.log(`${PROVIDER_TAG2} film_id: ${filmId}`);
        const playerTypes = ["dublaj", "altyazili"];
        let maxIndex = 4;
        const indices = [];
        $(".player-source-btn").each((i, el) => {
          const idx = parseInt($(el).attr("data-source-index"));
          if (!isNaN(idx))
            indices.push(idx);
        });
        if (indices.length > 0) {
          maxIndex = Math.max(...indices);
        }
        for (const playerType of playerTypes) {
          const sourceName = playerType === "dublaj" ? "Dublaj" : "Altyaz\u0131l\u0131";
          for (let sourceIndex = 0; sourceIndex <= maxIndex; sourceIndex++) {
            try {
              const response = yield fetch(`${MAIN_URL}/jetplayer`, {
                method: "POST",
                headers: __spreadProps(__spreadValues({}, HEADERS), {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "X-Requested-With": "XMLHttpRequest",
                  "Referer": movieUrl
                }),
                body: new URLSearchParams({
                  film_id: filmId,
                  source_index: sourceIndex.toString(),
                  player_type: playerType
                }).toString()
              });
              if (!response.ok)
                continue;
              const responseText = yield response.text();
              if (!responseText || !responseText.trim())
                continue;
              const $res = import_cheerio_without_node_native.default.load(responseText);
              let iframeSrc = $res("iframe").first().attr("src");
              if (!iframeSrc || !iframeSrc.trim())
                continue;
              if (iframeSrc.startsWith("//"))
                iframeSrc = `https:${iframeSrc}`;
              else
                iframeSrc = fixUrl(iframeSrc);
              console.log(`${PROVIDER_TAG2} iframe bulundu [${playerType}/${sourceIndex}] \xBB ${iframeSrc}`);
              iframes.push({ url: iframeSrc, typeLabel: sourceName });
            } catch (e) {
              console.warn(`${PROVIDER_TAG2} jetplayer hata [${playerType}/${sourceIndex}]: ${e.message}`);
            }
          }
        }
      } else {
        const iframeElement = $("div#active-player iframe, div.player-container iframe").first();
        let iframeSrc = iframeElement.attr("data-litespeed-src") || iframeElement.attr("src");
        if (iframeSrc) {
          iframes.push({ url: fixUrl(iframeSrc), typeLabel: "Auto" });
        }
      }
      $("a.download-btn[href]").each((i, link) => {
        const href = $(link).attr("href");
        if (href && href.includes("pixeldrain.com")) {
          const downloadLink = fixUrl(href);
          if (downloadLink) {
            iframes.push({ url: downloadLink, typeLabel: "\u0130ndir" });
          }
        }
      });
      for (const item of iframes) {
        const iframeUrl = item.url;
        const typeLabel = item.typeLabel;
        if (iframeUrl.includes("d2rs")) {
          console.log(`${PROVIDER_TAG2} D2RS URL bulundu: ${iframeUrl}`);
          const d2rsData = yield getD2rsLink(iframeUrl);
          if (d2rsData) {
            streams.push({
              name: "PatronJetFilmizle - D2RS",
              title: `D2RS | ${typeLabel}`,
              url: d2rsData.url,
              quality: "Auto",
              type: "hls",
              headers: { "Referer": d2rsData.referer, "User-Agent": HEADERS["User-Agent"] }
            });
          }
        } else if (iframeUrl.includes("jetv.xyz")) {
          console.log(`${PROVIDER_TAG2} Jetv URL bulundu: ${iframeUrl}`);
          const jetvData = yield getJetvLink(iframeUrl);
          if (jetvData) {
            streams.push({
              name: `PatronJetFilmizle - Jetv - ${jetvData.label}`,
              title: `Jetv - ${jetvData.label} | ${typeLabel}`,
              url: jetvData.url,
              quality: "Auto",
              type: "hls",
              headers: { "User-Agent": HEADERS["User-Agent"] }
            });
          }
        } else if (iframeUrl.includes("pixeldrain.com")) {
          const pdData = getPixeldrainLink(iframeUrl);
          if (pdData) {
            streams.push({
              name: "PatronJetFilmizle - PixelDrain",
              title: `PixelDrain | ${typeLabel}`,
              url: pdData.url,
              quality: "Auto",
              headers: { "Referer": pdData.referer, "User-Agent": HEADERS["User-Agent"] }
            });
          }
        } else if (iframeUrl.includes("videopark.top")) {
          console.log(`${PROVIDER_TAG2} Videopark URL bulundu: ${iframeUrl}`);
          const vpData = yield getVideoparkLink(iframeUrl, movieUrl);
          if (vpData) {
            streams.push({
              name: "PatronJetFilmizle - Videopark",
              title: `Videopark | ${typeLabel}`,
              url: vpData.url,
              quality: "Auto",
              type: vpData.type,
              headers: { "Referer": iframeUrl, "User-Agent": HEADERS["User-Agent"] }
            });
          }
        } else if (!iframeUrl.includes("youtube")) {
          streams.push({
            name: `PatronJetFilmizle - Iframe`,
            title: `Sunucu | ${typeLabel}`,
            url: iframeUrl,
            quality: "Auto",
            headers: { "Referer": movieUrl, "User-Agent": HEADERS["User-Agent"] }
          });
        }
      }
      const uniqueStreams = [];
      const seen = /* @__PURE__ */ new Set();
      for (const stream of streams) {
        const key = stream.url + stream.title;
        if (!seen.has(key)) {
          seen.add(key);
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
        let results = [];
        try {
          const searchUrl = `${MAIN_URL}/arama?q=`;
          const searchRes = yield fetchWithResponse(searchUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Referer": `${MAIN_URL}/`
            },
            body: new URLSearchParams({ s: query }).toString()
          });
          const searchHtml = yield searchRes.text();
          const $ = import_cheerio_without_node_native2.default.load(searchHtml);
          $("div.film-card").each((i, el) => {
            const anchor = $(el).find(".card-title a").first();
            let href = anchor.attr("href");
            if (!href)
              href = $(el).find("a").first().attr("href");
            let title = anchor.text().trim();
            if (!title)
              title = $(el).find("h2, h3").text().trim();
            if (title && href) {
              title = title.replace(/ izle$/i, "").trim();
              results.push({ title, href: fixUrl(href) });
            }
          });
        } catch (err) {
          console.warn(`${PROVIDER_TAG3} POST Arama hatasi (${query}): ${err.message}`);
        }
        if (results.length === 0) {
          console.log(`${PROVIDER_TAG3} Fallback GET Aran\u0131yor: "${query}"`);
          try {
            const searchUrl = `${MAIN_URL}/?s=${encodeURIComponent(query)}`;
            const searchHtml = yield fetchText(searchUrl);
            const $ = import_cheerio_without_node_native2.default.load(searchHtml);
            $("div.film-card, article.item, div.card").each((i, el) => {
              const anchor = $(el).find(".card-title a, a").first();
              const href = anchor.attr("href");
              let title = $(el).find(".card-title a, .film-title, h2, h3, a").text().trim();
              if (title && href) {
                title = title.replace(/ izle$/i, "").trim();
                results.push({ title, href: fixUrl(href) });
              }
            });
          } catch (err) {
            console.warn(`${PROVIDER_TAG3} GET Arama hatasi (${query}): ${err.message}`);
          }
        }
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
          } else {
            movieUrl = results[0].href;
            console.log(`${PROVIDER_TAG3} Yak\u0131n e\u015Fle\u015Fme kullan\u0131l\u0131yor: ${results[0].title} -> ${movieUrl}`);
            break;
          }
        }
      }
      if (!movieUrl) {
        console.warn(`${PROVIDER_TAG3} \u0130cerik bulunamadi.`);
        return [];
      }
      const streams = yield extractFromMoviePage(movieUrl);
      return streams;
    } catch (e) {
      console.error(`${PROVIDER_TAG3} Genel Hata: ${e.message}`);
      return [];
    }
  });
}
