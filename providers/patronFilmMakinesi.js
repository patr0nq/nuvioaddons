/**
 * patronFilmMakinesi - Built from src/patronFilmMakinesi/
 * Generated: 2026-08-02T11:38:20.285Z
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

// src/patronFilmMakinesi/index.js
var patronFilmMakinesi_exports = {};
__export(patronFilmMakinesi_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patronFilmMakinesi_exports);

// src/patronFilmMakinesi/http.js
var cheerio = __toESM(require("cheerio-without-node-native"));
var MAIN_URL = "https://filmmakinesi.to";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
  "Accept-Encoding": "gzip, deflate, br",
  "DNT": "1",
  "Connection": "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Cache-Control": "max-age=0"
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
      console.error(`[PatronFilmMakinesi] fetchText hatas\u0131 (${url}):`, e.message);
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

// src/patronFilmMakinesi/tmdb.js
var TMDB_API_KEY = "500330721680edb6d5f7f12ba7cd9023";
var PROVIDER_TAG = "[PatronFilmMakinesi]";
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

// src/patronFilmMakinesi/extractors/closeload.js
function decodeBase64Latin1(input) {
  try {
    if (!input)
      return "";
    let padded = input.replace(/\s/g, "");
    while (padded.length % 4 !== 0) {
      padded += "=";
    }
    if (typeof atob === "function") {
      return atob(padded);
    }
    return Buffer.from(padded, "base64").toString("latin1");
  } catch (e) {
    return input;
  }
}
function rotN(str, shift) {
  return str.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
  });
}
function decryptNative(html) {
  try {
    const scriptBlockMatch = html.match(
      /<script[^>]*>([\s\S]*?dc_[a-zA-Z0-9_]+\([\s\S]*?)<\/script>/i
    );
    const scriptContent = scriptBlockMatch == null ? void 0 : scriptBlockMatch[1];
    if (!scriptContent)
      return null;
    const arrayMatch = scriptContent.match(/\(\[((?:"[^"]+",?\s*)+)\]\)/);
    if (!(arrayMatch == null ? void 0 : arrayMatch[1]))
      return null;
    const parts = arrayMatch[1].split(",").map((s) => s.trim().replace(/^"|"$/g, "").replace(/\\\//g, "/"));
    const moduloMatch = scriptContent.match(/(\d+)\s*%\s*\(i\s*\+\s*(\d+)\)/);
    const magicNum = (moduloMatch == null ? void 0 : moduloMatch[1]) ? Number(moduloMatch[1]) : 399756995;
    const magicOffset = (moduloMatch == null ? void 0 : moduloMatch[2]) ? Number(moduloMatch[2]) : 5;
    const funcStartIdx = scriptContent.indexOf("function dc_");
    const funcEndIdx = scriptContent.indexOf("function d1x()", funcStartIdx);
    const functionBody = funcStartIdx !== -1 ? scriptContent.substring(funcStartIdx, funcEndIdx !== -1 ? funcEndIdx : scriptContent.length) : scriptContent;
    let rotShift = 13;
    const rotShiftMatch = functionBody.match(/charCodeAt\(0\)\s*\+\s*(\d+)/);
    if (rotShiftMatch) {
      rotShift = Number(rotShiftMatch[1]);
    } else {
      const rotShiftMatch2 = functionBody.match(/o\s*-\s*base\s*([+-])\s*(\d+)/);
      if (rotShiftMatch2) {
        const sign = rotShiftMatch2[1];
        const num = Number(rotShiftMatch2[2]);
        rotShift = sign === "-" ? (26 - num) % 26 : num;
      }
    }
    const operations = [];
    let idx = functionBody.indexOf("atob(");
    while (idx >= 0) {
      operations.push({ idx, op: "atob" });
      idx = functionBody.indexOf("atob(", idx + 1);
    }
    idx = functionBody.indexOf("reverse");
    while (idx >= 0) {
      operations.push({ idx, op: "reverse" });
      idx = functionBody.indexOf("reverse", idx + 1);
    }
    idx = functionBody.indexOf("replace");
    while (idx >= 0) {
      operations.push({ idx, op: "rot" });
      idx = functionBody.indexOf("replace", idx + 1);
    }
    operations.sort((a, b) => a.idx - b.idx);
    let result = parts.join("");
    for (const { op } of operations) {
      if (op === "reverse")
        result = result.split("").reverse().join("");
      else if (op === "atob")
        result = decodeBase64Latin1(result);
      else if (op === "rot")
        result = rotN(result, rotShift);
    }
    let unmix = "";
    for (let i = 0; i < result.length; i++) {
      const decryptedCode = (result.charCodeAt(i) - magicNum % (i + magicOffset) + 256) % 256;
      unmix += String.fromCharCode(decryptedCode);
    }
    if (unmix && /^https?:\/\//i.test(unmix)) {
      return unmix;
    }
    return null;
  } catch (e) {
    console.error("[CloseLoad] decryptNative error:", e == null ? void 0 : e.message);
    return null;
  }
}
function processSubtitles(html) {
  var _a, _b, _c;
  const subtitles = [];
  try {
    const tracksMatch = html.match(/tracks\s*:\s*(\[[\s\S]*?\])/i);
    if (!(tracksMatch == null ? void 0 : tracksMatch[1]))
      return subtitles;
    const blocks = tracksMatch[1].match(/\{[^}]*\}/g) || [];
    for (const block of blocks) {
      const file = (_b = (_a = block.match(/"file"\s*:\s*"([^"]+)"/)) == null ? void 0 : _a[1]) == null ? void 0 : _b.replace(/\\\//g, "/");
      const label = ((_c = block.match(/"label"\s*:\s*"([^"]+)"/)) == null ? void 0 : _c[1]) || "Altyazi";
      if (file && /^https?:\/\//i.test(file)) {
        subtitles.push({ label, file });
      }
    }
  } catch (e) {
  }
  return subtitles;
}
function extractCloseLoad(url, referer) {
  return __async(this, null, function* () {
    var _a;
    try {
      const CLOSELOAD_ORIGIN = "https://closeload.filmmakinesi.to";
      const headers = {
        "User-Agent": HEADERS["User-Agent"],
        "Referer": referer || CLOSELOAD_ORIGIN + "/",
        "Origin": CLOSELOAD_ORIGIN,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
      };
      const response = yield fetch(url, { headers });
      if (!response.ok) {
        console.warn(`[CloseLoad] HTTP ${response.status} \u2014 ${url}`);
        return null;
      }
      const html = yield response.text();
      let videoUrl = decryptNative(html);
      if (!videoUrl) {
        const ldMatch = html.match(/"contentUrl"\s*:\s*"([^"]+)"/i);
        videoUrl = ((_a = ldMatch == null ? void 0 : ldMatch[1]) == null ? void 0 : _a.replace(/\\\//g, "/")) || null;
      }
      if (!videoUrl) {
        const directPatterns = [
          html.match(/file\s*:\s*["'](https?:\/\/[^"']+\.(?:m3u8|mp4)[^"']*)["']/i),
          html.match(/["'](https?:\/\/[^"']+\.(?:m3u8|mp4)[^"']*)["']/i),
          html.match(/sources\s*:\s*\[\s*\{\s*["']?file["']?\s*:\s*["']([^"']+)["']/i),
          html.match(/player\.src\(["']([^"']+)["']\)/i),
          html.match(/source\s*:\s*["'](https?:\/\/[^"']+)["']/i)
        ];
        for (const m of directPatterns) {
          if (m == null ? void 0 : m[1]) {
            videoUrl = m[1];
            break;
          }
        }
      }
      if (videoUrl && /^https?:\/\//i.test(videoUrl)) {
        const subtitles = processSubtitles(html);
        return {
          url: videoUrl,
          quality: "1080p",
          headers: {
            "Referer": CLOSELOAD_ORIGIN + "/",
            "User-Agent": HEADERS["User-Agent"]
          },
          subtitles
        };
      }
      console.warn("[CloseLoad] Video URL cikarilamadi:", url);
      return null;
    } catch (err) {
      console.error("[CloseLoad] Hata:", (err == null ? void 0 : err.message) || err);
      return null;
    }
  });
}

// src/patronFilmMakinesi/extractors/vidmoly.js
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

// src/patronFilmMakinesi/extractors/sibnet.js
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
        try {
          const redirectRes = yield fetch(videoUrl, {
            method: "GET",
            redirect: "manual",
            headers: {
              "User-Agent": HEADERS["User-Agent"],
              "Referer": url
            }
          });
          let finalUrl = redirectRes.headers.get("location");
          if (finalUrl) {
            if (finalUrl.startsWith("//"))
              finalUrl = "https:" + finalUrl;
            videoUrl = finalUrl;
          } else if (redirectRes.url && redirectRes.url !== videoUrl) {
            videoUrl = redirectRes.url;
          }
        } catch (e) {
        }
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

// src/patronFilmMakinesi/extractors/rapid.js
function extractRapid(url, referer) {
  return __async(this, null, function* () {
    try {
      const origin = new URL(url).origin;
      const headers = {
        "User-Agent": HEADERS["User-Agent"],
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
        "Referer": referer || "https://filmmakinesi.to/",
        "Origin": origin
      };
      const response = yield fetch(url, { headers });
      if (!response.ok) {
        console.warn(`[Rapid] HTTP ${response.status} \u2014 ${url}`);
        return null;
      }
      const html = yield response.text();
      const pLoc = html.indexOf("eval(function(p,a,c,k,e,d)");
      if (pLoc !== -1) {
        let count = 0, endObj = pLoc;
        for (let i = pLoc + 4; i < html.length; i++) {
          if (html[i] === "(")
            count++;
          else if (html[i] === ")") {
            count--;
            if (count === 0) {
              endObj = i + 1;
              break;
            }
          }
        }
        const packed = html.substring(pLoc, endObj);
        const evalStr = packed.replace(/^eval\(/, "(");
        try {
          const unpacked = new Function(`return ${evalStr}`)();
          const streamMatch = unpacked.match(/["'](https?:\/\/[^"']+\.m3u8[^"']*)['"]/i) || unpacked.match(/["'](https?:\/\/[^"']+\.mp4[^"']*)['"]/i) || unpacked.match(/file\s*[=:]\s*["']([^"']+\.(?:m3u8|mp4)[^"']*)['"]/i);
          if (streamMatch == null ? void 0 : streamMatch[1]) {
            return {
              url: streamMatch[1].trim(),
              quality: "Auto",
              headers: {
                "User-Agent": headers["User-Agent"],
                "Referer": origin + "/",
                "Origin": origin
              }
            };
          }
        } catch (e) {
        }
      }
      const directMatch = html.match(/file\s*:\s*["']([^"']+\.m3u8[^"']*)['"]/i) || html.match(/file\s*:\s*["']([^"']+\.mp4[^"']*)['"]/i) || html.match(/["'](https?:\/\/[^"']+\.m3u8[^"']*)['"]/i) || html.match(/["'](https?:\/\/[^"']+\.mp4[^"']*)['"]/i) || html.match(/source\s*:\s*["']([^"']+\.m3u8[^"']*)['"]/i);
      if (directMatch == null ? void 0 : directMatch[1]) {
        return {
          url: directMatch[1].trim(),
          quality: "Auto",
          headers: {
            "User-Agent": headers["User-Agent"],
            "Referer": origin + "/",
            "Origin": origin
          }
        };
      }
      const b64Match = html.match(/atob\(['"]([A-Za-z0-9+/=]{20,})['"]\)/);
      if (b64Match == null ? void 0 : b64Match[1]) {
        try {
          const decoded = typeof atob === "function" ? atob(b64Match[1]) : Buffer.from(b64Match[1], "base64").toString("utf-8");
          const urlMatch = decoded.match(/(https?:\/\/[^\s"']+\.m3u8[^\s"']*)/i) || decoded.match(/(https?:\/\/[^\s"']+\.mp4[^\s"']*)/i);
          if (urlMatch == null ? void 0 : urlMatch[1]) {
            return {
              url: urlMatch[1].trim(),
              quality: "Auto",
              headers: {
                "User-Agent": headers["User-Agent"],
                "Referer": origin + "/"
              }
            };
          }
        } catch (e) {
        }
      }
      console.warn("[Rapid] Stream URL bulunamad\u0131:", url);
      return null;
    } catch (err) {
      console.error("[Rapid] Hata:", (err == null ? void 0 : err.message) || err);
      return null;
    }
  });
}

// src/patronFilmMakinesi/extractor.js
var import_cheerio_without_node_native = __toESM(require("cheerio-without-node-native"));
function inferLanguage(label = "") {
  const value = (label || "").toLowerCase();
  if (value.includes("dublaj"))
    return "Dublaj";
  if (value.includes("altyazi") || value.includes("altyaz\u0131") || value.includes("sub"))
    return "Altyazi";
  if (/\btr\b|turkce|türkçe/.test(value))
    return "TR";
  if (/\ben\b|english/.test(value))
    return "EN";
  return "Bilinmiyor";
}
function buildMeta(player, label) {
  const lang = inferLanguage(label);
  return {
    name: `PatronFilmMakinesi - ${player} - ${lang}`,
    title: `${player} | ${lang} | ${label}`
  };
}
function searchMovie(query) {
  return __async(this, null, function* () {
    const searchUrl = `${MAIN_URL}/arama/?s=${encodeURIComponent(query)}`;
    const html = yield fetchText(searchUrl);
    const $ = import_cheerio_without_node_native.default.load(html);
    const results = [];
    $("div.item-relative").each((i, el) => {
      const anchor = $(el).find("a").first();
      const href = anchor.attr("href");
      let title = $(el).find("div.title").text().trim();
      if (!title && anchor.attr("title"))
        title = anchor.attr("title").trim();
      if (!title && anchor.attr("data-title"))
        title = anchor.attr("data-title").trim();
      if (title && href) {
        results.push({ title, href: fixUrl(href) });
      }
    });
    if (results.length === 0)
      return null;
    const queryLower = query.toLowerCase();
    let exact = results.find((r) => r.title.toLowerCase() === queryLower) || results.find((r) => r.title.toLowerCase().startsWith(queryLower));
    if (!exact) {
      exact = results.find((r) => r.title.toLowerCase().includes(queryLower));
    }
    return exact ? exact.href : results[0].href;
  });
}
function extractFromMoviePage(movieUrl) {
  return __async(this, null, function* () {
    let html;
    try {
      html = yield fetchText(movieUrl);
    } catch (e) {
      console.error(`[PatronFilmMakinesi] Sayfa alinamadi: ${e.message}`);
      return [];
    }
    const $ = import_cheerio_without_node_native.default.load(html);
    const streams = [];
    const linkUrls = [];
    $("iframe").each((i, el) => {
      const src = $(el).attr("data-src") || $(el).attr("src");
      if (src && src.trim() !== "" && !src.includes("youtube")) {
        linkUrls.push({ url: fixUrl(src.trim()), title: `Sunucu ${i + 1}` });
      }
    });
    $(".video-parts a[data-video_url]").each((i, el) => {
      const vUrl = $(el).attr("data-video_url");
      const title = $(el).text().trim() || `Sunucu ${i + 1}`;
      if (vUrl && vUrl.trim() !== "") {
        linkUrls.push({ url: fixUrl(vUrl.trim()), title });
      }
    });
    $("[data-video_url], [data-video-url]").each((i, el) => {
      const vUrl = $(el).attr("data-video_url") || $(el).attr("data-video-url");
      const title = $(el).text().trim() || $(el).attr("title") || `Sunucu ${i + 1}`;
      if (vUrl && vUrl.trim() !== "" && vUrl.includes("http")) {
        const exists = linkUrls.some((u) => u.url === fixUrl(vUrl.trim()));
        if (!exists)
          linkUrls.push({ url: fixUrl(vUrl.trim()), title });
      }
    });
    if (linkUrls.length === 0) {
      const pageText = html;
      const embedRegex = /(https?:\/\/(?:closeload|rapid|vidmoly|sibnet)[^"'<\s]+)/gi;
      const matches = [...pageText.matchAll(embedRegex)];
      for (let i = 0; i < matches.length; i++) {
        const found = matches[i][1];
        if (!linkUrls.some((u) => u.url === found)) {
          linkUrls.push({ url: found, title: `Sunucu ${i + 1}` });
        }
      }
    }
    console.log(`[PatronFilmMakinesi] Bulunan link sayisi: ${linkUrls.length}`);
    for (const l of linkUrls)
      console.log(`  - ${l.url.substring(0, 80)} (${l.title})`);
    for (let i = 0; i < linkUrls.length; i++) {
      const { url: embedUrl, title: label } = linkUrls[i];
      if (!embedUrl || embedUrl.includes("youtube"))
        continue;
      try {
        if (embedUrl.includes("closeload")) {
          const clRes = yield extractCloseLoad(embedUrl, movieUrl);
          if (clRes) {
            const meta = buildMeta("CloseLoad", label);
            streams.push({
              name: meta.name,
              title: meta.title,
              url: clRes.url,
              quality: clRes.quality || "720p",
              type: "hls",
              headers: clRes.headers || { Referer: MAIN_URL + "/" }
            });
            continue;
          }
        }
        if (embedUrl.includes("rapid")) {
          const rapidRes = yield extractRapid(embedUrl, movieUrl);
          if (rapidRes) {
            const meta = buildMeta("Rapid", label);
            const stream = {
              name: meta.name,
              title: meta.title,
              url: rapidRes.url,
              quality: rapidRes.quality || "Auto",
              headers: rapidRes.headers
            };
            if (rapidRes.url.includes(".m3u8"))
              stream.type = "hls";
            streams.push(stream);
            continue;
          }
        }
        if (embedUrl.includes("vidmoly")) {
          const vidmolyRes = yield extractVidMoly(embedUrl, movieUrl);
          if (vidmolyRes) {
            const meta = buildMeta("VidMoly", label);
            const stream = {
              name: meta.name,
              title: meta.title,
              url: vidmolyRes.url,
              quality: "720p",
              headers: __spreadValues(__spreadValues({}, HEADERS), vidmolyRes.headers)
            };
            if (vidmolyRes.url.includes(".m3u8"))
              stream.type = "hls";
            streams.push(stream);
            continue;
          }
        }
        if (embedUrl.includes("sibnet.ru")) {
          const sibnetRes = yield extractSibnet(embedUrl);
          if (sibnetRes) {
            const meta = buildMeta("Sibnet", label);
            const stream = {
              name: meta.name,
              title: meta.title,
              url: sibnetRes.url,
              quality: "720p",
              headers: __spreadValues(__spreadValues({}, HEADERS), sibnetRes.headers)
            };
            if (sibnetRes.url.includes(".m3u8"))
              stream.type = "hls";
            streams.push(stream);
            continue;
          }
        }
        if (embedUrl.includes(".m3u8") || embedUrl.includes(".mp4")) {
          const meta = buildMeta("Direkt", label);
          const stream = {
            name: meta.name,
            title: meta.title,
            url: embedUrl,
            quality: "720p",
            headers: { Referer: movieUrl }
          };
          if (embedUrl.includes(".m3u8"))
            stream.type = "hls";
          streams.push(stream);
        }
      } catch (err) {
        console.error(`[PatronFilmMakinesi] Cikarma hatasi: ${err.message}`);
      }
    }
    return streams;
  });
}
function extractStreams(tmdbId, mediaType) {
  return __async(this, null, function* () {
    if (mediaType !== "movie")
      return [];
    const { trTitle, origTitle } = yield getTmdbTitle(tmdbId, mediaType);
    console.log(`[PatronFilmMakinesi] TMDB: ${tmdbId} | Baslik: ${trTitle}`);
    if (!trTitle && !origTitle)
      return [];
    let movieUrl = null;
    if (trTitle) {
      movieUrl = yield searchMovie(trTitle);
    }
    if (!movieUrl && origTitle && origTitle !== trTitle) {
      movieUrl = yield searchMovie(origTitle);
    }
    if (!movieUrl) {
      console.warn(`[PatronFilmMakinesi] Site'de icerik bulunamadi: ${trTitle || origTitle}`);
      return [];
    }
    console.log(`[PatronFilmMakinesi] Sayfa bulundu: ${movieUrl}`);
    const streams = yield extractFromMoviePage(movieUrl);
    console.log(`[PatronFilmMakinesi] Toplam stream: ${streams.length}`);
    return streams;
  });
}

// src/patronFilmMakinesi/index.js
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[PatronFilmMakinesi] \u0130stek: ${mediaType} | TMDB: ${tmdbId}`);
      if (mediaType !== "movie") {
        return [];
      }
      const streams = yield extractStreams(tmdbId, mediaType);
      return streams;
    } catch (error) {
      console.error(`[PatronFilmMakinesi] Hata: ${error.message}`);
      return [];
    }
  });
}
