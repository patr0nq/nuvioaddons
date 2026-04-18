/**
 * patronasyaAnimeleri - Built from src/patronasyaAnimeleri/
 * Generated: 2026-04-18T22:23:07.422Z
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

// src/patronasyaAnimeleri/http.js
var MAIN_URL = "https://asyaanimeleri.top";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
  "Referer": MAIN_URL + "/"
};
function fetchText(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    console.log(`[PatronAsyaAnimeleri] Fetching: ${url}`);
    const response = yield fetch(url, {
      headers: __spreadValues(__spreadValues({}, HEADERS), options.headers || {})
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} hatas\u0131: ${url}`);
    }
    return yield response.text();
  });
}
function fixUrl(url) {
  if (!url)
    return null;
  if (url.startsWith("http://") || url.startsWith("https://"))
    return url;
  if (url.startsWith("//"))
    return "https:" + url;
  if (url.startsWith("/"))
    return MAIN_URL + url;
  return MAIN_URL + "/" + url;
}

// src/patronasyaAnimeleri/tmdb.js
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
      return { trTitle: title, origTitle: title };
    } catch (e) {
      console.error(`[PatronAsyaAnimeleri] TMDB ba\u015Fl\u0131k hatas\u0131: ${e.message}`);
      return { trTitle: "", origTitle: "" };
    }
  });
}

// src/patronasyaAnimeleri/extractor.js
var import_cheerio_without_node_native = __toESM(require("cheerio-without-node-native"));

// src/patronasyaAnimeleri/extractors/vidmoly.js
var cheerio = __toESM(require("cheerio-without-node-native"));
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
        "User-Agent": HEADERS["User-Agent"],
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
        const $ = cheerio.load(html);
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

// src/patronasyaAnimeleri/extractors/sibnet.js
function extractSibnet(url) {
  return __async(this, null, function* () {
    try {
      const fetchUrl = url;
      const response = yield fetch(fetchUrl, {
        headers: {
          "User-Agent": HEADERS["User-Agent"],
          "Referer": "https://video.sibnet.ru/"
        }
      });
      const html = yield response.text();
      const match = html.match(/src\s*:\s*["'](\/v\/[^"']+)["']/);
      if (match) {
        let videoUrl = "https://video.sibnet.ru" + match[1];
        return {
          url: videoUrl,
          headers: { "Referer": url }
        };
      }
      return null;
    } catch (err) {
      return null;
    }
  });
}

// src/patronasyaAnimeleri/extractor.js
function searchAnime(query) {
  return __async(this, null, function* () {
    const searchUrl = `${MAIN_URL}/?s=${encodeURIComponent(query)}`;
    const html = yield fetchText(searchUrl);
    const $ = import_cheerio_without_node_native.default.load(html);
    const results = [];
    $("article.bs").each((i, el) => {
      const title = $(el).find("h2[itemprop='headline']").text().trim();
      const anchor = $(el).find("a[itemprop='url']").first();
      const href = anchor.attr("href");
      if (title && href) {
        results.push({ title: title.trim(), href });
      }
    });
    if (results.length === 0)
      return null;
    const queryLower = query.toLowerCase();
    let exact = results.find((r) => r.title.toLowerCase() === queryLower);
    if (!exact) {
      exact = results.find((r) => r.title.toLowerCase().includes(queryLower));
    }
    return exact ? exact.href : results[0].href;
  });
}
function getEpisodeUrl(animeUrl, season, episode) {
  return __async(this, null, function* () {
    const html = yield fetchText(animeUrl);
    const $ = import_cheerio_without_node_native.default.load(html);
    const episodes = [];
    $("div.eplister ul li").each((i, el) => {
      const anchor = $(el).find("a").first();
      const href = anchor.attr("href");
      const numText = anchor.find("div.epl-num").text().trim();
      const epNum = parseInt(numText.replace(/[^0-9]/g, ""), 10);
      if (href && !isNaN(epNum)) {
        episodes.push({ epNum, href });
      }
    });
    if (episodes.length === 0) {
      return animeUrl;
    }
    const targetEp = episode || 1;
    const found = episodes.find((e) => e.epNum === targetEp);
    if (found)
      return found.href;
    return episodes[episodes.length - 1].href;
  });
}
function extractFromEpisodePage(episodeUrl) {
  return __async(this, null, function* () {
    const html = yield fetchText(episodeUrl, {
      headers: { Referer: MAIN_URL + "/" }
    });
    const $ = import_cheerio_without_node_native.default.load(html);
    const streams = [];
    const mirrorOptions = $("select.mirror option");
    for (let i = 0; i < mirrorOptions.length; i++) {
      const opt = mirrorOptions.eq(i);
      const b64Value = opt.attr("value");
      if (!b64Value || b64Value.trim() === "")
        continue;
      try {
        const decoded = atob(b64Value);
        const iframeSrcMatch = decoded.match(/src="([^"]+)"/);
        if (!iframeSrcMatch)
          continue;
        let iframeSrc = iframeSrcMatch[1];
        if (!iframeSrc)
          continue;
        if (iframeSrc.includes("gdplayer.to/") && iframeSrc.includes("/embed/")) {
          iframeSrc = iframeSrc.replace("gdplayer.to/embed/", "vidmoly.to/embed-") + ".html";
        }
        const streamUrl = fixUrl(iframeSrc);
        const label = opt.text().trim() || `Mirror ${i + 1}`;
        if (streamUrl.includes(".m3u8") || streamUrl.includes(".mp4")) {
          streams.push({
            name: "PatronAsyaAnimeleri",
            title: `${label}`,
            url: streamUrl,
            quality: detectQuality(streamUrl, label),
            headers: __spreadValues({ Referer: MAIN_URL + "/" }, HEADERS)
          });
        } else {
          const embedResult = yield tryExtractFromEmbed(streamUrl, episodeUrl);
          if (embedResult) {
            streams.push({
              name: "PatronAsyaAnimeleri",
              title: `${label}`,
              url: embedResult.url,
              quality: detectQuality(embedResult.url, label),
              // Eğer tryExtractFromEmbed özel headers döndürdüyse öncelik ver
              headers: embedResult.headers ? __spreadValues(__spreadValues({}, HEADERS), embedResult.headers) : __spreadValues({ Referer: streamUrl }, HEADERS)
            });
          }
        }
      } catch (e) {
        console.error(`[PatronAsyaAnimeleri] Mirror \xE7\xF6zme hatas\u0131: ${e.message}`);
      }
    }
    const directIframes = [];
    $("div#pembed iframe, div.player-embed iframe, div.embed-responsive iframe").each((i, el) => {
      const iframeSrc = $(el).attr("src");
      if (iframeSrc && iframeSrc.trim() !== "") {
        directIframes.push(fixUrl(iframeSrc));
      }
    });
    for (let i = 0; i < directIframes.length; i++) {
      const streamUrl = directIframes[i];
      try {
        if (streamUrl.includes(".m3u8") || streamUrl.includes(".mp4")) {
          const alreadyAdded = streams.some((s) => s.url === streamUrl);
          if (!alreadyAdded) {
            streams.push({
              name: "PatronAsyaAnimeleri",
              title: `Direkt Y\xF6nlendirme ${i + 1}`,
              url: streamUrl,
              quality: "720p",
              headers: __spreadValues({ Referer: MAIN_URL + "/" }, HEADERS)
            });
          }
        } else {
          const embedResult = yield tryExtractFromEmbed(streamUrl, episodeUrl);
          if (embedResult) {
            const alreadyAdded = streams.some((s) => s.url === embedResult.url);
            if (!alreadyAdded) {
              streams.push({
                name: "PatronAsyaAnimeleri",
                title: `G\xF6m\xFCl\xFC Player ${i + 1}`,
                url: embedResult.url,
                quality: detectQuality(embedResult.url, ""),
                headers: embedResult.headers ? __spreadValues(__spreadValues({}, HEADERS), embedResult.headers) : __spreadValues({ Referer: MAIN_URL + "/" }, HEADERS)
              });
            }
          }
        }
      } catch (e) {
      }
    }
    return streams;
  });
}
function tryExtractFromEmbed(embedUrl, referer) {
  return __async(this, null, function* () {
    try {
      if (embedUrl.includes("vidmoly")) {
        const vidmolyRes = yield extractVidMoly(embedUrl, referer);
        if (vidmolyRes)
          return vidmolyRes;
      }
      if (embedUrl.includes("sibnet.ru")) {
        const sibnetRes = yield extractSibnet(embedUrl);
        if (sibnetRes)
          return sibnetRes;
      }
      const html = yield fetchText(embedUrl, {
        headers: {
          Referer: referer,
          Origin: new URL(embedUrl).origin
        }
      });
      const m3u8Match = html.match(/["'](https?:\/\/[^"']+\.m3u8[^"']*)['"]/);
      if (m3u8Match)
        return { url: m3u8Match[1] };
      const mp4Match = html.match(/["'](https?:\/\/[^"']+\.mp4[^"']*)['"]/);
      if (mp4Match)
        return { url: mp4Match[1] };
      const fileMatch = html.match(/file\s*:\s*["'](https?:\/\/[^"']+)['"]/);
      if (fileMatch)
        return { url: fileMatch[1] };
      return null;
    } catch (e) {
      console.error(`[PatronAsyaAnimeleri] Embed \xE7\u0131karma hatas\u0131: ${e.message}`);
      return null;
    }
  });
}
function detectQuality(url, label) {
  const combined = (url + " " + label).toLowerCase();
  if (combined.includes("1080") || combined.includes("fhd"))
    return "1080p";
  if (combined.includes("720") || combined.includes("hd"))
    return "720p";
  if (combined.includes("480") || combined.includes("sd"))
    return "480p";
  if (combined.includes("360"))
    return "360p";
  return "720p";
}
function extractStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    const { trTitle, origTitle } = yield getTmdbTitle(tmdbId, mediaType);
    console.log(`[PatronAsyaAnimeleri] TMDB: ${tmdbId} | T\xFCr: ${mediaType}`);
    console.log(`[PatronAsyaAnimeleri] Ba\u015Fl\u0131k TR: ${trTitle} | Orijinal: ${origTitle}`);
    if (!trTitle && !origTitle) {
      console.warn("[PatronAsyaAnimeleri] TMDB'den ba\u015Fl\u0131k al\u0131namad\u0131.");
      return [];
    }
    let animeUrl = null;
    let queryTr = trTitle;
    let queryOrig = origTitle;
    if (mediaType === "tv" && season > 1) {
      queryTr = `${trTitle} ${season}`;
      queryOrig = `${origTitle} ${season}`;
    }
    if (queryTr) {
      animeUrl = yield searchAnime(queryTr);
    }
    if (!animeUrl && queryOrig && queryOrig !== queryTr) {
      animeUrl = yield searchAnime(queryOrig);
    }
    if (!animeUrl && mediaType === "tv" && season > 1) {
      console.log(`[PatronAsyaAnimeleri] Sezonlu arama ba\u015Far\u0131s\u0131z, sezonsuz deneniyor...`);
      if (trTitle)
        animeUrl = yield searchAnime(trTitle);
      if (!animeUrl && origTitle)
        animeUrl = yield searchAnime(origTitle);
    }
    if (!animeUrl) {
      console.warn(`[PatronAsyaAnimeleri] Site'de i\xE7erik bulunamad\u0131: ${trTitle || origTitle}`);
      return [];
    }
    console.log(`[PatronAsyaAnimeleri] Anime sayfas\u0131 bulundu: ${animeUrl}`);
    let targetUrl = animeUrl;
    if (mediaType === "tv" && episode) {
      targetUrl = yield getEpisodeUrl(animeUrl, season, episode);
      console.log(`[PatronAsyaAnimeleri] B\xF6l\xFCm URL: ${targetUrl}`);
    }
    const streams = yield extractFromEpisodePage(targetUrl);
    console.log(`[PatronAsyaAnimeleri] Toplam stream: ${streams.length}`);
    return streams;
  });
}

// src/patronasyaAnimeleri/index.js
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[PatronAsyaAnimeleri] \u0130stek: ${mediaType} | TMDB: ${tmdbId} | S${season}E${episode}`);
      const streams = yield extractStreams(tmdbId, mediaType, season, episode);
      return streams;
    } catch (error) {
      console.error(`[PatronAsyaAnimeleri] Hata: ${error.message}`);
      return [];
    }
  });
}
module.exports = { getStreams };
