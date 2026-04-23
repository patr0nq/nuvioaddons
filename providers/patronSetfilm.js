/**
 * patronSetfilm - Built from src/patronSetfilm/
 * Generated: 2026-04-23T22:28:53.864Z
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

// src/patronSetfilm/index.js
var patronSetfilm_exports = {};
__export(patronSetfilm_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patronSetfilm_exports);

// src/patronSetfilm/extractor.js
var import_cheerio_without_node_native2 = __toESM(require("cheerio-without-node-native"));

// src/patronSetfilm/http.js
var MAIN_URL = "https://www.setfilmizle.uk";
var AJAX_URL = `${MAIN_URL}/wp-admin/admin-ajax.php`;
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
};
function fixUrl(url, baseUrl) {
  if (!url)
    return "";
  if (url.startsWith("http://") || url.startsWith("https://"))
    return url;
  if (url.startsWith("//"))
    return `https:${url}`;
  if (!baseUrl)
    return url;
  try {
    return new URL(url, baseUrl).toString();
  } catch (_) {
    return url;
  }
}
function fetchText(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const response = yield fetch(url, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues(__spreadValues({}, HEADERS), options.headers || {})
    }));
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} -> ${url}`);
    }
    return yield response.text();
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

// src/patronSetfilm/tmdb.js
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
      let shortTitle = "";
      if (origTitle && (origTitle.includes(":") || origTitle.toLowerCase().includes(" and "))) {
        shortTitle = origTitle.split(":")[0].split(/ and /i)[0].trim();
      }
      return { trTitle: title, origTitle, shortTitle };
    } catch (error) {
      console.error(`[TMDB] Baslik hatasi: ${error.message}`);
      return { trTitle: "", origTitle: "", shortTitle: "" };
    }
  });
}

// src/patronSetfilm/extractor.js
var PROVIDER_NAME = "SetFilmIzle";
function normalizeTitle(value) {
  return (value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function getNonce() {
  return __async(this, arguments, function* (type = "video", referer = MAIN_URL) {
    try {
      const body = new URLSearchParams();
      body.append("action", "st_cache_refresh_nonces");
      const data = yield fetchJSON(AJAX_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Referer": referer,
          "X-Requested-With": "XMLHttpRequest"
        },
        body: body.toString()
      });
      if (data && data.success) {
        return data.data.nonces[type] || "";
      }
    } catch (e) {
      console.warn(`[${PROVIDER_NAME}] Nonce AJAX failed: ${e.message}`);
    }
    try {
      const html = yield fetchText(referer);
      const match = html.match(new RegExp(`${type}\\s*:\\s*["']([^"']+)["']`));
      return match ? match[1] : "";
    } catch (e) {
      console.error(`[${PROVIDER_NAME}] Nonce fallback failed: ${e.message}`);
    }
    return "";
  });
}
function searchContent(query, nonce) {
  return __async(this, null, function* () {
    const body = new URLSearchParams();
    body.append("action", "ajax_search");
    body.append("search", query);
    body.append("original_search", query);
    body.append("nonce", nonce);
    const data = yield fetchJSON(AJAX_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": MAIN_URL,
        "X-Requested-With": "XMLHttpRequest"
      },
      body: body.toString()
    });
    const html = data.html || "";
    const $ = import_cheerio_without_node_native2.default.load(html);
    const results = [];
    $("article").each((_, el) => {
      const title = $(el).find("h2").text().trim();
      const href = $(el).find("a").attr("href");
      if (title && href) {
        results.push({ title, href: fixUrl(href, MAIN_URL) });
      }
    });
    return results;
  });
}
function fetchVideoUrl(postId, playerName, partKey, nonce, referer) {
  return __async(this, null, function* () {
    var _a;
    const body = new URLSearchParams();
    body.append("action", "get_video_url");
    body.append("nonce", nonce);
    body.append("post_id", postId);
    body.append("player_name", playerName || "");
    body.append("part_key", partKey || "");
    try {
      const data = yield fetchJSON(AJAX_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Referer": referer,
          "X-Requested-With": "XMLHttpRequest"
        },
        body: body.toString()
      });
      let iframeUrl = (_a = data.data) == null ? void 0 : _a.url;
      if (iframeUrl && !iframeUrl.includes("setplay") && partKey) {
        iframeUrl += (iframeUrl.includes("?") ? "&" : "?") + `partKey=${partKey}`;
      }
      return iframeUrl;
    } catch (e) {
      console.error(`[${PROVIDER_NAME}] Video URL fetch failed: ${e.message}`);
      return null;
    }
  });
}
function resolveFastPlay(url, referer) {
  return __async(this, null, function* () {
    try {
      const html = yield fetchText(url, { headers: { "Referer": referer } });
      const streamUrlMatch = html.match(/const\s+streamUrl\s*=\s*['"]([^'"]+)['"]/) || html.match(/streamUrl\s*=\s*['"]([^'"]+)['"]/);
      const streamTypeMatch = html.match(/const\s+streamType\s*=\s*['"]([^'"]+)['"]/) || html.match(/streamType\s*=\s*['"]([^'"]+)['"]/);
      let streamUrl = streamUrlMatch ? streamUrlMatch[1] : "";
      if (!streamUrl && html.includes("file : streamUrl")) {
        const manifestMatch = html.match(/['"](\/manifests\/[^'"]+)['"]/);
        if (manifestMatch)
          streamUrl = manifestMatch[1];
      }
      if (!streamUrl)
        return null;
      let finalUrl = fixUrl(streamUrl, "https://fastplay.mom");
      if (!/\.(m3u8|mp4|mkv)/i.test(finalUrl)) {
        finalUrl += finalUrl.includes("#") ? "" : "#.m3u8";
      }
      return {
        url: finalUrl,
        quality: "Auto",
        headers: { "Referer": url }
      };
    } catch (e) {
      console.error(`[FastPlay] Error: ${e.message}`);
      return null;
    }
  });
}
function resolveSetPrime(url, referer) {
  return __async(this, null, function* () {
    try {
      const cleanUrl = url.split("&partKey=")[0].split("?partKey=")[0];
      const postUrl = cleanUrl.replace("embed?i=", "embed/get?i=");
      const text = yield fetchText(postUrl, {
        method: "POST",
        headers: {
          "Referer": cleanUrl,
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        }
      });
      let suffix = null;
      try {
        const json = JSON.parse(text);
        if (json && json.Links && json.Links.length > 0) {
          suffix = json.Links[0];
        }
      } catch (e) {
        const linkMatch = text.match(/Links":\["([^"\]]+)"/);
        if (linkMatch)
          suffix = linkMatch[1];
      }
      if (suffix) {
        return {
          url: `https://setplay.site${suffix}`,
          quality: "Auto",
          headers: { "Referer": cleanUrl }
        };
      }
    } catch (e) {
      console.error(`[SetPrime] Error: ${e.message}`);
    }
    return null;
  });
}
function resolveSetPlay(url, referer) {
  return __async(this, null, function* () {
    try {
      const html = yield fetchText(url, {
        headers: {
          "Referer": referer || "https://www.setfilmizle.uk/",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        }
      });
      const firePlayerMatch = html.match(/FirePlayer\s*\(\s*[^,]+,\s*(\{[\s\S]+?\})\s*,\s*(?:true|false)\s*\)/);
      if (firePlayerMatch) {
        try {
          const data = JSON.parse(firePlayerMatch[1]);
          const videoUrl = data.videoUrl;
          const videoServer = data.videoServer || "1";
          if (videoUrl) {
            const baseUrl = new URL(url).origin;
            let m3uLink = `${baseUrl}${videoUrl.replace(/\\\//g, "/")}?s=${videoServer}`;
            if (!/\.(m3u8|mp4|mkv)/i.test(m3uLink) && !m3uLink.includes("#")) {
              m3uLink += "#.m3u8";
            }
            return {
              url: m3uLink,
              quality: "Auto",
              headers: { "Referer": url }
            };
          }
        } catch (e) {
          console.error(`[SetPlay] JSON parse error: ${e.message}`);
        }
      }
      const sourcesMatch = html.match(new RegExp("sources\\s*:\\s*\\[(.+?)\\]", "s"));
      if (sourcesMatch) {
        const fileMatch = sourcesMatch[1].match(/file\s*:\s*["']([^"']+)["']/);
        if (fileMatch) {
          return {
            url: fileMatch[1],
            quality: "Auto",
            headers: { "Referer": url }
          };
        }
      }
      const m3u8Match = html.match(/["'](https?:\/\/[^"']+\.(m3u8|mp4|mkv)[^"']*)["']/i);
      if (m3u8Match) {
        return {
          url: m3u8Match[1],
          quality: "Auto",
          headers: { "Referer": url }
        };
      }
      if (html.includes("player_base_url")) {
        const manifestMatch = html.match(/["'](\/manifests\/[^"']+)["']/);
        if (manifestMatch) {
          const baseUrlMatch = html.match(/player_base_url\s*=\s*["']([^"']+)["']/);
          const baseUrl = baseUrlMatch ? baseUrlMatch[1] : "https://setplay.shop/player";
          return {
            url: fixUrl(manifestMatch[1], baseUrl) + "#.m3u8",
            quality: "Auto",
            headers: { "Referer": url }
          };
        }
      }
    } catch (e) {
      console.error(`[SetPlay] Error: ${e.message}`);
    }
    let finalUrl = url;
    if (!/\.(m3u8|mp4|mkv)/i.test(finalUrl)) {
      finalUrl += finalUrl.includes("#") ? "" : "#.mkv";
    }
    return {
      url: finalUrl,
      quality: "Auto",
      headers: { "Referer": referer }
    };
  });
}
function extractStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      const { trTitle, origTitle, shortTitle } = yield getTmdbTitle(tmdbId, mediaType);
      console.log(`[${PROVIDER_NAME}] TMDB: ${tmdbId} | TR: ${trTitle} | ORIG: ${origTitle}`);
      if (!trTitle && !origTitle)
        return [];
      const searchNonce = yield getNonce("search");
      console.log(`[${PROVIDER_NAME}] Search Nonce: ${searchNonce}`);
      let results = yield searchContent(trTitle, searchNonce);
      if (!results.length && origTitle && origTitle !== trTitle) {
        results = yield searchContent(origTitle, searchNonce);
      }
      if (!results.length && shortTitle) {
        results = yield searchContent(shortTitle, searchNonce);
      }
      const q = normalizeTitle(trTitle || origTitle);
      const match = results.find((item) => normalizeTitle(item.title) === q) || results.find((item) => normalizeTitle(item.title).includes(q)) || results[0];
      if (!match) {
        console.warn(`[${PROVIDER_NAME}] Content not found`);
        return [];
      }
      let contentUrl = match.href;
      const isMovie = mediaType === "movie";
      if (!isMovie) {
        const seriesHtml = yield fetchText(contentUrl);
        const $s = import_cheerio_without_node_native2.default.load(seriesHtml);
        let episodeUrl = "";
        $s("div#episodes ul.episodios li").each((_, el) => {
          const epTitle = $s(el).find("h4.episodiotitle a").text().trim();
          const epHref = $s(el).find("h4.episodiotitle a").attr("href");
          const sMatch = epTitle.match(/([0-9]+)\.?\s*(Sezon|Season)/i);
          const eMatch = epTitle.match(/([0-9]+)\.?\s*(Bölüm|Episode)/i);
          if (sMatch && eMatch) {
            if (parseInt(sMatch[1]) == season && parseInt(eMatch[1]) == episode) {
              episodeUrl = fixUrl(epHref, MAIN_URL);
            }
          }
        });
        if (!episodeUrl) {
          console.warn(`[${PROVIDER_NAME}] Episode not found: S${season}E${episode}`);
          return [];
        }
        contentUrl = episodeUrl;
      }
      const pageHtml = yield fetchText(contentUrl);
      const $ = import_cheerio_without_node_native2.default.load(pageHtml);
      const videoNonce = yield getNonce("video", contentUrl);
      const streams = [];
      const partLabels = {
        "turkcedublaj": "Dublaj",
        "turkcealtyazi": "Altyaz\u0131",
        "orijinal": "Orijinal"
      };
      let playerElements = $("a[data-player-name]");
      if (playerElements.length === 0) {
        playerElements = $("nav.player a");
      }
      console.log(`[${PROVIDER_NAME}] Found ${playerElements.length} player elements`);
      const fetchPromises = [];
      playerElements.each((_, el) => {
        const postId = $(el).attr("data-post-id");
        const playerName = $(el).attr("data-player-name") || $(el).find("b").text().trim() || $(el).text().trim();
        const partKey = $(el).attr("data-part-key");
        console.log(`[${PROVIDER_NAME}] Player: ${playerName} | ID: ${postId} | Key: ${partKey}`);
        if (postId) {
          fetchPromises.push((() => __async(this, null, function* () {
            const iframeUrl = yield fetchVideoUrl(postId, playerName, partKey, videoNonce, contentUrl);
            if (iframeUrl) {
              const label = partLabels[partKey] || partKey || "";
              const title = [playerName, label].filter(Boolean).join(" | ");
              let resolved = null;
              const lowerIframe = iframeUrl.toLowerCase();
              if (lowerIframe.includes("fastplay.mom")) {
                resolved = yield resolveFastPlay(iframeUrl, contentUrl);
              } else if (lowerIframe.includes("setprime") || lowerIframe.includes("stplay.cfd")) {
                const primeUrl = iframeUrl.includes("partKey=") ? iframeUrl : `${iframeUrl}${iframeUrl.includes("?") ? "&" : "?"}partKey=${partKey || ""}`;
                resolved = yield resolveSetPrime(primeUrl, contentUrl);
              } else if (lowerIframe.includes("setplay")) {
                resolved = yield resolveSetPlay(iframeUrl, contentUrl);
              }
              if (resolved) {
                streams.push(__spreadValues({
                  name: PROVIDER_NAME,
                  title
                }, resolved));
              } else {
                let finalUrl = iframeUrl;
                if (lowerIframe.includes("stplay.cfd") && !lowerIframe.includes("partkey=")) {
                  finalUrl += `${finalUrl.includes("?") ? "&" : "?"}partKey=${partKey || ""}`;
                }
                if (!/\.(m3u8|mp4|mkv)/i.test(finalUrl)) {
                  finalUrl += finalUrl.includes("#") ? "" : "#.mkv";
                }
                streams.push({
                  name: PROVIDER_NAME,
                  title,
                  url: finalUrl,
                  quality: "Auto",
                  headers: { "Referer": contentUrl }
                });
              }
            }
          }))());
        }
      });
      yield Promise.all(fetchPromises);
      return streams;
    } catch (error) {
      console.error(`[${PROVIDER_NAME}] Extractor error: ${error.message}`);
      return [];
    }
  });
}

// src/patronSetfilm/index.js
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[SetFilmIzle] getStreams called for ${mediaType} ${tmdbId} S${season}E${episode}`);
      const streams = yield extractStreams(tmdbId, mediaType, season, episode);
      console.log(`[SetFilmIzle] Returning ${streams.length} streams`);
      return streams;
    } catch (error) {
      console.error(`[SetFilmIzle] Error in getStreams: ${error.message}`);
      return [];
    }
  });
}
