/**
 * patronDizipal - Built from src/patronDizipal/
 * Generated: 2026-04-23T22:50:55.236Z
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
var MAIN_URL = "https://dizipal2045.com";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
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
function fetchText(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const res = yield fetchWithResponse(url, options);
    return yield res.text();
  });
}
function fetchJSON(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const text = yield fetchText(url, options);
    try {
      return JSON.parse(text.replace(/^\ufeff/, ""));
    } catch (e) {
      throw new Error(`JSON parse error: ${e.message}`);
    }
  });
}

// src/patronDizipal/tmdb.js
var import_cheerio_without_node_native = __toESM(require("cheerio-without-node-native"));
function getTmdbTitle(tmdbId, mediaType) {
  return __async(this, null, function* () {
    try {
      let decodeHtml = function (text) {
        return (text || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#039;/g, "'");
      };
      const type = mediaType === "movie" ? "movie" : "tv";
      const url = `https://www.themoviedb.org/${type}/${tmdbId}?language=tr-TR`;
      const response = yield fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
        }
      });
      if (!response.ok) {
        throw new Error(`TMDB HTML fetch hatasi: ${response.status}`);
      }
      const html = yield response.text();
      let title = "";
      const ogMatch = html.match(/<meta property="og:title" content="([^"]+)">/i);
      if (ogMatch) {
        title = decodeHtml(ogMatch[1]).split("(")[0].trim();
      } else {
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        if (titleMatch) {
          title = decodeHtml(titleMatch[1]).split("(")[0].split("\u2014")[0].split("\xE2\u20AC\u201D")[0].trim();
        }
      }
      const $ = import_cheerio_without_node_native.default.load(html);
      let origTitle = title;
      $("section.facts p").each((_, el) => {
        const text = $(el).text();
        if (text.includes("Orijinal Ba\u015Fl\u0131k") || text.includes("Original Title")) {
          const found = text.replace("Orijinal Ba\u015Fl\u0131k", "").replace("Original Title", "").trim();
          if (found)
            origTitle = decodeHtml(found);
        }
      });
      if (origTitle === title) {
        const origMatch = html.match(/<h3 class="caption" dir="auto">([^<]+)<\/h3>/i) || html.match(/<strong class="original_title">([^<]+)<\/strong>/i);
        if (origMatch) {
          const matched = decodeHtml(origMatch[1]).replace("Orijinal Adi", "").replace("Orijinal Ad\u0131", "").trim();
          if (matched)
            origTitle = matched;
        }
      }
      const yearMatch = html.match(/\((\d{4})\)/);
      const year = yearMatch ? parseInt(yearMatch[1]) : null;
      return { trTitle: title, origTitle, shortTitle, year };
    } catch (error) {
      console.error(`[TMDB] Baslik hatasi: ${error.message}`);
      return { trTitle: "", origTitle: "", shortTitle: "" };
    }
  });
}

// src/patronDizipal/extractor.js
function resolveDizipal(url) {
  return __async(this, null, function* () {
    var _a;
    try {
      console.log(`[Dizipal] Resolving URL: ${url}`);
      const response = yield fetchWithResponse(url);
      const html = yield response.text();
      const setCookie = response.headers.get("set-cookie");
      let cookies = "";
      if (setCookie) {
        cookies = setCookie.split(",").map((c) => c.split(";")[0]).join("; ");
      }
      const configTokenMatch = html.match(/id="videoContainer"[^>]+data-cfg="([^"]+)"/);
      const configToken = configTokenMatch ? configTokenMatch[1] : null;
      if (!configToken) {
        console.error("[Dizipal] data-cfg bulunamad\u0131!");
        return null;
      }
      console.log(`[Dizipal] Found Token: ${configToken}`);
      const configRes = yield fetch(`${MAIN_URL}/ajax-player-config`, {
        method: "POST",
        headers: __spreadProps(__spreadValues({}, HEADERS), {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
          "Origin": MAIN_URL,
          "Referer": url,
          "Cookie": cookies
        }),
        body: `cfg=${encodeURIComponent(configToken)}`
      });
      const configText = yield configRes.text();
      let configJson;
      try {
        configJson = JSON.parse(configText);
      } catch (e) {
        console.error(`[Dizipal] Config JSON parse error: ${e.message}`);
        return null;
      }
      const embedUrlRaw = ((_a = configJson.config) == null ? void 0 : _a.v) ? configJson.config.v.replace(/\\\//g, "/") : null;
      if (!embedUrlRaw) {
        console.error("[Dizipal] Embed URL al\u0131namad\u0131!");
        return null;
      }
      const embedUrl = fixUrl(embedUrlRaw);
      console.log(`[Dizipal] Embed URL: ${embedUrl}`);
      if (embedUrl.includes("imagestoo")) {
        return yield resolveImagestoo(embedUrl);
      } else {
        return yield resolveStandard(embedUrl, url);
      }
    } catch (e) {
      console.error(`[Dizipal] Error: ${e.message}`);
      return null;
    }
  });
}
function resolveImagestoo(embedUrl) {
  return __async(this, null, function* () {
    var _a;
    console.log(`[Dizipal] Resolving Imagestoo: ${embedUrl}`);
    const videoId = embedUrl.split("/").filter(Boolean).pop();
    const apiUrl = `https://imagestoo.com/player/index.php?data=${videoId}&do=getVideo`;
    const response = yield fetch(apiUrl, {
      method: "POST",
      headers: __spreadProps(__spreadValues({}, HEADERS), {
        "X-Requested-With": "XMLHttpRequest",
        "Referer": embedUrl
      })
    });
    if (!response.ok) {
      throw new Error(`Imagestoo API error: ${response.status}`);
    }
    const setCookie = response.headers.get("set-cookie");
    let sessionCookie = "";
    if (setCookie) {
      sessionCookie = ((_a = setCookie.split(",").find((c) => c.includes("fireplayer_player"))) == null ? void 0 : _a.split(";")[0]) || "";
    }
    const data = yield response.json();
    const securedLink = data.securedLink ? data.securedLink.replace(/\\\//g, "/") : null;
    if (securedLink) {
      const finalUrl = fixUrl(securedLink);
      return {
        url: finalUrl,
        quality: "Auto",
        headers: {
          "Referer": embedUrl,
          "Cookie": sessionCookie
        }
      };
    }
    return null;
  });
}
function resolveStandard(embedUrl, referer) {
  return __async(this, null, function* () {
    console.log(`[Dizipal] Resolving Standard: ${embedUrl}`);
    const html = yield fetchText(embedUrl, {
      headers: { "Referer": referer }
    });
    const m3u8Match = html.match(/sources\s*:\s*\[\s*\{\s*file\s*:\s*["']([^"']+\.m3u8.*?)["']/i) || html.match(/file\s*:\s*["']([^"']+\.m3u8.*?)["']/i);
    if (m3u8Match) {
      let fileUrl = m3u8Match[1];
      return {
        url: fileUrl,
        quality: "Auto",
        headers: { "Referer": embedUrl }
      };
    }
    return null;
  });
}

// src/patronDizipal/index.js
function getStreams(tmdbId, type, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[Dizipal] getStreams called for ${type} ${tmdbId} S${season}E${episode}`);
      const { trTitle, origTitle, shortTitle: shortTitle2, year } = yield getTmdbTitle(tmdbId, type);
      console.log(`[Dizipal] TMDB: ${tmdbId} | TR: ${trTitle} | ORIG: ${origTitle} | YEAR: ${year}`);
      if (!trTitle && !origTitle) {
        return [];
      }
      const queries = [trTitle, origTitle, shortTitle2].filter((q) => q && q.length > 1);
      let match = null;
      const matchType = type === "movie" ? "Film" : "Dizi";
      for (const query of queries) {
        console.log(`[Dizipal] Searching for: ${query}`);
        const searchUrl = `${MAIN_URL}/ajax-search?q=${encodeURIComponent(query)}`;
        try {
          const results = yield fetchJSON(searchUrl, {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Referer": `${MAIN_URL}/`
            }
          });
          if (results && results.success && results.results) {
            match = results.results.find((r) => {
              const rTitle = (r.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
              const rType = r.type;
              const rYear = r.year;
              if (rType !== matchType)
                return false;
              const cleanTr = (trTitle || "").toLowerCase().replace(/[^a-z0-9]/g, "");
              const cleanOrig = (origTitle || "").toLowerCase().replace(/[^a-z0-9]/g, "");
              const cleanShort = (shortTitle2 || "").toLowerCase().replace(/[^a-z0-9]/g, "");
              const cleanQuery = query.toLowerCase().replace(/[^a-z0-9]/g, "");
              const titleMatches = rTitle === cleanTr || rTitle === cleanOrig || rTitle === cleanShort || rTitle === cleanQuery || rTitle.includes(cleanQuery) || cleanQuery.includes(rTitle);
              const yearMatches = !year || !rYear || Math.abs(year - rYear) <= 1;
              return titleMatches && yearMatches;
            });
            if (match)
              break;
          }
        } catch (err) {
          console.error(`[Dizipal] Search error for ${query}: ${err.message}`);
        }
      }
      if (!match) {
        console.log("[Dizipal] No matching content found after all queries");
        return [];
      }
      console.log(`[Dizipal] Match found: ${match.title} -> ${match.url}`);
      let contentUrl = fixUrl(match.url);
      if (type === "tv") {
        contentUrl = yield getEpisodeUrl(contentUrl, season, episode);
        if (!contentUrl) {
          console.log(`[Dizipal] Episode S${season}E${episode} not found`);
          return [];
        }
      }
      const stream = yield resolveDizipal(contentUrl);
      if (stream) {
        return [{
          url: stream.url,
          quality: stream.quality || "Auto",
          headers: stream.headers || {}
        }];
      }
    } catch (e) {
      console.error(`[Dizipal] Global Error: ${e.message}`);
    }
    return [];
  });
}
function getEpisodeUrl(seriesUrl, season, episode) {
  return __async(this, null, function* () {
    const html = yield fetchText(seriesUrl);
    const pattern = new RegExp(`${season}\\.\\s*[Ss]ezon\\s*${episode}\\.\\s*[Bb]\xF6l\xFCm`, "i");
    const parts = html.split("detail-episode-item-wrap");
    for (const part of parts) {
      if (pattern.test(part)) {
        const hrefMatch = part.match(/href="([^"]+)"/);
        if (hrefMatch) {
          return fixUrl(hrefMatch[1]);
        }
      }
    }
    return null;
  });
}
