/**
 * patronDiziBox - Built from src/patronDiziBox/
 * Generated: 2026-04-19T00:10:21.517Z
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
    if (tmdbId === "100088")
      return { trTitle: "The Last of Us", origTitle: "The Last of Us" };
    if (tmdbId === "1396")
      return { trTitle: "Breaking Bad", origTitle: "Breaking Bad" };
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
      console.log(`[King] Fetching: ${fixedUrl}`);
      const res = yield fetch(fixedUrl, { headers: HEADERS2 });
      const html = yield res.text();
      const $ = import_cheerio_without_node_native.default.load(html);
      const iframe = $("div#Player iframe").attr("src");
      if (!iframe) {
        console.warn("[King] iframe bulunamad\u0131");
        return null;
      }
      const res2 = yield fetch(iframe, { headers: __spreadProps(__spreadValues({}, HEADERS2), { "Referer": fixedUrl }) });
      const html2 = yield res2.text();
      const dataMatch = html2.match(/CryptoJS\.AES\.decrypt\("([^"]+)"\s*,\s*"([^"]+)"\)/);
      if (dataMatch) {
        const bytes = import_crypto_js.default.AES.decrypt(dataMatch[1], dataMatch[2]);
        const decoded = bytes.toString(import_crypto_js.default.enc.Utf8);
        const vmF = decoded.match(/file\s*:\s*['"]([^'"]+)['"]/);
        if (vmF) {
          return { url: vmF[1], quality: "1080p", headers: { "Referer": iframe } };
        }
        if (decoded.startsWith("http")) {
          return { url: decoded.trim(), quality: "1080p", headers: { "Referer": iframe } };
        }
      }
      const m3u = html2.match(/["'](https?:\/\/[^"']+\.m3u8[^"']*)['"]/i);
      if (m3u)
        return { url: m3u[1], quality: "1080p", headers: { "Referer": iframe } };
      const mp4 = html2.match(/["'](https?:\/\/[^"']+\.mp4[^"']*)['"]/i);
      if (mp4)
        return { url: mp4[1], quality: "1080p", headers: { "Referer": iframe } };
      console.warn("[King] Oynat\u0131labilir URL bulunamad\u0131");
      return null;
    } catch (err) {
      console.error("[King] Hatas\u0131:", err.message);
      return null;
    }
  });
}

// src/patronDiziBox/extractors/okru.js
var import_cheerio_without_node_native2 = __toESM(require("cheerio-without-node-native"));
var HEADERS3 = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "Origin": "https://ok.ru"
};
var QUALITIES = {
  ULTRA: "4k",
  QUAD: "1440p",
  FULL: "1080p",
  HD: "720p",
  SD: "480p",
  LOW: "360p",
  MOBILE: "144p"
};
function extractOkRu(url) {
  return __async(this, null, function* () {
    var _a;
    try {
      console.log(`[OkRu] Extracting: ${url}`);
      let fetchUrl = url.replace(/^http:\/\//, "https://");
      if (fetchUrl.includes("/video/")) {
        fetchUrl = fetchUrl.replace("/video/", "/videoembed/");
      }
      const response = yield fetch(fetchUrl, { headers: HEADERS3 });
      const html = yield response.text();
      if (html.includes("\u0412\u0438\u0434\u0435\u043E \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u043E") || html.includes("not_found") || html.includes("copyrightsRestricted")) {
        console.warn("[OkRu] Video engellendi/bulunamad\u0131");
        return null;
      }
      const $ = import_cheerio_without_node_native2.default.load(html);
      const dataOptions = $("[data-module='OKVideo']").attr("data-options");
      let metadata = null;
      if (dataOptions) {
        try {
          const opts = JSON.parse(dataOptions);
          if (opts.flashvars && opts.flashvars.metadata) {
            metadata = JSON.parse(opts.flashvars.metadata);
          }
        } catch (e) {
          console.error("[OkRu] data-options JSON parse hatas\u0131");
        }
      }
      if (!metadata) {
        const metaMatch = html.match(/[\"']?metadata[\"']?\s*[:=]\s*[\"']?(\{.*?\})[\"']?/);
        if (metaMatch) {
          try {
            metadata = JSON.parse(metaMatch[1]);
          } catch (e) {
          }
        }
      }
      if (!metadata) {
        console.warn("[OkRu] Metadata bulunamad\u0131");
        return null;
      }
      let videoUrl = metadata.ondemandHls || metadata.ondemandDash;
      let quality = "720p";
      if (!videoUrl && metadata.videos && metadata.videos.length > 0) {
        const order = ["ULTRA", "QUAD", "FULL", "HD", "SD", "LOW", "MOBILE"];
        for (const q of order) {
          const v = metadata.videos.find((x) => x.name && x.name.toUpperCase() === q);
          if (v && v.url) {
            videoUrl = v.url;
            quality = QUALITIES[q] || q;
            console.log(`[OkRu] Kalite: ${quality}`);
            break;
          }
        }
        if (!videoUrl)
          videoUrl = (_a = metadata.videos[0]) == null ? void 0 : _a.url;
      }
      if (videoUrl) {
        videoUrl = videoUrl.replace(/\\u0026/g, "&").replace(/u0026/g, "&").replace(/\\\//g, "/");
        return {
          url: videoUrl,
          quality,
          headers: { "Referer": "https://ok.ru/", "User-Agent": HEADERS3["User-Agent"] }
        };
      }
      console.warn("[OkRu] Oynat\u0131labilir video URL bulunamad\u0131");
      return null;
    } catch (e) {
      console.error("[OkRu] Hata:", e.message);
      return null;
    }
  });
}

// src/patronDiziBox/extractors/vidmoly.js
var import_cheerio_without_node_native3 = __toESM(require("cheerio-without-node-native"));
function unpackJS(code) {
  try {
    const match = code.match(/}\('([^']*)',(\d+),(\d+),'([^']*)'\\.split\('\\|'\)/);
    if (!match)
      return code;
    let p = match[1];
    const a = parseInt(match[2], 10);
    const c = parseInt(match[3], 10);
    const k = match[4].split("|");
    const e = (n) => (n < a ? "" : e(parseInt(n / a, 10))) + (n % a > 35 ? String.fromCharCode(n % a + 29) : (n % a).toString(36));
    const map = {};
    for (let i = 0; i < c; i++)
      map[e(i)] = k[i];
    const keys = Object.keys(map).filter((key) => key && map[key]);
    if (keys.length === 0)
      return code;
    const dictRegex = new RegExp("\\b(" + keys.join("|") + ")\\b", "g");
    return p.replace(dictRegex, (m) => map[m] || m);
  } catch (err) {
    return code;
  }
}
function extractVidMoly(url, referer) {
  return __async(this, null, function* () {
    try {
      let fetchUrl = url.replace(/https?:\/\/vidmoly\.[a-z]+/, "https://vidmoly.me");
      fetchUrl = fetchUrl.replace(/\/embed-([a-z0-9]+)\.html/, "/w/$1");
      const headers = {
        "User-Agent": HEADERS["User-Agent"],
        "Sec-Fetch-Dest": "iframe",
        "Referer": referer || "https://vidmoly.me/"
      };
      let response = yield fetch(fetchUrl, { headers });
      let html = yield response.text();
      const lower = html.toLowerCase();
      if (lower.includes("video not found") || lower.includes("file was deleted") || lower.includes("this video not found")) {
        console.warn("[VidMoly] Video bulunamad\u0131 / silindi");
        return null;
      }
      if (html.includes("Select number") || lower.includes("select the number")) {
        const $ = import_cheerio_without_node_native3.default.load(html);
        const opVal = $("input[name='op']").val();
        const fileCodeVal = $("input[name='file_code']").val();
        let answerVal = $("div.vhint b").text() || $("span.vhint b").text();
        if (!answerVal) {
          const am = html.match(/Please select (\d+)/i);
          if (am)
            answerVal = am[1];
        }
        if (opVal && fileCodeVal && answerVal) {
          const formData = new URLSearchParams();
          formData.append("op", opVal);
          formData.append("file_code", fileCodeVal);
          formData.append("answer", answerVal);
          formData.append("ts", $("input[name='ts']").val() || "");
          formData.append("nonce", $("input[name='nonce']").val() || "");
          formData.append("ctok", $("input[name='ctok']").val() || "");
          const postResp = yield fetch(fetchUrl, {
            method: "POST",
            headers: __spreadProps(__spreadValues({}, headers), { "Content-Type": "application/x-www-form-urlencoded" }),
            body: formData.toString()
          });
          html = yield postResp.text();
        }
      }
      let videoUrl = null;
      const scripts = html.match(new RegExp("eval\\(function\\(p,a,c,k,e,?[d]?\\).*?\\)\\)", "gs"));
      if (scripts) {
        for (const script of scripts) {
          const unpacked = unpackJS(script);
          const vm = unpacked.match(/file\s*:\s*["']([^"']+\.(?:m3u8|mp4)[^"']*)['"]/i);
          if (vm) {
            videoUrl = vm[1];
            break;
          }
        }
      }
      if (!videoUrl) {
        const srcBlock = html.match(/sources\s*:\s*\[\s*\{[^}]*file\s*:\s*["']([^"']+)['"]/i);
        if (srcBlock)
          videoUrl = srcBlock[1];
      }
      if (!videoUrl) {
        const fm = html.match(/file\s*:\s*["']([^"']+\.(?:m3u8|mp4)[^"']*)['"]/i);
        if (fm)
          videoUrl = fm[1];
      }
      if (!videoUrl) {
        const m3u = html.match(/["'](https?:\/\/[^"']+\.m3u8[^"']*)['"]/i);
        if (m3u)
          videoUrl = m3u[1];
      }
      if (videoUrl) {
        return {
          url: videoUrl,
          headers: { "Referer": "https://vidmoly.me/" }
        };
      }
      console.warn(`[VidMoly] Video URL bulunamad\u0131: ${fetchUrl}`);
      return null;
    } catch (err) {
      console.error("[VidMoly] Hata:", err.message);
      return null;
    }
  });
}

// src/patronDiziBox/extractors/molystream.js
var import_crypto_js2 = __toESM(require("crypto-js"));
var import_cheerio_without_node_native4 = __toESM(require("cheerio-without-node-native"));
function extractMolyStream(url, referer) {
  return __async(this, null, function* () {
    try {
      const headers = {
        "User-Agent": HEADERS["User-Agent"],
        "Referer": referer || "https://www.dizibox.live/"
      };
      const res = yield fetch(url, { headers });
      let html = yield res.text();
      if (html.includes("Attention Required! | Cloudflare") || html.includes("Sorry, you have been blocked")) {
        console.warn("[MolyStream] Cloudflare engeli");
        return null;
      }
      const dm = html.match(/CryptoJS\.AES\.decrypt\("([^"]+)"\s*,\s*"([^"]+)"\)/);
      if (dm && typeof import_crypto_js2.default !== "undefined") {
        try {
          const dec = import_crypto_js2.default.AES.decrypt(dm[1], dm[2]).toString(import_crypto_js2.default.enc.Utf8);
          if (dec && (dec.includes("<html") || dec.includes("<video") || dec.includes("file"))) {
            html = dec;
          }
        } catch (e) {
        }
      }
      const $ = import_cheerio_without_node_native4.default.load(html);
      let videoUrl = $("video#sheplayer source").attr("src") || $("video source").attr("src") || $("video").attr("src");
      if (!videoUrl) {
        const patterns = [
          /(?:file|source)\s*[:=]\s*["']([^"']+\.(?:m3u8|mp4)[^"']*)['"]/i,
          /"(?:file|src)"\s*:\s*"([^"]+\.(?:m3u8|mp4)[^"]*)"/i,
          /file\s*:\s*["']([^"']+)['"]/i
        ];
        for (const p of patterns) {
          const m = html.match(p);
          if (m) {
            videoUrl = m[1].replace(/\\/g, "");
            break;
          }
        }
      }
      if (!videoUrl) {
        const m3u = html.match(/["'](https?:\/\/[^"']+\.m3u8[^"']*)['"]/i);
        if (m3u)
          videoUrl = m3u[1].replace(/\\/g, "");
      }
      if (videoUrl && (videoUrl.includes(".m3u8") || videoUrl.includes(".mp4"))) {
        return {
          url: videoUrl,
          headers: { "Referer": url, "User-Agent": headers["User-Agent"] }
        };
      }
      console.warn(`[MolyStream] Video URL bulunamad\u0131: ${url}`);
      return null;
    } catch (err) {
      console.error("[MolyStream] Hata:", err.message);
      return null;
    }
  });
}

// src/patronDiziBox/extractor.js
var import_cheerio_without_node_native5 = __toESM(require("cheerio-without-node-native"));
function searchPage(query) {
  return __async(this, null, function* () {
    if (!query)
      return null;
    const searchUrl = `${MAIN_URL}/?s=${encodeURIComponent(query)}`;
    console.log(`[PatronDiziBox] Aran\u0131yor: ${searchUrl}`);
    const html = yield fetchText(searchUrl);
    const $ = import_cheerio_without_node_native5.default.load(html);
    const canonicalUrl = $('link[rel="canonical"]').attr("href") || $('meta[property="og:url"]').attr("content");
    if ($("div.tv-overview").length > 0 && canonicalUrl) {
      console.log(`[PatronDiziBox] Do\u011Frudan dizi sayfas\u0131na y\xF6nlendirildi: ${canonicalUrl}`);
      return canonicalUrl;
    }
    const results = [];
    const containers = [
      "article.detailed-article",
      "article",
      "ul.post-lst li",
      ".grid-box",
      ".item",
      ".content-item"
    ];
    for (const sel of containers) {
      $(sel).each((i, el) => {
        const anchor = $(el).find("a").first();
        let href = anchor.attr("href");
        if (href && href.startsWith("/"))
          href = MAIN_URL + href;
        const title = anchor.attr("title") || anchor.text().trim() || $(el).find("h2, h3, .post-title").first().text().trim();
        if (href && (href.includes("dizibox") || href.includes("/diziler/")) && title) {
          results.push({ title: title.trim(), href });
        }
      });
      if (results.length > 0)
        break;
    }
    if (results.length === 0) {
      $("a[href]").each((i, el) => {
        const href = $(el).attr("href") || "";
        const title = $(el).text().trim() || $(el).attr("title") || "";
        if (href.includes("/diziler/") && title.length > 2) {
          results.push({ title, href });
        }
      });
    }
    if (results.length === 0) {
      console.warn(`[PatronDiziBox] Arama sonucu yok: ${query}`);
      return null;
    }
    const queryLower = query.toLowerCase().trim();
    let best = results.find((r) => r.title.toLowerCase() === queryLower);
    if (!best)
      best = results.find((r) => r.title.toLowerCase().includes(queryLower));
    if (!best)
      best = results[0];
    console.log(`[PatronDiziBox] En iyi e\u015Fle\u015Fme: "${best.title}" -> ${best.href}`);
    return best.href;
  });
}
function findEpisodePage(seriesUrl, epSeason, epEpisode) {
  return __async(this, null, function* () {
    const html = yield fetchText(seriesUrl);
    const $ = import_cheerio_without_node_native5.default.load(html);
    let seasonUrl = null;
    const seasonSelectors = [
      "div#seasons-list a",
      "ul.seasons-list li a",
      "div.seasons a",
      ".season-link",
      'a[href*="sezon"]'
    ];
    for (const sel of seasonSelectors) {
      $(sel).each((i, el) => {
        const text = $(el).text().trim().toLowerCase();
        const href = $(el).attr("href");
        if (!href)
          return;
        const m = text.match(/(\d+)/);
        if (m && parseInt(m[1]) === parseInt(epSeason)) {
          seasonUrl = fixUrl(href);
        }
      });
      if (seasonUrl)
        break;
    }
    if (!seasonUrl) {
      console.warn(`[PatronDiziBox] ${epSeason}. sezon linki bulunamad\u0131, ana sayfa kullan\u0131l\u0131yor`);
      seasonUrl = seriesUrl;
    }
    const seasonHtml = yield fetchText(seasonUrl);
    const s$ = import_cheerio_without_node_native5.default.load(seasonHtml);
    let episodeUrl = null;
    const epSelectors = [
      { container: "article.grid-box", titleEl: "div.post-title a", pattern: /(\d+)\.\s*bölüm/i },
      { container: "ul.episodelist li", titleEl: "a", pattern: /(\d+)/i },
      { container: ".eplister ul li", titleEl: "a", pattern: /(\d+)/i },
      { container: "li", titleEl: 'a[href*="bolum"], a[href*="sezon"]', pattern: /(\d+)/i }
    ];
    for (const { container, titleEl, pattern } of epSelectors) {
      s$(container).each((i, el) => {
        const anchor = s$(el).find(titleEl).first();
        const text = anchor.text().toLowerCase().trim();
        const href = anchor.attr("href");
        if (!href)
          return;
        const m = text.match(pattern);
        if (m && parseInt(m[1]) === parseInt(epEpisode)) {
          episodeUrl = fixUrl(href);
        }
      });
      if (episodeUrl)
        break;
    }
    if (!episodeUrl) {
      const epPad = String(epEpisode).padStart(2, "0");
      s$("a[href]").each((i, el) => {
        const href = s$(el).attr("href") || "";
        if ((href.includes(`-${epEpisode}-`) || href.includes(`-${epPad}-`) || href.endsWith(`-${epEpisode}/`) || href.endsWith(`-${epEpisode}`)) && href.includes("bolum")) {
          episodeUrl = fixUrl(href);
        }
      });
    }
    console.log(`[PatronDiziBox] B\xF6l\xFCm URL: ${episodeUrl}`);
    return episodeUrl;
  });
}
function extractMolyRedirect(url, referer) {
  return __async(this, null, function* () {
    try {
      let fixedUrl = url.replace("moly.php?h=", "moly.php?wmode=opaque&h=");
      console.log(`[Dizibox Moly] Fetching: ${fixedUrl}`);
      const html = yield fetchText(fixedUrl, { "Referer": referer || MAIN_URL });
      if (!html) {
        console.warn("[Dizibox Moly] HTML bos dondu");
        return null;
      }
      let m = html.match(/unescape\("([^"]+)"\)/);
      if (m) {
        let decoded = unescape(m[1]);
        let str;
        try {
          str = atob(decoded);
        } catch (e) {
          str = decoded;
        }
        const $ = import_cheerio_without_node_native5.default.load(str);
        let iframe = $("div#Player iframe").attr("src") || $("iframe").attr("src");
        console.log(`[Dizibox Moly] Iframe bulundu: ${iframe}`);
        return iframe || null;
      }
      let iframeMatch = html.match(/iframe[^>]+src=[\"']([^\"']+)[\"']/i);
      if (iframeMatch)
        return iframeMatch[1];
      console.warn("[Dizibox Moly] iframe bulunamadi");
      return null;
    } catch (err) {
      console.error("[Dizibox Moly] Error:", err.message);
      return null;
    }
  });
}
function extractStreamsFromPage(episodeUrl) {
  return __async(this, null, function* () {
    var _a;
    const html = yield fetchText(episodeUrl);
    const $ = import_cheerio_without_node_native5.default.load(html);
    const streams = [];
    const iframesToProcess = [];
    const mainIframe = $("div#video-area iframe, div#Player iframe, div.player-embed iframe").attr("src");
    const currentName = $("div.video-toolbar option[selected]").text().trim() || $("select.mirrorlist option[selected]").text().trim() || "DiziBox";
    if (mainIframe)
      iframesToProcess.push({ name: currentName, url: mainIframe });
    const altOptions = [];
    $("div.video-toolbar option[value], select.mirrorlist option[value]").each((i, el) => {
      const val = $(el).attr("value");
      if (val && !$(el).attr("selected") && val.startsWith("http")) {
        altOptions.push({ name: $(el).text().trim(), url: val });
      }
    });
    for (const alt of altOptions) {
      try {
        const altHtml = yield fetchText(alt.url, { "Referer": episodeUrl });
        const altIframe = import_cheerio_without_node_native5.default.load(altHtml)("div#video-area iframe, div#Player iframe").attr("src");
        if (altIframe)
          iframesToProcess.push({ name: alt.name, url: altIframe });
      } catch (e) {
      }
    }
    if (iframesToProcess.length === 0) {
      $("iframe[src]").each((i, el) => {
        const src = $(el).attr("src");
        if (src && src.startsWith("http")) {
          iframesToProcess.push({ name: `Player ${i + 1}`, url: src });
        }
      });
    }
    console.log(`[PatronDiziBox] ${iframesToProcess.length} iframe i\u015Flenecek`);
    for (const item of iframesToProcess) {
      const link = fixUrl(item.url);
      if (!link)
        continue;
      console.log(`[PatronDiziBox] Stream \u0130\u015Fleniyor: ${item.name} -> ${link}`);
      try {
        if (link.includes("king.php")) {
          const kingLink = link.includes("?") ? `${link}&wmode=opaque` : `${link}?wmode=opaque`;
          const res = yield extractKing(kingLink);
          if (res) {
            streams.push({ name: "PatronDiziBox", title: `King - ${item.name}`, url: res.url, quality: res.quality || "1080p", headers: res.headers || HEADERS });
          } else {
            const kingHtml = yield fetchText(kingLink, { "Referer": episodeUrl });
            const vmIframe = import_cheerio_without_node_native5.default.load(kingHtml)("div#Player iframe").attr("src");
            if (vmIframe) {
              const vmRes = vmIframe.includes("molystream") || vmIframe.includes("rufiiguta") ? yield extractMolyStream(vmIframe, kingLink) : yield extractVidMoly(vmIframe, kingLink);
              if (vmRes) {
                streams.push({ name: "PatronDiziBox", title: `Moly(K) - ${item.name}`, url: vmRes.url, quality: "720p", headers: vmRes.headers || HEADERS });
              }
            }
          }
        } else if (link.includes("moly.php")) {
          const vmUrl = yield extractMolyRedirect(link, episodeUrl);
          if (vmUrl) {
            const res = vmUrl.includes("molystream") || vmUrl.includes("rufiiguta") ? yield extractMolyStream(vmUrl, link) : yield extractVidMoly(vmUrl, link);
            if (res) {
              streams.push({ name: "PatronDiziBox", title: `Moly - ${item.name}`, url: res.url, quality: "720p", headers: res.headers || HEADERS });
            }
          }
        } else if (link.includes("haydi.php")) {
          const param = link.split("?v=").pop();
          let okruUrl;
          try {
            okruUrl = atob(param);
          } catch (e) {
            okruUrl = param;
          }
          console.log(`[PatronDiziBox] OkRu \xE7\xF6z\xFClen URL: ${okruUrl}`);
          const res = yield extractOkRu(okruUrl);
          if (res) {
            streams.push({ name: "PatronDiziBox", title: `Ok.Ru - ${item.name}`, url: res.url, quality: res.quality || "720p", headers: res.headers || HEADERS });
          }
        } else if (link.includes("vidmoly")) {
          const res = yield extractVidMoly(link, episodeUrl);
          if (res)
            streams.push({ name: "PatronDiziBox", title: `VidMoly - ${item.name}`, url: res.url, quality: "720p", headers: res.headers || HEADERS });
        } else if (link.includes("molystream") || link.includes("rufiiguta") || link.includes("sheila.stream")) {
          const res = yield extractMolyStream(link, episodeUrl);
          if (res)
            streams.push({ name: "PatronDiziBox", title: `MolyStream - ${item.name}`, url: res.url, quality: "720p", headers: res.headers || HEADERS });
        } else {
          const embedHtml = yield fetchText(link, { "Referer": episodeUrl });
          const m3u8 = embedHtml.match(/["'](https?:\/\/[^"']+\.m3u8[^"']*)['"]/i);
          const mp4 = embedHtml.match(/["'](https?:\/\/[^"']+\.mp4[^"']*)['"]/i);
          const found = (_a = m3u8 || mp4) == null ? void 0 : _a[1];
          if (found) {
            streams.push({ name: "PatronDiziBox", title: `Embed - ${item.name}`, url: found, quality: "720p", headers: HEADERS });
          }
        }
      } catch (e) {
        console.error(`[PatronDiziBox] ${item.name} hatas\u0131:`, e.message);
      }
    }
    return streams;
  });
}
function extractStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    if (mediaType === "movie")
      return [];
    const { trTitle, origTitle } = yield getTmdbTitle(tmdbId, mediaType);
    console.log(`[PatronDiziBox] TMDB: ${tmdbId} | TR: ${trTitle} | Orig: ${origTitle}`);
    if (!trTitle && !origTitle)
      return [];
    let seriesUrl = null;
    if (trTitle)
      seriesUrl = yield searchPage(trTitle);
    if (!seriesUrl && origTitle && origTitle !== trTitle)
      seriesUrl = yield searchPage(origTitle);
    if (!seriesUrl) {
      console.warn("[PatronDiziBox] Dizi sayfas\u0131 bulunamad\u0131");
      return [];
    }
    const episodeUrl = yield findEpisodePage(seriesUrl, season, episode);
    if (!episodeUrl) {
      console.warn("[PatronDiziBox] B\xF6l\xFCm sayfas\u0131 bulunamad\u0131");
      return [];
    }
    return yield extractStreamsFromPage(episodeUrl);
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
