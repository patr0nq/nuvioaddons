/**
 * patronhdfcehennemi - Built from src/patronhdfcehennemi/
 * Generated: 2026-10-09T18:01:37.245Z
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

// src/patronhdfcehennemi/index.js
var patronhdfcehennemi_exports = {};
__export(patronhdfcehennemi_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patronhdfcehennemi_exports);

// src/patronhdfcehennemi/http.js
var KNOWN_DOMAINS = [
  "https://www.hdfilmcehennemi.nl",
  "https://hdfilmcehennemi.com",
  "https://www.hdfilmcehennemi.pw"
];
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
  "Cache-Control": "no-cache",
  "Pragma": "no-cache"
};
var _resolvedUrl = null;
function fetchWithTimeout(_0) {
  return __async(this, arguments, function* (url, options = {}, timeoutMs = 8e3) {
    return new Promise((resolve, reject) => {
      let timer;
      const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      if (controller) {
        options.signal = controller.signal;
      }
      timer = setTimeout(() => {
        if (controller)
          controller.abort();
        reject(new Error(`Timeout: ${url}`));
      }, timeoutMs);
      fetch(url, options).then((res) => {
        clearTimeout(timer);
        resolve(res);
      }).catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
    });
  });
}
function resolveMainUrl() {
  return __async(this, null, function* () {
    if (_resolvedUrl)
      return _resolvedUrl;
    try {
      const githubUrl = "https://raw.githubusercontent.com/patr0nq/veriler/refs/heads/main/siteurl.txt";
      const res = yield fetchWithTimeout(githubUrl, {}, 8e3);
      if (res.ok) {
        const text = yield res.text();
        for (const line of text.split("\n")) {
          if (line.trim().startsWith("hdfilmcehennemi:")) {
            let url = line.substring("hdfilmcehennemi:".length).trim();
            if (url.endsWith("/"))
              url = url.slice(0, -1);
            if (url.startsWith("http")) {
              _resolvedUrl = url;
              console.log(`[PatronHDFCehennemi] Aktif domain (Github): ${url}`);
              return url;
            }
          }
        }
      }
    } catch (e) {
      console.warn(`[PatronHDFCehennemi] Github domain \xE7ekilemedi: ${e.message}`);
    }
    for (const domain of KNOWN_DOMAINS) {
      try {
        const r = yield fetchWithTimeout(`${domain}/`, { method: "HEAD", headers: HEADERS }, 6e3);
        if (r.status < 500) {
          _resolvedUrl = domain;
          console.log(`[PatronHDFCehennemi] Aktif domain (Fallback): ${domain}`);
          return domain;
        }
      } catch (_) {
      }
    }
    _resolvedUrl = KNOWN_DOMAINS[0];
    return _resolvedUrl;
  });
}
function fetchText(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const response = yield fetch(url, __spreadProps(__spreadValues({
      redirect: "follow"
    }, options), {
      headers: __spreadValues(__spreadValues({}, HEADERS), options.headers || {})
    }));
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} -> ${url}`);
    }
    return yield response.text();
  });
}

// src/patronhdfcehennemi/tmdb.js
var TMDB_API_KEY = "500330721680edb6d5f7f12ba7cd9023";
function getTmdbInfo(tmdbId, mediaType) {
  return __async(this, null, function* () {
    var _a;
    try {
      const type = mediaType === "movie" ? "movie" : "tv";
      const url = `https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${TMDB_API_KEY}&language=tr-TR&append_to_response=external_ids`;
      const response = yield fetch(url, {
        headers: {
          "Accept": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`TMDB API hatasi: ${response.status}`);
      }
      const data = yield response.json();
      let trTitle = type === "movie" ? data.title : data.name;
      let origTitle = type === "movie" ? data.original_title : data.original_name;
      if (!trTitle) {
        trTitle = origTitle;
      }
      let imdbId = type === "movie" ? data.imdb_id : (_a = data.external_ids) == null ? void 0 : _a.imdb_id;
      return {
        trTitle: (trTitle == null ? void 0 : trTitle.trim()) || "",
        origTitle: (origTitle == null ? void 0 : origTitle.trim()) || "",
        imdbId: (imdbId == null ? void 0 : imdbId.trim()) || ""
      };
    } catch (error) {
      console.error(`[PatronHDFCehennemi] TMDB bilgisi alinamadi: ${error.message}`);
      return { trTitle: "", origTitle: "", imdbId: "" };
    }
  });
}

// src/patronhdfcehennemi/extractor.js
var PROVIDER_NAME = "PatronHDFCehennemi";
var USER_AGENT = "okhttp/4.9.2";
function C0(text) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let cleanText = String(text || "").replace(/[\r\n\t =]+/g, "").replace(/-/g, "+").replace(/_/g, "/");
  let result = "";
  for (let i = 0; i < cleanText.length; i += 4) {
    let c1 = chars.indexOf(cleanText.charAt(i));
    let c2 = i + 1 < cleanText.length ? chars.indexOf(cleanText.charAt(i + 1)) : -1;
    let c3 = i + 2 < cleanText.length ? chars.indexOf(cleanText.charAt(i + 2)) : -1;
    let c4 = i + 3 < cleanText.length ? chars.indexOf(cleanText.charAt(i + 3)) : -1;
    if (c1 === -1 || c2 === -1)
      break;
    result += String.fromCharCode(c1 << 2 | c2 >> 4);
    if (c3 !== -1) {
      result += String.fromCharCode((c2 & 15) << 4 | c3 >> 2);
      if (c4 !== -1) {
        result += String.fromCharCode((c3 & 3) << 6 | c4);
      }
    }
  }
  return result;
}
function fn(script) {
  let match = script.match(/function\(p,a,c,k,e,d\)[\s\S]*?\}\s*\(\s*['"]([\s\S]*?)['"]\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*['"]([\s\S]*?)['"]\.split\(['"]\|['"]\)/);
  if (!match)
    return null;
  let p = match[1];
  let a = parseInt(match[2], 10);
  let c = parseInt(match[3], 10);
  let k = match[4].split("|");
  p = p.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\r/g, "\r");
  function e(c2) {
    return (c2 < a ? "" : e(Math.floor(c2 / a))) + ((c2 = c2 % a) > 35 ? String.fromCharCode(c2 + 29) : c2.toString(36));
  }
  while (c--) {
    if (k[c]) {
      let val = e(c);
      p = p.replace(new RegExp("\\b" + val + "\\b", "g"), () => k[c]);
    }
  }
  return p;
}
function dn(script) {
  let match1 = script.match(/var\s+[a-zA-Z0-9_$]+\s*=\s*[a-zA-Z0-9_$]+\s*\(\s*(\[[\s\S]*?\])\s*\);/);
  let match2 = script.match(/var\s+[a-zA-Z0-9_$]+\s*=\s*["']([a-zA-Z0-9_-]{10,})["'][\s\S]*?var\s+[a-zA-Z0-9_$]+\s*=\s*["']([a-zA-Z0-9_-]{2,10})["']/);
  if (!match1 || !match2)
    return null;
  let keyStr = match2[1];
  let ops = match2[2];
  let arr;
  try {
    arr = JSON.parse(match1[1]);
  } catch (e) {
    let strMatch = match1[1].match(/"([^"]+)"|'([^']+)'/g);
    if (!strMatch)
      return null;
    arr = strMatch.map((s) => s.slice(1, -1));
  }
  let encrypted = arr.join("");
  let v1 = 0, v2 = 0;
  for (let i = 0; i < keyStr.length; i++) {
    let cCode = keyStr.charCodeAt(i);
    v1 = (v1 * 31 + cCode) % 251;
    v2 = (v2 ^ cCode + i) & 255;
  }
  let v3 = (v1 + v2) % 256;
  let v4 = v1 % 13 + 3;
  let v5 = (v1 * 256 + v2) % 65521 + 1;
  for (let i = ops.length - 1; i >= 0; i--) {
    let op = ops.charAt(i);
    if (op === "b") {
      encrypted = C0(encrypted);
    } else if (op === "v") {
      encrypted = encrypted.split("").reverse().join("");
    } else {
      let shift = (26 - (op.charCodeAt(0) - 64) % 26) % 26;
      encrypted = encrypted.replace(/[a-zA-Z]/g, (c) => {
        let code = c.charCodeAt(0);
        let base = code <= 90 ? 65 : 97;
        return String.fromCharCode((code - base + shift) % 26 + base);
      });
    }
  }
  let len = encrypted.length;
  let arrMap = [];
  for (let i = len - 1; i >= 1; i--) {
    v5 = (v5 * 75 + 74) % 65537;
    arrMap[i] = v5 % (i + 1);
  }
  let chars = encrypted.split("");
  for (let i = 1; i < len; i++) {
    let swapIdx = arrMap[i];
    let temp = chars[i];
    chars[i] = chars[swapIdx];
    chars[swapIdx] = temp;
  }
  encrypted = chars.join("");
  let curr = v3;
  let decrypted = "";
  for (let i = 0; i < encrypted.length; i++) {
    let charCode = encrypted.charCodeAt(i);
    curr = (curr + v4) % 256;
    decrypted += String.fromCharCode(charCode ^ curr);
    curr = (curr + charCode) % 256;
  }
  let urlMatch = decrypted.match(/https?:\/\/[^\s"'<>\0\u0080-\uFFFF]+/);
  if (urlMatch) {
    return urlMatch[0].replace(/\/txt\/master\.txt/i, "/master.m3u8").replace(/\/master\.txt/i, "/master.m3u8");
  }
  return null;
}
function gn(script) {
  let modMatch = script.match(/charCode\s*-\s*\((\d+)\s*%\s*\(\s*i\s*\+\s*9\s*\)\)/);
  if (!modMatch)
    return null;
  let modVal = parseInt(modMatch[1], 10);
  let arrMatch = script.match(/var\s+\w+\s*=\s*dc_\w+\s*\(\s*(\[[\s\S]*?\])\s*\);/);
  if (!arrMatch)
    return null;
  let arr;
  try {
    arr = JSON.parse(arrMatch[1]);
  } catch (e) {
    let strMatch = arrMatch[1].match(/"([^"]+)"|'([^']+)'/g);
    if (!strMatch)
      return null;
    arr = strMatch.map((s) => s.slice(1, -1));
  }
  let reversed = arr.join("").split("").reverse().join("");
  reversed = reversed.replace(/[a-zA-Z]/g, (c) => {
    let code = c.charCodeAt(0);
    let base = code <= 90 ? 65 : 97;
    return String.fromCharCode((code - base + 13) % 26 + base);
  });
  reversed = C0(reversed);
  let decrypted = "";
  for (let i = 0; i < reversed.length; i++) {
    let charCode = reversed.charCodeAt(i);
    charCode = ((charCode - modVal % (i + 9)) % 256 + 256) % 256;
    decrypted += String.fromCharCode(charCode);
  }
  let urlMatch = decrypted.match(/https?:\/\/[^\s"'<>\0\u0080-\uFFFF]+/);
  if (urlMatch) {
    return urlMatch[0].replace(/\/txt\/master\.txt/i, "/master.m3u8").replace(/\/master\.txt/i, "/master.m3u8");
  }
  return null;
}
function Be(arr) {
  try {
    if (!Array.isArray(arr) || arr.length < 5)
      return null;
    let items = [...arr];
    let rem2 = items.length - 2;
    let idx1 = rem2 % 7;
    let idx2 = 8 + rem2 % 5;
    if (idx2 >= items.length || idx1 >= items.length)
      return null;
    let item1 = items.splice(idx2, 1)[0];
    let item2 = items.splice(idx1, 1)[0];
    let text = items.join("");
    if (item1.length > 2048) {
      text = text.split("").reverse().join("");
    }
    let v1 = 0, v2 = 0;
    for (let i = 0; i < item2.length; i++) {
      let code = item2.charCodeAt(i);
      v1 = (v1 * 37 + code) % 241;
      v2 = v2 + (code << 1 ^ i) & 255;
    }
    let v3 = (v1 * 3 + v2) % 256;
    let v4 = v2 % 11 + 5;
    let v5 = (v2 * 251 + v1) % 65519 + 1;
    for (let i = item1.length - 1; i >= 0; i--) {
      let char = item1.charAt(i);
      if (char === "7") {
        text = C0(text);
      } else if (char === "3") {
        text = text.split("").reverse().join("");
      } else {
        let shift = (26 - (char.charCodeAt(0) - 96) % 26) % 26;
        text = text.replace(/[a-zA-Z]/g, (c) => {
          let code = c.charCodeAt(0);
          let base = code <= 90 ? 65 : 97;
          return String.fromCharCode((code - base + shift) % 26 + base);
        });
      }
    }
    if (item2.length > 4096) {
      text = C0(text);
    }
    let len = text.length;
    let arrMap = [];
    for (let i = len - 1; i >= 1; i--) {
      v5 = (v5 * 97 + 41) % 65519;
      arrMap[i] = v5 % (i + 1);
    }
    let chars = text.split("");
    for (let i = 1; i < len; i++) {
      let swapIdx = arrMap[i];
      let temp = chars[i];
      chars[i] = chars[swapIdx];
      chars[swapIdx] = temp;
    }
    text = chars.join("");
    let curr = v3;
    let decrypted = "";
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      curr = (curr * 5 + v4) % 256;
      decrypted += String.fromCharCode(charCode ^ curr);
      curr = (curr + charCode) % 256;
    }
    let urlMatch = decrypted.match(/https?:\/\/[^\s"'<>\0\u0080-\uFFFF]+/);
    if (urlMatch) {
      return urlMatch[0].replace(/\/txt\/master\.txt/i, "/master.m3u8").replace(/\/master\.txt/i, "/master.m3u8");
    }
  } catch (e) {
  }
  return null;
}
function be(script) {
  let sourceMatch = script.match(/sources:\s*\[\{\s*file:\s*([a-zA-Z0-9_$]+)/i);
  if (sourceMatch) {
    let varName = sourceMatch[1];
    let splitMatch = script.match(new RegExp("var\\s+" + varName + `\\s*=\\s*[a-zA-Z0-9_$]+\\s*\\(\\s*["']([\\s\\S]*?)["']\\.split\\(\\s*["']([^"']+)["']\\s*\\)\\s*\\);`));
    if (splitMatch) {
      let arr = splitMatch[1].replace(/\\\//g, "/").split(splitMatch[2]);
      let res = Be(arr);
      if (res && !res.includes("playmix.uno"))
        return res;
    }
    let arrMatch = script.match(new RegExp("var\\s+" + varName + "\\s*=\\s*[a-zA-Z0-9_$]+\\s*\\(\\s*(\\[[\\s\\S]*?\\])\\s*\\);"));
    if (arrMatch) {
      try {
        let arr = JSON.parse(arrMatch[1]);
        let res = Be(arr);
        if (res && !res.includes("playmix.uno"))
          return res;
        let dnRes = dn(script);
        if (dnRes && !dnRes.includes("playmix.uno"))
          return dnRes;
      } catch (e) {
      }
    }
  }
  let splitRegex = /var\s+[a-zA-Z0-9_$]+\s*=\s*[a-zA-Z0-9_$]+\s*\(\s*["']([\s\S]*?)["']\.split\(\s*["']([^"']+)["']\s*\)\s*\);/g;
  let splitResult;
  while ((splitResult = splitRegex.exec(script)) !== null) {
    let p1 = splitResult[1].replace(/\\\//g, "/");
    let p2 = splitResult[2];
    if (p1.length > 50 && p2.length <= 3) {
      let arr = p1.split(p2);
      let res = Be(arr);
      if (res && !res.includes("playmix.uno"))
        return res;
    }
  }
  if (script.includes("function(p,a,c,k,e,d)")) {
    let fnRes = fn(script);
    if (fnRes) {
      let gnRes = gn(fnRes);
      if (gnRes && !gnRes.includes("playmix.uno"))
        return gnRes;
      let urlMatch = fnRes.match(/https?:\/\/[^\s"'<>\0\u0080-\uFFFF]+\.m3u8[^\s"'<>\0\u0080-\uFFFF]*/i);
      if (urlMatch && !urlMatch[0].includes("playmix.uno"))
        return urlMatch[0];
    }
  }
  let scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch;
  while ((scriptMatch = scriptRegex.exec(script)) !== null) {
    let content = scriptMatch[1].replace(/<!--[\s\S]*?-->/g, "").trim();
    if (content.includes("function(p,a,c,k,e,d)")) {
      let fnRes = fn(content);
      if (fnRes) {
        let gnRes = gn(fnRes);
        if (gnRes && !gnRes.includes("playmix.uno"))
          return gnRes;
      }
    }
    let dnRes = dn(content);
    if (dnRes && !dnRes.includes("playmix.uno"))
      return dnRes;
  }
  let directMatch = script.match(/https?:\/\/[^\s"'<>]+\/master\.m3u8[^\s"'<>]*/i);
  if (directMatch && !directMatch[0].includes("playmix.uno")) {
    return directMatch[0];
  }
  return null;
}
function hn(script, baseUrl) {
  let tracks = [];
  let trackMatch = script.match(/tracks\s*:\s*(\[\s*\{[\s\S]*?\}\s*\])/);
  if (!trackMatch)
    return tracks;
  let parsed = [];
  try {
    parsed = JSON.parse(trackMatch[1]);
  } catch (e) {
    try {
      let unescaped = trackMatch[1].replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16))).replace(/\\\//g, "/");
      parsed = JSON.parse(unescaped);
    } catch (e2) {
      let regex = /"file"\s*:\s*"([^"]+)"[\s\S]*?"label"\s*:\s*"([^"]+)"/gi;
      let match;
      while ((match = regex.exec(trackMatch[1])) !== null) {
        parsed.push({ file: match[1].replace(/\\\//g, "/"), label: match[2] });
      }
    }
  }
  if (Array.isArray(parsed)) {
    for (let item of parsed) {
      if (item && item.file && !item.file.includes("get_slides") && item.kind !== "thumbnails") {
        let fileUrl = item.file.startsWith("/") ? baseUrl + item.file : item.file;
        let label = item.label || "T\xFCrk\xE7e";
        let isTr = label.toLowerCase().includes("t\xFCrk") || label.toLowerCase().includes("turk");
        let isEn = label.toLowerCase().includes("ing") || label.toLowerCase().includes("eng");
        let origin = fileUrl.startsWith("http") ? new URL(fileUrl).origin : baseUrl;
        tracks.push({
          url: fileUrl,
          language: isTr ? "Turkish" : isEn ? "English" : label,
          label,
          headers: {
            Referer: origin + "/",
            "User-Agent": USER_AGENT,
            Accept: "*/*"
          }
        });
      }
    }
  }
  return tracks;
}
function extractStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    var _a, _b, _c, _d, _e;
    const baseUrl = yield resolveMainUrl();
    const { trTitle, origTitle, imdbId } = yield getTmdbInfo(tmdbId, mediaType);
    console.log(`[${PROVIDER_NAME}] TMDB: ${tmdbId} | TR: ${trTitle} | IMDB: ${imdbId} | Domain: ${baseUrl}`);
    const isTv = mediaType === "tv" || mediaType === "series";
    let contentUrl = null;
    let searchResults = [];
    const searchQueries = [imdbId, (imdbId == null ? void 0 : imdbId.startsWith("tt")) ? imdbId.replace(/^tt/, "") : ""].filter(Boolean);
    for (let q of searchQueries) {
      try {
        const res = yield fetchText(`${baseUrl}/search?q=${encodeURIComponent(q)}`, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "X-Requested-With": "fetch",
            "Referer": `${baseUrl}/`
          }
        });
        if (res) {
          const data = JSON.parse(res);
          if (data.results && data.results.length > 0) {
            searchResults = data.results;
            break;
          }
        }
      } catch (e) {
        console.error(`[${PROVIDER_NAME}] IMDB arama hatasi: ${e.message}`);
      }
    }
    if (searchResults.length === 0 && (trTitle || origTitle)) {
      try {
        const query = trTitle || origTitle;
        const res = yield fetchText(`${baseUrl}/search?q=${encodeURIComponent(query)}`, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "X-Requested-With": "fetch",
            "Referer": `${baseUrl}/`
          }
        });
        if (res) {
          const data = JSON.parse(res);
          if (data.results && data.results.length > 0) {
            searchResults = data.results;
          }
        }
      } catch (e) {
        console.error(`[${PROVIDER_NAME}] Baslik arama hatasi: ${e.message}`);
      }
    }
    if (searchResults.length === 0) {
      console.warn(`[${PROVIDER_NAME}] Icerik bulunamadi`);
      return [];
    }
    for (let html of searchResults) {
      const match = html.match(/href="([^"]+)"/);
      if (!match)
        continue;
      const url = match[1];
      const isSeries = url.includes("/dizi/");
      if (isTv && isSeries) {
        contentUrl = url;
        break;
      } else if (!isTv && !isSeries) {
        contentUrl = url;
        break;
      }
    }
    if (!contentUrl) {
      const match = searchResults[0].match(/href="([^"]+)"/);
      if (match)
        contentUrl = match[1];
    }
    if (!contentUrl) {
      console.warn(`[${PROVIDER_NAME}] Baglanti cozulemedi.`);
      return [];
    }
    if (isTv) {
      try {
        const showHtml = yield fetchText(contentUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Referer": `${baseUrl}/`
          }
        });
        const regex = /<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
        let epMatch;
        let epUrl = null;
        while ((epMatch = regex.exec(showHtml)) !== null) {
          let href = epMatch[1];
          let text = epMatch[2].replace(/<[^>]+>/g, "").toLowerCase().trim();
          let directMatch = href.match(/sezon-(\d+)\/bolum-(\d+)/i);
          if (directMatch && parseInt(directMatch[1], 10) === Number(season) && parseInt(directMatch[2], 10) === Number(episode)) {
            epUrl = href;
            break;
          }
          let textSezMatch = text.match(/(\d+)\.\s*sezon/);
          let textEpMatch = text.match(/(\d+)\.\s*bölüm/);
          if (textSezMatch && textEpMatch && parseInt(textSezMatch[1], 10) === Number(season) && parseInt(textEpMatch[1], 10) === Number(episode)) {
            epUrl = href;
            break;
          }
        }
        if (!epUrl) {
          console.warn(`[${PROVIDER_NAME}] Sezon ${season} Bolum ${episode} bulunamadi.`);
          return [];
        }
        contentUrl = epUrl;
      } catch (e) {
        console.error(`[${PROVIDER_NAME}] Dizi sayfasi hatasi: ${e.message}`);
        return [];
      }
    }
    let streams = [];
    try {
      const playerHtml = yield fetchText(contentUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Referer": `${baseUrl}/`
        }
      });
      let iframeUrl = ((_a = playerHtml.match(/<iframe\b[^>]*?(?:data-src|src)="([^"]+embed[^"]+)"/i)) == null ? void 0 : _a[1]) || ((_b = playerHtml.match(/<iframe\b[^>]*?(?:data-src|src)="([^"]+)"/i)) == null ? void 0 : _b[1]);
      if (!iframeUrl) {
        const altRegex = /<button[^>]*class="alternative-link"[^>]*data-video="([^"]+)"[^>]*>([\s\S]*?)<\/button>/gi;
        let altMatches = [];
        let alt;
        while ((alt = altRegex.exec(playerHtml)) !== null)
          altMatches.push(alt);
        if (altMatches.length > 0) {
          let videoId = altMatches[0][1];
          for (let m of altMatches) {
            if (m[2].toLowerCase().includes("rapid")) {
              videoId = m[1];
              break;
            }
          }
          try {
            const res = yield fetch(`${baseUrl}/video/${videoId}/`, {
              headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "X-Requested-With": "fetch",
                "Referer": contentUrl
              }
            });
            if (res.ok) {
              const json = yield res.json();
              iframeUrl = (_e = (_d = (_c = json == null ? void 0 : json.data) == null ? void 0 : _c.html) == null ? void 0 : _d.match(/<iframe[^>]*?(?:data-src|src)="([^"]+)"/i)) == null ? void 0 : _e[1];
            }
          } catch (e) {
            console.warn(`[${PROVIDER_NAME}] /video/ API hatasi: ${e.message}`);
          }
        }
      }
      if (!iframeUrl) {
        console.warn(`[${PROVIDER_NAME}] Oynatici iframe bulunamadi.`);
        return [];
      }
      const iframeHtml = yield fetchText(iframeUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Referer": contentUrl
        }
      });
      let m3u8Url = be(iframeHtml);
      let finalHtml = iframeHtml;
      const rapidIdMatch = iframeUrl.match(/rapidrame_id=([a-zA-Z0-9]+)/) || iframeUrl.match(/\/rplayer\/([a-zA-Z0-9]+)/);
      if (rapidIdMatch && (!m3u8Url || !finalHtml.includes("tracks:"))) {
        try {
          const rplayerHtml = yield fetchText(`${baseUrl}/rplayer/${rapidIdMatch[1]}/`, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              "Referer": `${baseUrl}/`
            }
          });
          finalHtml = rplayerHtml;
          if (!m3u8Url)
            m3u8Url = be(rplayerHtml);
        } catch (e) {
          console.warn(`[${PROVIDER_NAME}] Rplayer fetch hatasi: ${e.message}`);
        }
      }
      if (!m3u8Url || m3u8Url.includes("playmix.uno")) {
        console.warn(`[${PROVIDER_NAME}] Akis adresi desifre edilemedi.`);
        return [];
      }
      const iframeOriginMatch = iframeUrl.match(/^(https?:\/\/[^\/]+)/i);
      const iframeOrigin = iframeOriginMatch ? iframeOriginMatch[1] : baseUrl;
      let m3u8Text;
      try {
        const m3u8Res = yield fetch(m3u8Url, {
          headers: {
            "Referer": `${iframeOrigin}/`,
            "User-Agent": USER_AGENT
            // okhttp/4.9.2
          }
        });
        if (m3u8Res.ok)
          m3u8Text = yield m3u8Res.text();
      } catch (e) {
        console.warn(`[${PROVIDER_NAME}] m3u8 pre-fetch hatasi: ${e.message}`);
      }
      const subtitles = hn(finalHtml, baseUrl);
      const isDub = m3u8Url.toLowerCase().includes("dual") || m3u8Url.toLowerCase().includes("trdual") || m3u8Url.toLowerCase().includes("trdub") || m3u8Url.toLowerCase().includes("dublaj");
      const hasTrSub = subtitles.some((s) => s.lang === "tr" || s.language === "Turkish");
      let streamTitle;
      if (isDub && hasTrSub)
        streamTitle = "Dublaj / Altyaz\u0131l\u0131";
      else if (isDub)
        streamTitle = "Dublaj";
      else if (hasTrSub)
        streamTitle = "Altyaz\u0131l\u0131";
      else
        streamTitle = "Orijinal";
      let quality = "1080p";
      if (m3u8Text) {
        if (m3u8Text.includes("1080"))
          quality = "1080p";
        else if (m3u8Text.includes("720"))
          quality = "720p";
        else if (m3u8Text.includes("480"))
          quality = "480p";
      }
      streams.push({
        name: PROVIDER_NAME,
        title: streamTitle,
        description: `${quality} \u2022 HLS`,
        url: m3u8Url,
        quality: `${quality} \u2022 ${streamTitle}`,
        format: "m3u8",
        // Referer = iframe origin (not baseUrl!) - this is the critical fix
        headers: {
          "Referer": `${iframeOrigin}/`,
          "User-Agent": USER_AGENT
          // okhttp/4.9.2
        },
        subtitles
      });
    } catch (e) {
      console.error(`[${PROVIDER_NAME}] Oynatici hatasi: ${e.message}`);
    }
    return streams;
  });
}

// src/patronhdfcehennemi/index.js
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[PatronHDFCehennemi] Istek: ${mediaType} | TMDB: ${tmdbId} | S:${season} E:${episode}`);
      return yield extractStreams(tmdbId, mediaType, season, episode);
    } catch (error) {
      console.error(`[PatronHDFCehennemi] Hata: ${error.message}`);
      return [];
    }
  });
}
