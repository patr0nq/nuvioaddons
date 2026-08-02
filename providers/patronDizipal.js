/**
 * patronDizipal - Built from src/patronDizipal/
 * Generated: 2026-08-02T11:35:31.602Z
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

// src/patronDizipal/index.js
var patronDizipal_exports = {};
__export(patronDizipal_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patronDizipal_exports);

// src/patronDizipal/http.js
var MAIN_URL = "https://dizipal2107.com";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
};
var KNOWN_DOMAINS = [
  "https://dizipal2107.com",
  "https://dizipal2108.com"
];
var _resolvedUrl = null;
function resolveMainUrl() {
  return __async(this, null, function* () {
    if (_resolvedUrl)
      return _resolvedUrl;
    try {
      const url = "https://raw.githubusercontent.com/patr0nq/veriler/refs/heads/main/siteurl.txt";
      const res = yield fetch(url, { signal: AbortSignal.timeout(1e4) });
      if (res.ok) {
        const text = yield res.text();
        for (const line of text.split("\n")) {
          if (line.trim().startsWith("dizipal:")) {
            let finalUrl = line.replace("dizipal:", "").trim();
            if (finalUrl.endsWith("/")) {
              finalUrl = finalUrl.slice(0, -1);
            }
            _resolvedUrl = finalUrl;
            console.log(`[Dizipal] Aktif domain (Github): ${_resolvedUrl}`);
            return _resolvedUrl;
          }
        }
      }
    } catch (e) {
      console.error(`[Dizipal] Github URL \xE7ekilemedi: ${e.message}`);
    }
    for (const domain of KNOWN_DOMAINS) {
      try {
        const res = yield fetch(`${domain}/`, {
          method: "HEAD",
          headers: HEADERS,
          signal: AbortSignal.timeout(5e3)
        });
        if (res.ok || res.status === 302 || res.status === 301) {
          const finalUrl = new URL(res.url).origin;
          _resolvedUrl = finalUrl;
          console.log(`[Dizipal] Aktif domain (Fallback): ${finalUrl}`);
          return finalUrl;
        }
      } catch (_) {
      }
    }
    _resolvedUrl = KNOWN_DOMAINS[0];
    return _resolvedUrl;
  });
}
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

// src/patronDizipal/tmdb.js
var TMDB_API_KEY = "500330721680edb6d5f7f12ba7cd9023";
var PROVIDER_TAG = "[Dizipal]";
function decodeHtml(text) {
  return (text || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#039;/g, "'");
}
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
      const html = yield response.text();
      let trTitle = "";
      const ogMatch = html.match(/<meta property="og:title" content="([^"]+)">/i);
      if (ogMatch) {
        trTitle = decodeHtml(ogMatch[1]).split("(")[0].trim();
      } else {
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        if (titleMatch) {
          trTitle = decodeHtml(titleMatch[1]).split("(")[0].split("\u2014")[0].trim();
        }
      }
      if (!trTitle)
        return null;
      let origTitle = trTitle;
      const origMatch = html.match(/<h3 class="caption" dir="auto">([^<]+)<\/h3>/i) || html.match(/<strong class="original_title">([^<]+)<\/strong>/i);
      if (origMatch) {
        const cleaned = decodeHtml(origMatch[1]).replace("Orijinal Ba\u015Fl\u0131k", "").replace("Original Title", "").replace("Orijinal Ad\u0131", "").replace("Orijinal Adi", "").trim();
        if (cleaned.length > 0)
          origTitle = cleaned;
      }
      const shortTitle = trTitle.split(" ").slice(0, 2).join(" ");
      const yearMatch = html.match(/\((\d{4})\)/);
      const year = yearMatch ? parseInt(yearMatch[1]) : null;
      console.log(`${PROVIDER_TAG} [HTML] Ba\u015Fl\u0131k: ${trTitle} | Orijinal: ${origTitle} | Y\u0131l: ${year}`);
      return { trTitle, origTitle, shortTitle, year };
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
      const shortTitle = trTitle.split(" ").slice(0, 2).join(" ");
      const dateStr = data.release_date || data.first_air_date || "";
      const year = dateStr ? parseInt(dateStr.substring(0, 4)) : null;
      if (!trTitle)
        return null;
      console.log(`${PROVIDER_TAG} [API] Ba\u015Fl\u0131k: ${trTitle} | Orijinal: ${origTitle} | Y\u0131l: ${year}`);
      return { trTitle, origTitle, shortTitle, year };
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
    console.error(`${PROVIDER_TAG} Her iki y\xF6ntem de ba\u015Far\u0131s\u0131z: TMDB ID=${tmdbId}`);
    return { trTitle: "", origTitle: "", shortTitle: "", year: null };
  });
}

// src/patronDizipal/extractor.js
var import_crypto_js = __toESM(require("crypto-js"));
var PROVIDER_TAG2 = "[Dizipal]";
function resolveDizipal(url, activeUrl) {
  return __async(this, null, function* () {
    try {
      const siteUrl = activeUrl || MAIN_URL;
      console.log(`${PROVIDER_TAG2} Oynat\u0131lacak B\xF6l\xFCm Linki \xBB ${url}`);
      const userAgent = HEADERS["User-Agent"];
      const getResponse = yield fetch(url, {
        headers: {
          "User-Agent": userAgent,
          "Cache-Control": "no-cache",
          "Pragma": "no-cache"
        },
        redirect: "manual"
      });
      const html = yield getResponse.text();
      const configTokenMatch = html.match(/<div[^>]*id=["']videoContainer["'][^>]*data-cfg=["']([^"']+)["']/i);
      const configToken = configTokenMatch ? configTokenMatch[1].trim() : null;
      if (!configToken) {
        console.error(`${PROVIDER_TAG2} Sayfadan video config token'\u0131 (data-cfg) al\u0131namad\u0131!`);
        return null;
      }
      let cookies = "";
      if (typeof getResponse.headers.getSetCookie === "function") {
        cookies = getResponse.headers.getSetCookie().map((c) => c.split(";")[0]).join("; ");
      } else {
        const rawSetCookie = getResponse.headers.get("set-cookie");
        if (rawSetCookie) {
          cookies = rawSetCookie.split(/, (?=[A-Za-z0-9_]+=)/).map((c) => c.split(";")[0]).join("; ");
        }
      }
      console.log(`${PROVIDER_TAG2} Bulunan Token \xBB ${configToken}`);
      console.log(`${PROVIDER_TAG2} Yakalanan \xC7erezler \xBB ${cookies}`);
      const postData = new URLSearchParams();
      postData.append("cfg", configToken);
      const configResponse = yield fetch(`${siteUrl}/ajax-player-config`, {
        method: "POST",
        headers: {
          "User-Agent": userAgent,
          "Accept": "*/*",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
          "Origin": siteUrl,
          "Cookie": cookies,
          "Referer": url
        },
        body: postData.toString()
      });
      const configResponseRaw = yield configResponse.text();
      console.log(`${PROVIDER_TAG2} API Yan\u0131t\u0131 \xBB ${configResponseRaw}`);
      const embedUrlMatch = configResponseRaw.match(/"v"\s*:\s*"([^"]+)"/);
      let embedUrlRaw = embedUrlMatch ? embedUrlMatch[1].replace(/\\\//g, "/") : null;
      if (!embedUrlRaw) {
        console.error(`${PROVIDER_TAG2} Embed URL config'den al\u0131namad\u0131! D\xF6nen yan\u0131t: ${configResponseRaw}`);
        return null;
      }
      const embedUrl = fixUrl(embedUrlRaw, siteUrl);
      console.log(`${PROVIDER_TAG2} \xC7\xF6z\xFClen Embed URL \xBB ${embedUrl}`);
      if (embedUrl.includes("imagestoo")) {
        const videoId = embedUrl.replace(/\/$/, "").split("/").pop();
        const imagestooApiUrl = `https://imagestoo.com/player/index.php?data=${videoId}&do=getVideo`;
        console.log(`${PROVIDER_TAG2} Imagestoo API URL \xBB ${imagestooApiUrl}`);
        const apiResponse = yield fetch(imagestooApiUrl, {
          method: "POST",
          headers: {
            "User-Agent": userAgent,
            "X-Requested-With": "XMLHttpRequest",
            "Accept": "*/*",
            "Referer": embedUrl
          }
        });
        let sessionCookie = "";
        let playerToken = "";
        if (typeof apiResponse.headers.getSetCookie === "function") {
          const setCookies = apiResponse.headers.getSetCookie();
          const tokenCookie = setCookies.find((c) => c.includes("fireplayer_player="));
          if (tokenCookie) {
            playerToken = tokenCookie.split(";")[0].split("=")[1];
          }
        } else {
          const rawSetCookie = apiResponse.headers.get("set-cookie");
          if (rawSetCookie && rawSetCookie.includes("fireplayer_player")) {
            const cleanCookie = rawSetCookie.split(";")[0];
            sessionCookie = `${cleanCookie};`;
          }
        }
        if (playerToken) {
          sessionCookie = `fireplayer_player=${playerToken}`;
        }
        console.log(`${PROVIDER_TAG2} Yakalanan Cookie \xBB ${sessionCookie}`);
        const responseText = yield apiResponse.text();
        const videoSourceMatch = responseText.match(/"securedLink"\s*:\s*"([^"]+)"/);
        if (videoSourceMatch && videoSourceMatch[1]) {
          const cleanUrl = videoSourceMatch[1].replace(/\\\//g, "/");
          const finalM3u8Url2 = fixUrl(cleanUrl);
          console.log(`${PROVIDER_TAG2} Imagestoo \xC7\xF6z\xFClen Video Kayna\u011F\u0131 \xBB ${finalM3u8Url2}`);
          return {
            url: finalM3u8Url2,
            quality: "Auto",
            headers: {
              "Referer": embedUrl,
              "Cookie": sessionCookie
            }
          };
        } else {
          console.error(`${PROVIDER_TAG2} Imagestoo API yan\u0131t\u0131ndan videoSource \xE7\u0131kar\u0131lamad\u0131! Yan\u0131t: ${responseText}`);
          return null;
        }
      }
      const embedResponse = yield fetch(embedUrl, {
        headers: {
          "User-Agent": userAgent,
          "Referer": url
        }
      });
      const embedSource = yield embedResponse.text();
      let extractedUrl = null;
      const sourcesMatch = embedSource.match(/sources\s*:\s*\[\s*\{\s*file\s*:\s*["']([^"']+\.m3u8.*?)["']/i);
      if (sourcesMatch && sourcesMatch[1]) {
        extractedUrl = sourcesMatch[1];
      } else {
        const vMatch = embedSource.match(/v\s*:\s*["']([^"']+\.html.*?)["']/i);
        if (vMatch && vMatch[1]) {
          extractedUrl = vMatch[1];
        }
      }
      if (!extractedUrl) {
        console.error(`${PROVIDER_TAG2} Embed kayna\u011F\u0131nda ge\xE7erli bir link bulunamad\u0131!`);
        return null;
      }
      let finalM3u8Url = extractedUrl;
      if (extractedUrl.includes(".html")) {
        const idMatch = extractedUrl.match(/embed-([^.]+)\.html/);
        if (idMatch && idMatch[1]) {
          finalM3u8Url = `https://s2.superadjacentsoddenly.xyz/hls2/01/00007/${idMatch[1]}_,n,h,.urlset/master.m3u8`;
        } else {
          console.error(`${PROVIDER_TAG2} HTML linkinden ID ay\u0131klanamad\u0131: ${extractedUrl}`);
          return null;
        }
      }
      console.log(`${PROVIDER_TAG2} Ba\u015Far\u0131yla \xFCretilen M3U8 URL: ${finalM3u8Url}`);
      const subtitles = [];
      const tracksBlockMatch = embedSource.match(new RegExp("tracks\\s*:\\s*\\[(.*?)\\]", "is"));
      if (tracksBlockMatch && tracksBlockMatch[1]) {
        const trackItemRegex = new RegExp("\\{(.*?)\\}", "gs");
        let itemMatch;
        while ((itemMatch = trackItemRegex.exec(tracksBlockMatch[1])) !== null) {
          const itemStr = itemMatch[1];
          const fileMatch = itemStr.match(/file\s*:\s*["']([^"']+)["']/);
          const labelMatch = itemStr.match(/label\s*:\s*["']([^"']+)["']/);
          if (fileMatch && fileMatch[1]) {
            const fileUrl = fileMatch[1];
            if (fileUrl.endsWith(".vtt") || fileUrl.endsWith(".srt")) {
              subtitles.push({
                label: labelMatch ? labelMatch[1] : "Unknown",
                file: fixUrl(fileUrl, siteUrl)
              });
            }
          }
        }
      }
      return {
        url: finalM3u8Url,
        quality: "Auto",
        headers: {
          "Referer": embedUrl
        },
        subtitles: subtitles.length > 0 ? subtitles : void 0
      };
    } catch (e) {
      console.error(`${PROVIDER_TAG2} resolveDizipal hatas\u0131: ${e.message}`);
      return null;
    }
  });
}

// src/patronDizipal/index.js
var PROVIDER_TAG3 = "[Dizipal]";
function getStreams(tmdbId, type, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`${PROVIDER_TAG3} getStreams: ${type} | TMDB: ${tmdbId} | S${season}E${episode}`);
      const activeUrl = yield resolveMainUrl();
      console.log(`${PROVIDER_TAG3} Aktif domain: ${activeUrl}`);
      const { trTitle, origTitle, shortTitle, year } = yield getTmdbTitle(tmdbId, type);
      console.log(`${PROVIDER_TAG3} TR: ${trTitle} | Orig: ${origTitle} | Y\u0131l: ${year}`);
      if (!trTitle && !origTitle) {
        console.warn(`${PROVIDER_TAG3} Ba\u015Fl\u0131k bulunamad\u0131, \xE7\u0131k\u0131l\u0131yor.`);
        return [];
      }
      const matchType = type === "movie" ? "Film" : "Dizi";
      const queries = [...new Set([trTitle, origTitle, shortTitle].filter((q) => q && q.length > 1))];
      let match = null;
      for (const query of queries) {
        console.log(`${PROVIDER_TAG3} Aran\u0131yor: "${query}"`);
        const searchUrl = `${activeUrl}/ajax-search?q=${encodeURIComponent(query)}`;
        try {
          const searchRes = yield fetch(searchUrl, {
            method: "GET",
            headers: {
              "Accept": "application/json, text/javascript, */*; q=0.01",
              "X-Requested-With": "XMLHttpRequest",
              "Referer": `${activeUrl}/`,
              "User-Agent": HEADERS["User-Agent"]
            }
          });
          if (!searchRes.ok)
            continue;
          const jsonResponse = yield searchRes.json();
          const results = (jsonResponse == null ? void 0 : jsonResponse.results) || [];
          if (!results.length)
            continue;
          for (const item of results) {
            const rTitleStr = item.title;
            const href = item.url;
            if (!rTitleStr || !href)
              continue;
            const normalize = (str) => (str || "").toLowerCase().replace(/[^a-z0-9ğüşıöç]/g, "");
            const rTitle = normalize(rTitleStr);
            const cleanTr = normalize(trTitle);
            const cleanOrig = normalize(origTitle);
            const cleanSh = normalize(shortTitle);
            const cleanQ = normalize(query);
            const titleMatches = rTitle === cleanTr || rTitle === cleanOrig || rTitle === cleanSh || rTitle === cleanQ || rTitle.includes(cleanQ) || cleanQ.includes(rTitle);
            if (titleMatches && (type === "movie" && item.type === "Film" || type === "tv" && item.type === "Dizi")) {
              match = { title: rTitleStr, url: href };
              break;
            }
          }
          if (match) {
            console.log(`${PROVIDER_TAG3} E\u015Fle\u015Fme: "${match.title}" -> ${match.url}`);
            break;
          }
        } catch (err) {
          console.error(`${PROVIDER_TAG3} Arama hatas\u0131 (${query}): ${err.message}`);
        }
      }
      if (!match) {
        console.warn(`${PROVIDER_TAG3} \u0130\xE7erik bulunamad\u0131.`);
        return [];
      }
      let contentUrl = fixUrl(match.url, activeUrl);
      if (type === "tv") {
        contentUrl = yield getEpisodeUrl(contentUrl, season, episode, activeUrl);
        if (!contentUrl) {
          console.warn(`${PROVIDER_TAG3} S${season}E${episode} b\xF6l\xFCm\xFC bulunamad\u0131.`);
          return [];
        }
      }
      const stream = yield resolveDizipal(contentUrl, activeUrl);
      if (stream) {
        return [{
          url: stream.url,
          quality: stream.quality || "Auto",
          headers: stream.headers || {}
        }];
      }
    } catch (e) {
      console.error(`${PROVIDER_TAG3} Genel hata: ${e.message}`);
    }
    return [];
  });
}
function getEpisodeUrl(seriesUrl, season, episode, activeUrl) {
  return __async(this, null, function* () {
    try {
      const html = yield fetchText(seriesUrl);
      const epNumPattern1 = new RegExp(`\\b${season}[.\\s]*[Ss]ezon[\\s.]*${episode}[.\\s]*[Bb][o\xF6]l[u\xFC]m\\b`, "i");
      const epNumPattern2 = new RegExp(`\\b${season}x${episode}\\b`, "i");
      const epBlockRegex = /<a[^>]+data-dizipal-pageloader[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/ig;
      let m;
      while ((m = epBlockRegex.exec(html)) !== null) {
        const href = m[1];
        const content = m[2];
        if (epNumPattern1.test(content) || epNumPattern2.test(content) || epNumPattern1.test(href) || epNumPattern2.test(href)) {
          const url = fixUrl(href, activeUrl);
          console.log(`${PROVIDER_TAG3} B\xF6l\xFCm URL (DOM match): ${url}`);
          return url;
        }
      }
      const slugPattern = new RegExp(`href=["']([^"']+\\/bolum\\/[^"']*-?${season}x${episode}[^"']*)["']`, "i");
      const slugMatch = html.match(slugPattern);
      if (slugMatch) {
        const url = fixUrl(slugMatch[1], activeUrl);
        console.log(`${PROVIDER_TAG3} B\xF6l\xFCm URL (slug match): ${url}`);
        return url;
      }
      const blocks = html.split('href="');
      for (const block of blocks) {
        if (block.includes("/bolum/")) {
          if (epNumPattern1.test(block) || epNumPattern2.test(block)) {
            const href = block.split('"')[0];
            const url = fixUrl(href, activeUrl);
            console.log(`${PROVIDER_TAG3} B\xF6l\xFCm URL (block split match): ${url}`);
            return url;
          }
        }
      }
      const seriesSlug = seriesUrl.split("/").filter(Boolean).pop();
      if (seriesSlug) {
        const guessUrl1 = `${activeUrl}/bolum/${seriesSlug}-${season}-sezon-${episode}-bolum`;
        const guessUrl2 = `${activeUrl}/bolum/${seriesSlug}-${season}x${episode}`;
        for (const gUrl of [guessUrl1, guessUrl2]) {
          console.log(`${PROVIDER_TAG3} URL tahmini: ${gUrl}`);
          try {
            const testRes = yield fetch(gUrl, { method: "HEAD", headers: HEADERS });
            if (testRes.ok)
              return gUrl;
          } catch (_) {
          }
        }
      }
      console.warn(`${PROVIDER_TAG3} B\xF6l\xFCm URL bulunamad\u0131: S${season}E${episode}`);
      return null;
    } catch (e) {
      console.error(`${PROVIDER_TAG3} getEpisodeUrl hatas\u0131: ${e.message}`);
      return null;
    }
  });
}
