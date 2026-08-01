/**
 * patronDizipal - Built from src/patronDizipal/
 * Generated: 2026-06-18T22:41:25.378Z
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
var PASSPHRASE = "3hPn4uCjTVtfYWcjIcoJQ4cL1WWk1qxXI39egLYOmNv6IblA7eKJz68uU3eLzux1biZLCms0quEjTYniGv5z1JcKbNIsDQFSeIZOBZJz4is6pD7UyWDggWWzTLBQbHcQFpBQdClnuQaMNUHtLHTpzCvZy33p6I7wFBvL4fnXBYH84aUIyWGTRvM2G5cfoNf4705tO2kv";
function resolveDizipal(url, activeUrl) {
  return __async(this, null, function* () {
    try {
      const siteUrl = activeUrl || MAIN_URL;
      console.log(`${PROVIDER_TAG2} \xC7\xF6z\xFCmleniyor: ${url}`);
      const response = yield fetchWithResponse(url, {
        headers: { "Referer": siteUrl }
      });
      const html = yield response.text();
      let iframeUrl = "";
      const encMatch = html.match(/<div[^>]*data-rm-k=["']true["'][^>]*>([\s\S]*?)<\/div>/i);
      if (encMatch && encMatch[1]) {
        console.log(`${PROVIDER_TAG2} \u015Eifreli veri bulundu, \xE7\xF6z\xFCl\xFCyor...`);
        const unescapeHtml = (str) => {
          return str.replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'");
        };
        const cleanStr = unescapeHtml(encMatch[1]);
        const decryptedUrl = decryptDizipalData(cleanStr);
        if (decryptedUrl) {
          iframeUrl = decryptedUrl;
          console.log(`${PROVIDER_TAG2} \xC7\xF6z\xFClen Iframe: ${iframeUrl}`);
        } else {
          console.log(`${PROVIDER_TAG2} \u015Eifre \xE7\xF6zme i\u015Flemi ba\u015Far\u0131s\u0131z oldu.`);
        }
      }
      if (!iframeUrl) {
        console.log(`${PROVIDER_TAG2} Fallback iframe aran\u0131yor...`);
        const iframeMatch = html.match(/<iframe[^>]+src=["']([^"']+)["']/i);
        if (iframeMatch && iframeMatch[1]) {
          iframeUrl = iframeMatch[1];
          console.log(`${PROVIDER_TAG2} Fallback Iframe bulundu: ${iframeUrl}`);
        }
      }
      if (!iframeUrl) {
        console.error(`${PROVIDER_TAG2} Hi\xE7 iframe bulunamad\u0131.`);
        return null;
      }
      if (iframeUrl.startsWith("//")) {
        iframeUrl = `https:${iframeUrl}`;
      }
      console.log(`${PROVIDER_TAG2} Player URL taran\u0131yor: ${iframeUrl}`);
      let domain = "https://dplayer82.site";
      try {
        domain = new URL(iframeUrl).origin;
      } catch (e) {
      }
      const vParamMatch = iframeUrl.match(/[?&]v=([a-f0-9A-F]+)/);
      let playlistId = vParamMatch ? vParamMatch[1] : null;
      const directRe = /(https?:\/\/[^\s"'<>]+\.(?:m3u8|mp4)[^\s"'<>]*)/i;
      let directMatch = null;
      if (playlistId) {
        console.log(`${PROVIDER_TAG2} URL'den ID al\u0131nd\u0131: ${playlistId}`);
      } else {
        try {
          const playerRes = yield fetchWithResponse(iframeUrl, {
            headers: { "Referer": url, "Origin": domain }
          });
          const playerHtml = yield playerRes.text();
          const openPlayerMatch = playerHtml.match(/window\.openPlayer\s*\(\s*['"]([^'"]+)['"]/);
          if (openPlayerMatch && openPlayerMatch[1]) {
            playlistId = openPlayerMatch[1];
            console.log(`${PROVIDER_TAG2} openPlayer ID: ${playlistId}`);
          } else {
            directMatch = playerHtml.match(directRe);
            if (directMatch && directMatch[1]) {
              console.log(`${PROVIDER_TAG2} Bulundu (Direct): ${directMatch[1]}`);
              return {
                url: directMatch[1],
                quality: "Auto",
                headers: { "Referer": iframeUrl }
              };
            }
          }
        } catch (e) {
          console.log(`${PROVIDER_TAG2} Player sayfas\u0131 \xE7ekilemedi (CF olabilir): ${e.message}`);
        }
      }
      if (playlistId) {
        const apiUrl = `${domain}/source2.php?v=${playlistId}`;
        console.log(`${PROVIDER_TAG2} API sorgulan\u0131yor: ${apiUrl}`);
        try {
          const apiRes = yield fetchWithResponse(apiUrl, {
            headers: __spreadProps(__spreadValues({}, HEADERS), {
              "Origin": domain,
              "Referer": iframeUrl,
              "X-Requested-With": "XMLHttpRequest",
              "Accept": "application/json, text/javascript, */*; q=0.01",
              "Sec-Fetch-Mode": "cors",
              "Sec-Fetch-Site": "same-origin",
              "Sec-GPC": "1"
            })
          });
          const apiText = yield apiRes.text();
          const fileMatch = apiText.match(/"file"\s*:\s*"([^"]+)"/);
          if (fileMatch && fileMatch[1]) {
            let fileUrl = fileMatch[1].replace(/\\\//g, "/");
            if (fileUrl.startsWith("//")) {
              fileUrl = `https:${fileUrl}`;
            } else if (!fileUrl.startsWith("http")) {
              fileUrl = `https://${fileUrl}`;
            }
            if (fileUrl.includes("m.php")) {
              fileUrl = fileUrl.replace("m.php", "master.m3u8");
            }
            console.log(`${PROVIDER_TAG2} Bulundu (API): ${fileUrl}`);
            return {
              url: fileUrl,
              quality: "Auto",
              headers: { "Referer": iframeUrl }
            };
          }
        } catch (e) {
          console.error(`${PROVIDER_TAG2} API iste\u011Fi ba\u015Far\u0131s\u0131z: ${e.message}`);
        }
      }
      console.log(`${PROVIDER_TAG2} Iframe URL WebView arac\u0131l\u0131\u011F\u0131yla \xE7\xF6z\xFClmesi i\xE7in g\xF6nderiliyor...`);
      return {
        url: iframeUrl,
        quality: "Auto",
        headers: { "Referer": url }
      };
    } catch (e) {
      console.error(`${PROVIDER_TAG2} resolveDizipal hatas\u0131: ${e.message}`);
      return null;
    }
  });
}
function decryptDizipalData(rawJsonStr) {
  try {
    const ctMatch = rawJsonStr.match(/"ciphertext"\s*:\s*"([^"]+)"/);
    const ivMatch = rawJsonStr.match(/"iv"\s*:\s*"([^"]+)"/);
    const saltMatch = rawJsonStr.match(/"salt"\s*:\s*"([^"]+)"/);
    if (!ctMatch || !ivMatch || !saltMatch) {
      console.log(`${PROVIDER_TAG2} Eksik AES verisi`);
      return null;
    }
    const ctB64 = ctMatch[1].replace(/\\\//g, "/").replace(/\\n/g, "").replace(/\\/g, "");
    const ivHex = ivMatch[1].replace(/\\\//g, "/").replace(/\\n/g, "").replace(/\\/g, "");
    const saltHex = saltMatch[1].replace(/\\\//g, "/").replace(/\\n/g, "").replace(/\\/g, "");
    const salt = import_crypto_js.default.enc.Hex.parse(saltHex);
    const iv = import_crypto_js.default.enc.Hex.parse(ivHex);
    const key = import_crypto_js.default.PBKDF2(PASSPHRASE, salt, {
      keySize: 256 / 32,
      iterations: 999,
      hasher: import_crypto_js.default.algo.SHA512
    });
    const decrypted = import_crypto_js.default.AES.decrypt(ctB64, key, {
      iv,
      mode: import_crypto_js.default.mode.CBC,
      padding: import_crypto_js.default.pad.Pkcs7
    });
    let finalUrl = decrypted.toString(import_crypto_js.default.enc.Utf8);
    if (!finalUrl) {
      return null;
    }
    finalUrl = finalUrl.replace(/\\\//g, "/");
    if (finalUrl.startsWith("://")) {
      finalUrl = `https${finalUrl}`;
    } else if (finalUrl.startsWith("//")) {
      finalUrl = `https:${finalUrl}`;
    } else if (!finalUrl.startsWith("http")) {
      finalUrl = `https://${finalUrl}`;
    }
    return finalUrl;
  } catch (e) {
    console.error(`${PROVIDER_TAG2} \u015Eifre \xE7\xF6zme hatas\u0131: ${e.message}`);
    return null;
  }
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
      const mainHtml = yield fetchText(`${activeUrl}/`);
      const cKeyMatch = mainHtml.match(/name=["']cKey["'][^>]*value=["']([^"']+)["']/i);
      const cValueMatch = mainHtml.match(/name=["']cValue["'][^>]*value=["']([^"']+)["']/i);
      const cKey = cKeyMatch ? cKeyMatch[1] : "";
      const cValue = cValueMatch ? cValueMatch[1] : "";
      for (const query of queries) {
        console.log(`${PROVIDER_TAG3} Aran\u0131yor: "${query}"`);
        const searchUrl = `${activeUrl}/bg/searchcontent`;
        try {
          const searchRes = yield fetch(searchUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Requested-With": "XMLHttpRequest",
              "Referer": `${activeUrl}/`
            },
            body: `cKey=${encodeURIComponent(cKey)}&cValue=${encodeURIComponent(cValue)}&searchterm=${encodeURIComponent(query)}`
          });
          if (!searchRes.ok)
            continue;
          const jsonResponse = yield searchRes.json();
          const results = (jsonResponse == null ? void 0 : jsonResponse.data) || jsonResponse;
          const htmlStr = (results == null ? void 0 : results.html) || "";
          if (!htmlStr)
            continue;
          const itemRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>[\s\S]*?<span class="text-white">([^<]+)<\/span>/ig;
          let m;
          while ((m = itemRegex.exec(htmlStr)) !== null) {
            const href = m[1];
            const rTitleStr = m[2];
            const normalize = (str) => (str || "").toLowerCase().replace(/[^a-z0-9ğüşıöç]/g, "");
            const rTitle = normalize(rTitleStr);
            const cleanTr = normalize(trTitle);
            const cleanOrig = normalize(origTitle);
            const cleanSh = normalize(shortTitle);
            const cleanQ = normalize(query);
            const titleMatches = rTitle === cleanTr || rTitle === cleanOrig || rTitle === cleanSh || rTitle === cleanQ || rTitle.includes(cleanQ) || cleanQ.includes(rTitle);
            if (titleMatches) {
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
