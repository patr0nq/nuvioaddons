/**
 * patronDiziyou - Built from src/patronDiziyou/
 * Generated: 2026-10-09T18:01:37.204Z
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

// src/patronDiziyou/index.js
var patronDiziyou_exports = {};
__export(patronDiziyou_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patronDiziyou_exports);

// src/patronDiziyou/http.js
var PROVIDER_TAG = "[Diziyou]";
var FALLBACK_URL = "https://www.diziyou.one";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8"
};
function getDiziyouBaseUrl() {
  return __async(this, null, function* () {
    try {
      const githubUrl = "https://raw.githubusercontent.com/patr0nq/veriler/refs/heads/main/siteurl.txt";
      const res = yield fetch(githubUrl);
      if (!res.ok)
        throw new Error(`HTTP ${res.status}`);
      const text = yield res.text();
      const lines = text.split("\n");
      for (let line of lines) {
        line = line.trim();
        if (line.startsWith("diziyou:")) {
          let url = line.substring("diziyou:".length).trim();
          if (url.endsWith("/")) {
            url = url.slice(0, -1);
          }
          console.log(`${PROVIDER_TAG} Aktif domain (Github): ${url}`);
          return url;
        }
      }
    } catch (e) {
      console.error(`${PROVIDER_TAG} Github'dan domain \xE7ekilemedi: ${e.message}`);
    }
    console.log(`${PROVIDER_TAG} Aktif domain (Fallback): ${FALLBACK_URL}`);
    return FALLBACK_URL;
  });
}
function fixUrl(url, baseUrl) {
  if (!url)
    return "";
  if (url.startsWith("http")) {
    return url;
  } else if (url.startsWith("//")) {
    return `https:${url}`;
  } else {
    const cleanBase = baseUrl.replace(/\/$/, "");
    const cleanUrl = url.replace(/^\//, "");
    return `${cleanBase}/${cleanUrl}`;
  }
}
function fetchText(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    try {
      const response = yield fetch(url, __spreadProps(__spreadValues({}, options), {
        headers: __spreadValues(__spreadValues({}, HEADERS), options.headers)
      }));
      if (!response.ok) {
        if (response.status === 404)
          return "";
        throw new Error(`HTTP ${response.status}`);
      }
      return yield response.text();
    } catch (e) {
      console.error(`${PROVIDER_TAG} fetchText hatas\u0131 (${url}): ${e.message}`);
      return "";
    }
  });
}

// src/patronDiziyou/tmdb.js
var TMDB_API_KEY = "500330721680edb6d5f7f12ba7cd9023";
var PROVIDER_TAG2 = "[Diziyou]";
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
      console.log(`${PROVIDER_TAG2} [HTML] Ba\u015Fl\u0131k: ${trTitle} | Orijinal: ${origTitle} | Y\u0131l: ${year}`);
      return { trTitle, origTitle, shortTitle, year };
    } catch (e) {
      console.warn(`${PROVIDER_TAG2} [HTML] Scraping ba\u015Far\u0131s\u0131z: ${e.message}`);
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
      console.log(`${PROVIDER_TAG2} [API] Ba\u015Fl\u0131k: ${trTitle} | Orijinal: ${origTitle} | Y\u0131l: ${year}`);
      return { trTitle, origTitle, shortTitle, year };
    } catch (e) {
      console.warn(`${PROVIDER_TAG2} [API] REST API ba\u015Far\u0131s\u0131z: ${e.message}`);
      return null;
    }
  });
}
function getTmdbTitle(tmdbId, mediaType) {
  return __async(this, null, function* () {
    const htmlResult = yield getTmdbTitleFromHtml(tmdbId, mediaType);
    if (htmlResult)
      return htmlResult;
    console.log(`${PROVIDER_TAG2} HTML scraping ba\u015Far\u0131s\u0131z, TMDB REST API deneniyor...`);
    const apiResult = yield getTmdbTitleFromApi(tmdbId, mediaType);
    if (apiResult)
      return apiResult;
    console.error(`${PROVIDER_TAG2} Her iki y\xF6ntem de ba\u015Far\u0131s\u0131z: TMDB ID=${tmdbId}`);
    return { trTitle: "", origTitle: "", shortTitle: "", year: null };
  });
}

// src/patronDiziyou/extractor.js
function resolveDiziyou(epUrl, baseUrl) {
  return __async(this, null, function* () {
    try {
      console.log(`${PROVIDER_TAG} Kaynak aran\u0131yor: ${epUrl}`);
      const html = yield fetchText(epUrl, {
        headers: { "Referer": baseUrl }
      });
      if (!html) {
        console.error(`${PROVIDER_TAG} Kaynak sayfas\u0131 \xE7ekilemedi.`);
        return [];
      }
      const iframeMatch = html.match(/<iframe[^>]+id=["']diziyouPlayer["'][^>]+src=["']([^"']+)["']/i) || html.match(/<iframe[^>]+src=["']([^"']+)["'][^>]+id=["']diziyouPlayer["']/i);
      if (!iframeMatch) {
        console.error(`${PROVIDER_TAG} Player iframe bulunamad\u0131.`);
        return [];
      }
      const iframeSrc = iframeMatch[1];
      const parts = iframeSrc.split("/");
      const lastPart = parts[parts.length - 1];
      const itemId = lastPart.split(".html")[0];
      if (!itemId) {
        console.error(`${PROVIDER_TAG} Item ID \xE7\u0131kar\u0131lamad\u0131 (src: ${iframeSrc})`);
        return [];
      }
      let storageBase;
      try {
        const parsed = new URL(baseUrl);
        const host = parsed.hostname.replace(/^www\./, "");
        storageBase = `${parsed.protocol}//storage.${host}`;
      } catch (_) {
        storageBase = baseUrl.replace("www.", "storage.");
      }
      let hasDub = false;
      let hasSub = false;
      if (html.match(/id=["']turkceDublaj["']/i))
        hasDub = true;
      if (html.match(/id=["']turkceAltyazili["']/i))
        hasSub = true;
      const sources = [];
      if (hasSub || !hasDub && !hasSub) {
        sources.push({
          url: `${storageBase}/episodes/${itemId}/play.m3u8`,
          quality: "Auto",
          language: "tr",
          name: "Diziyou - Altyaz\u0131l\u0131",
          headers: { "Referer": `${baseUrl}/` }
        });
      }
      if (hasDub) {
        sources.push({
          url: `${storageBase}/episodes/${itemId}_tr/play.m3u8`,
          quality: "Auto",
          language: "tr",
          name: "Diziyou - Dublaj",
          headers: { "Referer": `${baseUrl}/` }
        });
      }
      console.log(`${PROVIDER_TAG} ${sources.length} adet kaynak bulundu.`);
      return sources;
    } catch (e) {
      console.error(`${PROVIDER_TAG} resolveDiziyou hatas\u0131: ${e.message}`);
      return [];
    }
  });
}

// src/patronDiziyou/index.js
function getStreams(tmdbId, type, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`${PROVIDER_TAG} getStreams: ${type} | TMDB: ${tmdbId} | S${season}E${episode}`);
      const tmdbData = yield getTmdbTitle(tmdbId, type);
      if (!tmdbData || !tmdbData.trTitle && !tmdbData.origTitle) {
        console.error(`${PROVIDER_TAG} TMDB bilgileri al\u0131namad\u0131.`);
        return [];
      }
      const { trTitle, origTitle, shortTitle, year } = tmdbData;
      const baseUrl = yield getDiziyouBaseUrl();
      const queries = [...new Set([trTitle, origTitle, shortTitle].filter((q) => q && q.length > 1))];
      let matchUrl = null;
      for (const query of queries) {
        console.log(`${PROVIDER_TAG} Aran\u0131yor: "${query}"`);
        const searchUrl = `${baseUrl}/wp-admin/admin-ajax.php`;
        const html = yield fetchText(searchUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest"
          },
          body: `action=data_fetch&keyword=${encodeURIComponent(query)}`
        });
        if (!html)
          continue;
        const patterns = [
          // Format 1: <div id='searchelement'> icinde <a href>
          /<div[^>]+id=["']searchelement["'][^>]*>[\s\S]*?<div[^>]+class=["']search-cat-img["'][^>]*>[\s\S]*?<\/div>\s*<a href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/ig,
          // Format 2: search class'li <a> elemani
          /<a[^>]+href=["']([^"']+)["'][^>]*class=["'][^"']*search[^"']*["'][^>]*>([^<]+)<\/a>/ig,
          // Format 3: li ya da div icerisindeki herhangi bir <a> + metin
          /<(?:li|div)[^>]*>[\s\S]*?<a[^>]+href=["'](https?:\/\/[^"']+)["'][^>]*>[\s\S]*?<(?:span|h[1-6]|p|div)[^>]*>([^<]+)<\/(?:span|h[1-6]|p|div)>/ig
        ];
        let found = false;
        for (const pat of patterns) {
          pat.lastIndex = 0;
          let m;
          while ((m = pat.exec(html)) !== null) {
            const href = m[1];
            const title = m[2] ? m[2].trim() : "";
            if (!href || !title)
              continue;
            const normalize = (str) => (str || "").toLowerCase().replace(/[^a-z0-9ğüşıöç]/g, "");
            const rTitle = normalize(title);
            const cleanTr = normalize(trTitle);
            const cleanOrig = normalize(origTitle);
            const cleanSh = normalize(shortTitle);
            const cleanQ = normalize(query);
            const titleMatches = rTitle === cleanTr || rTitle === cleanOrig || rTitle === cleanSh || rTitle === cleanQ || rTitle.includes(cleanQ) || cleanQ.includes(rTitle);
            if (titleMatches) {
              console.log(`${PROVIDER_TAG} E\u015Fle\u015Fme: "${title}" -> ${href}`);
              matchUrl = fixUrl(href, baseUrl);
              found = true;
              break;
            }
          }
          if (found)
            break;
        }
        if (matchUrl)
          break;
      }
      if (!matchUrl) {
        console.log(`${PROVIDER_TAG} \u0130\xE7erik bulunamad\u0131.`);
        return [];
      }
      let targetUrl = matchUrl;
      if (type === "tv") {
        console.log(`${PROVIDER_TAG} Dizi sayfas\u0131 inceleniyor: ${matchUrl}`);
        const seriesHtml = yield fetchText(matchUrl);
        const epPattern = new RegExp(`href=["']([^"']+-${season}-sezon-${episode}-bolum[^"']*)["']`, "i");
        const epMatch = seriesHtml.match(epPattern);
        const epPattern2 = new RegExp(`href=["']([^"']*/sezon-${season}/bolum-${episode}[/"'][^"']*)["']`, "i");
        const epMatch2 = seriesHtml.match(epPattern2);
        if (epMatch) {
          targetUrl = fixUrl(epMatch[1], baseUrl);
          console.log(`${PROVIDER_TAG} B\xF6l\xFCm URL (Regex-1): ${targetUrl}`);
        } else if (epMatch2) {
          targetUrl = fixUrl(epMatch2[1], baseUrl);
          console.log(`${PROVIDER_TAG} B\xF6l\xFCm URL (Regex-2): ${targetUrl}`);
        } else {
          const slug = matchUrl.replace(/\/$/, "").split("/").pop();
          const candidates = [
            `${baseUrl}/${slug}-${season}-sezon-${episode}-bolum/`,
            `${baseUrl}/dizi/${slug}/${season}-sezon-${episode}-bolum/`,
            `${baseUrl}/${slug}/sezon-${season}/bolum-${episode}/`
          ];
          targetUrl = candidates[0];
          for (const c of candidates) {
            try {
              const r = yield fetch(c, { method: "HEAD" });
              if (r.status < 400) {
                targetUrl = c;
                break;
              }
            } catch (_) {
            }
          }
          console.log(`${PROVIDER_TAG} B\xF6l\xFCm URL (Tahmin): ${targetUrl}`);
        }
      }
      const sources = yield resolveDiziyou(targetUrl, baseUrl);
      return sources;
    } catch (err) {
      console.error(`${PROVIDER_TAG} Hata: ${err.message}`);
      return [];
    }
  });
}
