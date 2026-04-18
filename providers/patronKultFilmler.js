/**
 * patronKultFilmler - Built from src/patronKultFilmler/
 * Generated: 2026-04-18T23:01:35.130Z
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

// src/patronKultFilmler/index.js
var patronKultFilmler_exports = {};
__export(patronKultFilmler_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patronKultFilmler_exports);

// src/patronKultFilmler/extractor.js
var import_cheerio_without_node_native2 = __toESM(require("cheerio-without-node-native"));

// src/patronKultFilmler/http.js
var import_cheerio_without_node_native = __toESM(require("cheerio-without-node-native"));
var MAIN_URL = "https://kultfilmler.net";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
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
      console.error(`[PatronKultFilmler] fetchText hatas\u0131 (${url}):`, e.message);
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

// src/patronKultFilmler/tmdb.js
function getTmdbTitle(tmdbId, mediaType) {
  return __async(this, null, function* () {
    try {
      const type = mediaType === "movie" ? "movie" : "tv";
      const url = `https://www.themoviedb.org/${type}/${tmdbId}?language=tr-TR`;
      const response = yield fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
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
      console.error(`[PatronKultFilmler] TMDB ba\u015Fl\u0131k hatas\u0131: ${e.message}`);
      return { trTitle: "", origTitle: "" };
    }
  });
}

// src/patronasyaAnimeleri/extractors/vidmoly.js
var cheerio2 = __toESM(require("cheerio-without-node-native"));

// src/patronasyaAnimeleri/http.js
var MAIN_URL2 = "https://asyaanimeleri.top";
var HEADERS2 = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
  "Referer": MAIN_URL2 + "/"
};

// src/patronasyaAnimeleri/extractors/vidmoly.js
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
function extractVidMoly(url, referer) {
  return __async(this, null, function* () {
    try {
      let fetchUrl = url;
      fetchUrl = fetchUrl.replace(/https?:\/\/vidmoly\.[a-z]+/, "https://vidmoly.me");
      fetchUrl = fetchUrl.replace(/\/embed-([a-z0-9]+)\.html/, "/w/$1");
      let headers = {
        "User-Agent": HEADERS2["User-Agent"],
        "Sec-Fetch-Dest": "iframe"
      };
      if (referer)
        headers["Referer"] = referer;
      let response = yield fetch(fetchUrl, { headers });
      let html = yield response.text();
      if (html.toLowerCase().includes("video not found") || html.toLowerCase().includes("file was deleted")) {
        return null;
      }
      if (html.includes("Select number") || html.toLowerCase().includes("select the number")) {
        const $ = cheerio2.load(html);
        const opVal = $("input[name='op']").val();
        const fileCodeVal = $("input[name='file_code']").val();
        let answerVal = $("div.vhint b").text() || $("span.vhint b").text();
        if (!answerVal) {
          const ansMatch = html.match(/Please select (\d+)/i);
          if (ansMatch)
            answerVal = ansMatch[1];
        }
        const tsVal = $("input[name='ts']").val();
        const nonceVal = $("input[name='nonce']").val();
        const ctokVal = $("input[name='ctok']").val();
        if (opVal && fileCodeVal && answerVal) {
          const formData = new URLSearchParams();
          formData.append("op", opVal);
          formData.append("file_code", fileCodeVal);
          formData.append("answer", answerVal);
          formData.append("ts", tsVal);
          formData.append("nonce", nonceVal);
          formData.append("ctok", ctokVal);
          let postResponse = yield fetch(fetchUrl, {
            method: "POST",
            headers: __spreadProps(__spreadValues({}, headers), { "Content-Type": "application/x-www-form-urlencoded" }),
            body: formData.toString()
          });
          html = yield postResponse.text();
        }
      }
      let videoUrl = null;
      const scriptMatches = html.match(/eval\(function\(p,a,c,k,e,?[d]?\).*?\)\)/g);
      if (scriptMatches) {
        for (let script of scriptMatches) {
          const unpacked = unpackJS(script);
          const vidMatch = unpacked.match(/file\s*:\s*["']([^"']+\.m3u8[^"']*)["']/i) || unpacked.match(/file\s*:\s*["']([^"']+\.mp4[^"']*)["']/i);
          if (vidMatch) {
            videoUrl = vidMatch[1];
            break;
          }
        }
      }
      if (!videoUrl) {
        const vidMatch = html.match(/file\s*:\s*["']([^"']+\.m3u8[^"']*)["']/i) || html.match(/file\s*:\s*["']([^"']+\.mp4[^"']*)["']/i);
        if (vidMatch) {
          videoUrl = vidMatch[1];
        }
      }
      if (videoUrl) {
        return {
          url: videoUrl,
          headers: { "Referer": "https://vidmoly.me/" }
        };
      }
      return null;
    } catch (err) {
      console.error("[VidMoly] Error extracting:", err.message);
      return null;
    }
  });
}

// src/patronKultFilmler/extractors/vidpapi.js
function extractVidpapi(url, mainUrl) {
  return __async(this, null, function* () {
    try {
      const videoId = url.split("/").pop();
      if (!videoId)
        return null;
      const initialRes = yield fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Referer": mainUrl
        }
      });
      const setCookiePrefix = initialRes.headers.get("set-cookie") || "";
      let fpCookie = "";
      const match = setCookiePrefix.match(/fireplayer_player=([^;]+)/);
      if (match)
        fpCookie = match[1];
      const apiUrl = `https://vidpapi.xyz/player/index.php?data=${videoId}&do=getVideo`;
      const formData = new URLSearchParams();
      formData.append("data", videoId);
      formData.append("do", "getVideo");
      const apiRes = yield fetch(apiUrl, {
        method: "POST",
        body: formData,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Referer": url,
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Cookie": fpCookie ? `fireplayer_player=${fpCookie}` : ""
        }
      });
      const text = yield apiRes.text();
      const linkMatch = text.match(/"securedLink":"([^"]+)"/);
      if (linkMatch && linkMatch[1]) {
        return {
          url: linkMatch[1].replace(/\\\//g, "/"),
          headers: { "Referer": mainUrl }
        };
      }
      return null;
    } catch (e) {
      console.error(`[Vidpapi] \xC7\u0131karma hatas\u0131: ${e.message}`);
      return null;
    }
  });
}

// src/patronKultFilmler/extractor.js
function extractStreams(tmdbId, mediaType, reqSeason, reqEpisode) {
  return __async(this, null, function* () {
    const { trTitle, origTitle } = yield getTmdbTitle(tmdbId, mediaType);
    console.log(`[PatronKultFilmler] TMDB: ${tmdbId} | Title: ${trTitle || origTitle}`);
    if (!trTitle && !origTitle)
      return [];
    let resultUrl = yield searchPage(trTitle, mediaType);
    if (!resultUrl && origTitle && origTitle !== trTitle) {
      resultUrl = yield searchPage(origTitle, mediaType);
    }
    if (!resultUrl) {
      console.warn(`[PatronKultFilmler] \u0130\xE7erik bulunamad\u0131: ${trTitle || origTitle}`);
      return [];
    }
    let playbackUrl = resultUrl;
    if (mediaType === "tv") {
      playbackUrl = yield findEpisodePage(resultUrl, reqSeason, reqEpisode);
    }
    if (!playbackUrl) {
      console.warn(`[PatronKultFilmler] B\xF6l\xFCm bulunamad\u0131: S${reqSeason} E${reqEpisode}`);
      return [];
    }
    console.log(`[PatronKultFilmler] \xC7\u0131kar\u0131lacak sayfa: ${playbackUrl}`);
    return yield extractFromPage(playbackUrl);
  });
}
function searchPage(query, mediaType) {
  return __async(this, null, function* () {
    if (!query)
      return null;
    const searchUrl = `${MAIN_URL}/?s=${encodeURIComponent(query)}`;
    const html = yield fetchText(searchUrl);
    const $ = import_cheerio_without_node_native2.default.load(html);
    let match = null;
    $("div.movie-box").each((i, el) => {
      const a = $(el).find("a").first();
      const href = a.attr("href");
      let title = $(el).find("div.img img").attr("alt");
      if (title && href) {
        const isTv = href.includes("/dizi/");
        if (mediaType === "tv" && isTv || mediaType === "movie" && !isTv) {
          if (title.toLowerCase().includes(query.toLowerCase())) {
            if (!match)
              match = fixUrl(href);
          }
        }
      }
    });
    return match;
  });
}
function findEpisodePage(seriesUrl, season, episode) {
  return __async(this, null, function* () {
    const html = yield fetchText(seriesUrl);
    const $ = import_cheerio_without_node_native2.default.load(html);
    let episodeUrl = null;
    $("div.episode-box").each((i, el) => {
      const a = $(el).find("div.name a").first();
      const href = a.attr("href");
      const ssnDetail = $(el).find("span.episodetitle").first().contents().filter(function() {
        return this.type === "text";
      }).text().trim();
      const epDetail = $(el).find("span.episodetitle b").text().trim();
      const epSeason = parseInt(ssnDetail.split(".")[0]);
      const epEpisode = parseInt(epDetail.split(".")[0]);
      if (epSeason == season && epEpisode == episode) {
        episodeUrl = fixUrl(href);
      }
    });
    return episodeUrl;
  });
}
function decodeIframeCode(htmlString) {
  try {
    const match = htmlString.match(/PHA\+[0-9a-zA-Z+/=]*/);
    if (!match)
      return null;
    let atobStr = match[0];
    const padding = 4 - atobStr.length % 4;
    if (padding < 4) {
      atobStr = atobStr.padEnd(atobStr.length + padding, "=");
    }
    const decoded = Buffer.from(atobStr, "base64").toString("utf-8");
    const $ = import_cheerio_without_node_native2.default.load(decoded);
    return $("iframe").attr("src");
  } catch (e) {
    return null;
  }
}
function extractFromPage(pageUrl) {
  return __async(this, null, function* () {
    const html = yield fetchText(pageUrl);
    const $ = import_cheerio_without_node_native2.default.load(html);
    const iframes = /* @__PURE__ */ new Set();
    const streams = [];
    const mainIframe = decodeIframeCode(html);
    if (mainIframe)
      iframes.add(fixUrl(mainIframe));
    const altLinks = [];
    $("a.alternatif").each((i, el) => {
      const href = fixUrl($(el).attr("href"));
      if (href && href !== pageUrl) {
        altLinks.push({ url: href, title: $(el).text().trim() });
      }
    });
    for (const alt of altLinks) {
      try {
        const altHtml = yield fetchText(alt.url);
        const altIframe = decodeIframeCode(altHtml);
        if (altIframe)
          iframes.add(fixUrl(altIframe));
        const $alt = import_cheerio_without_node_native2.default.load(altHtml);
        const inlineIframe = $alt("div.container#player iframe").attr("src");
        if (inlineIframe)
          iframes.add(fixUrl(inlineIframe));
      } catch (e) {
        continue;
      }
    }
    let index = 1;
    for (let iframeUrl of iframes) {
      if (!iframeUrl)
        continue;
      if (iframeUrl.startsWith("//"))
        iframeUrl = "https:" + iframeUrl;
      try {
        if (iframeUrl.includes("vidmoly")) {
          const vidmolyRes = yield extractVidMoly(iframeUrl, pageUrl);
          if (vidmolyRes) {
            streams.push({
              name: "PatronKultFilmler",
              title: `VidMoly - Kaynak ${index}`,
              url: vidmolyRes.url,
              quality: "720p",
              headers: __spreadValues(__spreadValues({}, HEADERS), vidmolyRes.headers)
            });
          }
        } else if (iframeUrl.includes("vidpapi.xyz") || iframeUrl.includes("vidpapi.com")) {
          const vidpapiRes = yield extractVidpapi(iframeUrl, MAIN_URL);
          if (vidpapiRes) {
            streams.push({
              name: "PatronKultFilmler",
              title: `Vidpapi - Kaynak ${index}`,
              url: vidpapiRes.url,
              quality: "720p",
              headers: __spreadProps(__spreadValues(__spreadValues({}, HEADERS), vidpapiRes.headers), { Referer: MAIN_URL })
            });
          }
        } else if (iframeUrl.includes(".m3u8") || iframeUrl.includes(".mp4")) {
          streams.push({
            name: "PatronKultFilmler",
            title: `Embed - Kaynak ${index}`,
            url: iframeUrl,
            quality: "720p",
            headers: { Referer: MAIN_URL }
          });
        }
      } catch (e) {
        console.error(`Iframe \xE7\u0131karma hatas\u0131: ${e.message}`);
      }
      index++;
    }
    return streams;
  });
}

// src/patronKultFilmler/index.js
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[PatronKultFilmler] \u0130stek: ${mediaType} | TMDB: ${tmdbId}`);
      const streams = yield extractStreams(tmdbId, mediaType, season, episode);
      return streams;
    } catch (error) {
      console.error(`[PatronKultFilmler] Hata: ${error.message}`);
      return [];
    }
  });
}
