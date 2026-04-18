/**
 * patronDiziBox - Built from src/patronDiziBox/
 * Generated: 2026-04-18T23:29:44.630Z
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

// src/patronDiziBox/index.js
var patronDiziBox_exports = {};
__export(patronDiziBox_exports, {
  default: () => patronDiziBox_default
});
module.exports = __toCommonJS(patronDiziBox_exports);

// src/patronDiziBox/http.js
var MAIN_URL = "https://www.dizibox.live";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
  "Cookie": `isTrustedUser=true; dbxu=${Math.floor(Date.now())}`,
  "Upgrade-Insecure-Requests": "1"
};
function fetchText(_0) {
  return __async(this, arguments, function* (url, extraHeaders = {}) {
    const res = yield fetch(url, {
      method: "GET",
      headers: __spreadValues(__spreadValues({}, HEADERS), extraHeaders)
    });
    if (!res.ok) {
      if (res.status !== 404) {
        console.log(`[DiziBox] HTTP ${res.status} for ${url}`);
      }
      return "";
    }
    return yield res.text();
  });
}
function fixUrl(url) {
  if (!url)
    return null;
  if (url.startsWith("//"))
    return "https:" + url;
  if (url.startsWith("/"))
    return MAIN_URL + url;
  return url;
}

// src/patronDiziBox/tmdb.js
function getTmdbTitle(tmdbId, mediaType = "tv") {
  return __async(this, null, function* () {
    if (!tmdbId)
      return { trTitle: null, origTitle: null };
    const tmdbApiUrl = `https://api.themoviedb.org/3/${mediaType}/${tmdbId}?api_key=ca7e3ca0e060c4983084de1e15e83ec5&language=tr-TR`;
    try {
      const res = yield fetch(tmdbApiUrl);
      if (!res.ok)
        return { trTitle: null, origTitle: null };
      const data = yield res.json();
      const origTitle = data.original_title || data.original_name;
      const trTitle = data.title || data.name;
      return {
        trTitle,
        origTitle
      };
    } catch (err) {
      console.error("[TMDB] API hatas\u0131:", err.message);
      return { trTitle: null, origTitle: null };
    }
  });
}

// src/patronDiziBox/extractors/king.js
var import_crypto_js = __toESM(require("crypto-js"));
var import_cheerio_without_node_native = __toESM(require("cheerio-without-node-native"));
var HEADERS2 = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Referer": "https://www.dizibox.live/"
};
function extractKing(url) {
  return __async(this, null, function* () {
    try {
      let fixedUrl = url.replace("king.php?v=", "king.php?wmode=opaque&v=");
      let res = yield fetch(fixedUrl, { headers: HEADERS2 });
      let html = yield res.text();
      let $ = import_cheerio_without_node_native.default.load(html);
      let iframe = $("div#Player iframe").attr("src");
      if (iframe) {
        let res2 = yield fetch(iframe, { headers: __spreadProps(__spreadValues({}, HEADERS2), { "Referer": fixedUrl }) });
        let html2 = yield res2.text();
        let dataMatch = html2.match(/CryptoJS\.AES\.decrypt\("([^"]+)"\s*,\s*"([^"]+)"\)/);
        if (dataMatch) {
          let crypt_data = dataMatch[1];
          let crypt_pass = dataMatch[2];
          let bytes = import_crypto_js.default.AES.decrypt(crypt_data, crypt_pass);
          let decoded = bytes.toString(import_crypto_js.default.enc.Utf8);
          let videoMatch = decoded.match(/file:\s*'([^']+)'/);
          if (videoMatch) {
            return {
              url: videoMatch[1],
              quality: "1080p",
              // King usually HD
              headers: { "Referer": iframe }
            };
          } else if (decoded.startsWith("http")) {
            return {
              url: decoded,
              quality: "1080p",
              headers: { "Referer": iframe }
            };
          }
        }
      }
      return null;
    } catch (err) {
      console.error("[King] Hatas\u0131:", err.message);
      return null;
    }
  });
}

// src/patronDiziBox/extractors/okru.js
var HEADERS3 = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
};
var QUALITIES = {
  "mobile": "144p",
  "lowest": "240p",
  "low": "360p",
  "sd": "480p",
  "hd": "720p",
  "full": "1080p",
  "quad": "1440p",
  "ultra": "4k"
};
function extractOkRu(url) {
  return __async(this, null, function* () {
    try {
      const response = yield fetch(url, { headers: HEADERS3 });
      const html = yield response.text();
      const match = html.match(/data-options="([^"]+)"/);
      if (!match)
        return null;
      const optionsStr = match[1].replace(/&quot;/g, '"');
      const optionsJson = JSON.parse(optionsStr);
      if (!optionsJson || !optionsJson.flashvars || !optionsJson.flashvars.metadata) {
        return null;
      }
      const metadata = JSON.parse(optionsJson.flashvars.metadata);
      if (!metadata.videos || metadata.videos.length === 0)
        return null;
      const streams = [];
      metadata.videos.forEach((v) => {
        if (v.url) {
          streams.push({
            url: v.url.trim(),
            quality: QUALITIES[v.name] || v.name,
            headers: { "Referer": "https://ok.ru/" }
          });
        }
      });
      if (streams.length > 0) {
        const best = streams[streams.length - 1];
        return {
          url: best.url,
          quality: best.quality,
          headers: best.headers
        };
      }
      return null;
    } catch (e) {
      console.error("[OkRu] Error extracting:", e.message);
      return null;
    }
  });
}

// src/patronDiziBox/extractors/vidmoly.js
var cheerio2 = __toESM(require("cheerio-without-node-native"));
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

// src/patronDiziBox/extractor.js
var import_cheerio_without_node_native2 = __toESM(require("cheerio-without-node-native"));
function searchPage(query) {
  return __async(this, null, function* () {
    if (!query)
      return null;
    const searchUrl = `${MAIN_URL}/?s=${encodeURIComponent(query)}`;
    const html = yield fetchText(searchUrl);
    const $ = import_cheerio_without_node_native2.default.load(html);
    let match = null;
    let firstFallback = null;
    $("article.detailed-article").each((i, el) => {
      const title = $(el).find("h3 a").text().trim();
      const href = $(el).find("h3 a").attr("href");
      if (title && href) {
        if (!firstFallback)
          firstFallback = fixUrl(href);
        const safeTitle = title.toLocaleLowerCase("tr-TR").replace(/[^a-z0-9ğüşöçığ]/g, " ");
        const safeQuery = query.toLocaleLowerCase("tr-TR").replace(/[^a-z0-9ğüşöçığ]/g, " ");
        if (safeTitle.includes(safeQuery)) {
          if (!match)
            match = fixUrl(href);
        } else {
          const queryWords = safeQuery.split(" ").filter((w) => w.length > 2);
          let matchedWords = 0;
          for (const w of queryWords) {
            if (safeTitle.includes(w))
              matchedWords++;
          }
          if (queryWords.length > 0 && matchedWords >= queryWords.length / 2) {
            if (!match)
              match = fixUrl(href);
          }
        }
      }
    });
    return match || firstFallback;
  });
}
function findEpisodePage(seriesUrl, epSeason, epEpisode) {
  return __async(this, null, function* () {
    const html = yield fetchText(seriesUrl);
    const $ = import_cheerio_without_node_native2.default.load(html);
    let seasonUrl = null;
    $("div#seasons-list a").each((i, el) => {
      const title = $(el).text().trim().toLowerCase();
      const m = title.match(/(\d+)/);
      if (m && m[1] == epSeason) {
        seasonUrl = fixUrl($(el).attr("href"));
      }
    });
    if (!seasonUrl)
      return null;
    const seasonHtml = yield fetchText(seasonUrl);
    const s$ = import_cheerio_without_node_native2.default.load(seasonHtml);
    let episodeUrl = null;
    s$("article.grid-box").each((i, el) => {
      const epsTitle = s$(el).find("div.post-title a").text().toLowerCase().trim();
      const href = s$(el).find("div.post-title a").attr("href");
      const m = epsTitle.match(/(\d+)\.\s*bölüm/);
      if (m && m[1] == epEpisode) {
        episodeUrl = fixUrl(href);
      }
    });
    return episodeUrl;
  });
}
function extractMolyRedirect(url) {
  return __async(this, null, function* () {
    try {
      let fixedUrl = url.replace("moly.php?h=", "moly.php?wmode=opaque&h=");
      const html = yield fetchText(fixedUrl);
      let m = html.match(/unescape\("([^"]+)"\)/);
      if (m) {
        let decoded = unescape(m[1]);
        let str = Buffer.from(decoded, "base64").toString("utf8");
        let $ = import_cheerio_without_node_native2.default.load(str);
        let iframe = $("div#Player iframe").attr("src");
        if (iframe)
          return iframe;
      }
      return null;
    } catch (err) {
      console.error("[Dizibox Moly] Error:", err.message);
      return null;
    }
  });
}
function extractStreamsFromPage(episodeUrl) {
  return __async(this, null, function* () {
    const html = yield fetchText(episodeUrl);
    const $ = import_cheerio_without_node_native2.default.load(html);
    const streams = [];
    const iframesToProcess = [];
    const mainIframe = $("div#video-area iframe").attr("src");
    const currentName = $("div.video-toolbar option[selected]").text().trim() || "DiziBox";
    if (mainIframe)
      iframesToProcess.push({ name: currentName, url: mainIframe });
    const altOptions = [];
    $("div.video-toolbar option[value]").each((i, el) => {
      const val = $(el).attr("value");
      if (val && !$(el).attr("selected")) {
        altOptions.push($(el));
      }
    });
    for (const alt of altOptions) {
      try {
        const altName = alt.text().trim();
        const altUrl = alt.attr("value");
        const altHtml = yield fetchText(altUrl, { "Referer": episodeUrl });
        const altIframe = import_cheerio_without_node_native2.default.load(altHtml)("div#video-area iframe").attr("src");
        if (altIframe) {
          iframesToProcess.push({ name: altName, url: altIframe });
        }
      } catch (e) {
      }
    }
    for (const item of iframesToProcess) {
      let link = fixUrl(item.url);
      if (link.includes("king.php")) {
        const res = yield extractKing(link);
        if (res) {
          streams.push({
            name: "PatronDiziBox",
            title: `King - ${item.name}`,
            url: res.url,
            quality: res.quality,
            headers: res.headers || HEADERS
          });
        }
      } else if (link.includes("moly.php")) {
        const vmUrl = yield extractMolyRedirect(link);
        if (vmUrl) {
          const res = yield extractVidMoly(vmUrl, episodeUrl);
          if (res) {
            streams.push({
              name: "PatronDiziBox",
              title: `VidMoly - ${item.name}`,
              url: res.url,
              quality: "720p",
              headers: res.headers || HEADERS
            });
          }
        }
      } else if (link.includes("haydi.php")) {
        const base64param = link.split("?v=").pop();
        const okruUrl = Buffer.from(base64param, "base64").toString("utf8");
        const res = yield extractOkRu(okruUrl);
        if (res) {
          streams.push({
            name: "PatronDiziBox",
            title: `Ok.Ru - ${item.name}`,
            url: res.url,
            quality: res.quality || "720p",
            headers: res.headers || HEADERS
          });
        }
      } else if (link.includes("vidmoly.to") || link.includes("vidmoly.me")) {
        const res = yield extractVidMoly(link, episodeUrl);
        if (res) {
          streams.push({
            name: "PatronDiziBox",
            title: `VidMoly - ${item.name}`,
            url: res.url,
            quality: "720p",
            headers: res.headers || HEADERS
          });
        }
      }
    }
    return streams;
  });
}
function extractStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    if (mediaType !== "tv")
      return [];
    const { trTitle, origTitle } = yield getTmdbTitle(tmdbId, mediaType);
    console.log(`[PatronDiziBox] TMDB: ${tmdbId} | Dizi: ${trTitle}`);
    let seriesUrl = null;
    if (trTitle)
      seriesUrl = yield searchPage(trTitle);
    if (!seriesUrl && origTitle && origTitle !== trTitle)
      seriesUrl = yield searchPage(origTitle);
    if (!seriesUrl) {
      console.warn(`[PatronDiziBox] Site'de Dizi Bulunamad\u0131: ${trTitle || origTitle}`);
      return [];
    }
    console.log(`[PatronDiziBox] Dizi Sayfas\u0131 Bulundu: ${seriesUrl}`);
    const episodeUrl = yield findEpisodePage(seriesUrl, season, episode);
    if (!episodeUrl) {
      console.warn(`[PatronDiziBox] DiziBox \xFCzerinde S${season} E${episode} bulunamad\u0131!`);
      return [];
    }
    console.log(`[PatronDiziBox] B\xF6l\xFCm Sayfas\u0131: ${episodeUrl}`);
    const streams = yield extractStreamsFromPage(episodeUrl);
    console.log(`[PatronDiziBox] Toplam stream: ${streams.length}`);
    return streams;
  });
}

// src/patronDiziBox/index.js
var PatronDiziBox = {
  getStreams: (tmdbId, mediaType, season, episode) => __async(void 0, null, function* () {
    try {
      return yield extractStreams(tmdbId, mediaType, season, episode);
    } catch (error) {
      console.error("[PatronDiziBox] Hata olu\u015Ftu:", error);
      return [];
    }
  })
};
var patronDiziBox_default = PatronDiziBox;
