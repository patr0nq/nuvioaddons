/**
 * patronFilmMakinesi - Built from src/patronFilmMakinesi/
 * Generated: 2026-10-09T18:01:37.227Z
 */
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/patronFilmMakinesi/index.js
var patronFilmMakinesi_exports = {};
__export(patronFilmMakinesi_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patronFilmMakinesi_exports);

// src/patronFilmMakinesi/http.js
var PROVIDER_NAME = "PatronFilmMakinesi";
var GITHUB_KEY = "filmmakinesi";
var GITHUB_URL = "https://raw.githubusercontent.com/patr0nq/veriler/refs/heads/main/siteurl.txt";
var KNOWN_DOMAINS = [
  "https://filmmakinesi.to/"
];
var UA_BROWSER = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var UA_OKHTTP = "okhttp/4.9.2";
var BASE_HEADERS = {
  "User-Agent": UA_BROWSER,
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
};
var _resolvedUrl = null;
function fetchWithTimeout(url, options = {}, timeoutMs = 8e3) {
  return new Promise((resolve, reject) => {
    let timer;
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    if (controller)
      options.signal = controller.signal;
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
}
function resolveBaseUrl() {
  return __async(this, null, function* () {
    if (_resolvedUrl)
      return _resolvedUrl;
    try {
      const res = yield fetchWithTimeout(GITHUB_URL, {
        headers: { "User-Agent": UA_BROWSER }
      }, 8e3);
      if (res.ok) {
        const text = yield res.text();
        for (const line of text.split("\n")) {
          const trimmed = line.trim();
          if (trimmed.startsWith(GITHUB_KEY + ":")) {
            let url = trimmed.substring((GITHUB_KEY + ":").length).trim();
            if (url.endsWith("/"))
              url = url.slice(0, -1);
            if (url.startsWith("http")) {
              _resolvedUrl = url;
              console.log(`[${PROVIDER_NAME}] Aktif domain (GitHub): ${url}`);
              return url;
            }
          }
        }
      }
    } catch (e) {
      console.warn(`[${PROVIDER_NAME}] GitHub domain \xE7ekilemedi: ${e.message}`);
    }
    for (const domain of KNOWN_DOMAINS) {
      try {
        const r = yield fetchWithTimeout(`${domain}/`, {
          method: "HEAD",
          headers: BASE_HEADERS
        }, 6e3);
        if (r.status < 500) {
          _resolvedUrl = domain;
          console.log(`[${PROVIDER_NAME}] Aktif domain (Fallback): ${domain}`);
          return domain;
        }
      } catch (_) {
      }
    }
    _resolvedUrl = KNOWN_DOMAINS[0];
    return _resolvedUrl;
  });
}
function fixUrl(url, baseUrl) {
  if (!url)
    return "";
  if (url.startsWith("http://") || url.startsWith("https://"))
    return url;
  if (url.startsWith("//"))
    return `https:${url}`;
  if (url.startsWith("/"))
    return `${baseUrl}${url}`;
  return `${baseUrl}/${url}`;
}

// src/patronFilmMakinesi/tmdb.js
var TMDB_API_KEY = "500330721680edb6d5f7f12ba7cd9023";
function getTmdbInfo(tmdbId, mediaType) {
  return __async(this, null, function* () {
    var _a;
    try {
      const type = mediaType === "movie" ? "movie" : "tv";
      const url = `https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${TMDB_API_KEY}&language=tr-TR&append_to_response=external_ids`;
      const response = yield fetch(url, {
        headers: { "Accept": "application/json" }
      });
      if (!response.ok)
        throw new Error(`TMDB API hatas\u0131: ${response.status}`);
      const data = yield response.json();
      const trTitle = (type === "movie" ? data.title : data.name) || "";
      const origTitle = (type === "movie" ? data.original_title : data.original_name) || "";
      const imdbId = (type === "movie" ? data.imdb_id : (_a = data.external_ids) == null ? void 0 : _a.imdb_id) || "";
      return {
        trTitle: trTitle.trim(),
        origTitle: origTitle.trim(),
        imdbId: imdbId.trim()
      };
    } catch (error) {
      console.error(`[PatronFilmMakinesi] TMDB bilgisi al\u0131namad\u0131: ${error.message}`);
      return { trTitle: "", origTitle: "", imdbId: "" };
    }
  });
}

// src/patronFilmMakinesi/extractor.js
var BLOCKED_STREAM_DOMAINS = ["playmix.uno"];
function matchAll(regex, str) {
  const flags = regex.flags.includes("g") ? regex.flags : regex.flags + "g";
  const re = new RegExp(regex.source, flags);
  const results = [];
  let m;
  while ((m = re.exec(str)) !== null)
    results.push(m);
  return results;
}
function decodeBase64Custom(str) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const clean = String(str || "").replace(/[\r\n\t =]+/g, "").replace(/-/g, "+").replace(/_/g, "/");
  let out = "";
  for (let i = 0; i < clean.length; i += 4) {
    const a = chars.indexOf(clean.charAt(i));
    const b = i + 1 < clean.length ? chars.indexOf(clean.charAt(i + 1)) : -1;
    const c = i + 2 < clean.length ? chars.indexOf(clean.charAt(i + 2)) : -1;
    const d = i + 3 < clean.length ? chars.indexOf(clean.charAt(i + 3)) : -1;
    if (a === -1 || b === -1)
      break;
    out += String.fromCharCode(a << 2 | b >> 4);
    if (c !== -1) {
      out += String.fromCharCode((b & 15) << 4 | c >> 2);
      if (d !== -1)
        out += String.fromCharCode((c & 3) << 6 | d);
    }
  }
  return out;
}
function deobfuscatePacked(html) {
  const m = html.match(/function\(p,a,c,k,e,d\)[\s\S]*?\}\s*\(\s*['"]([\s\S]*?)['"]\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*['"]([\s\S]*?)['"]\.split\(['"]\|['"]\)/);
  if (!m)
    return null;
  let code = m[1];
  const base = parseInt(m[2], 10);
  let count = parseInt(m[3], 10);
  const keys = m[4].split("|");
  code = code.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\r/g, "\r");
  function toBase(n) {
    return (n < base ? "" : toBase(Math.floor(n / base))) + ((n = n % base) > 35 ? String.fromCharCode(n + 29) : n.toString(36));
  }
  while (count--) {
    if (keys[count]) {
      const token = toBase(count);
      code = code.replace(new RegExp("\\b" + token + "\\b", "g"), () => keys[count]);
    }
  }
  return code;
}
function decodeVn(html) {
  const arrMatch = html.match(/var\s+[a-zA-Z0-9_$]+\s*=\s*[a-zA-Z0-9_$]+\s*\(\s*(\[[\s\S]*?\])\s*\);/);
  const keyMatch = html.match(/var\s+[a-zA-Z0-9_$]+\s*=\s*["']([a-zA-Z0-9_-]{10,})["'][\s\S]*?var\s+[a-zA-Z0-9_$]+\s*=\s*["']([a-zA-Z0-9_-]{2,10})["']/);
  if (!arrMatch || !keyMatch)
    return null;
  const key1 = keyMatch[1];
  const ops = keyMatch[2];
  let arr;
  try {
    arr = JSON.parse(arrMatch[1]);
  } catch (e) {
    const raw = arrMatch[1].match(/"([^"]+)"|'([^']+)'/g);
    if (!raw)
      return null;
    arr = raw.map((s2) => s2.slice(1, -1));
  }
  let s = arr.join("");
  let h1 = 0, h2 = 0;
  for (let i = 0; i < key1.length; i++) {
    const c = key1.charCodeAt(i);
    h1 = (h1 * 31 + c) % 251;
    h2 = (h2 ^ c + i) & 255;
  }
  const seed0 = (h1 + h2) % 256;
  const step = h1 % 13 + 3;
  let lcg = (h1 * 256 + h2) % 65521 + 1;
  for (let i = ops.length - 1; i >= 0; i--) {
    const ch = ops.charAt(i);
    if (ch === "b") {
      s = decodeBase64Custom(s);
    } else if (ch === "v") {
      s = s.split("").reverse().join("");
    } else {
      const rot = (26 - (ch.charCodeAt(0) - 64) % 26) % 26;
      s = s.replace(/[a-zA-Z]/g, (c) => {
        const code = c.charCodeAt(0);
        const base = code <= 90 ? 65 : 97;
        return String.fromCharCode((code - base + rot) % 26 + base);
      });
    }
  }
  const len = s.length;
  const idx = [];
  let l = lcg;
  for (let i = len - 1; i >= 1; i--) {
    l = (l * 75 + 74) % 65537;
    idx[i] = l % (i + 1);
  }
  const arr2 = s.split("");
  for (let i = 1; i < len; i++) {
    const j = idx[i];
    [arr2[i], arr2[j]] = [arr2[j], arr2[i]];
  }
  s = arr2.join("");
  let keyByte = seed0;
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    keyByte = (keyByte + step) % 256;
    out += String.fromCharCode(c ^ keyByte);
    keyByte = (keyByte + c) % 256;
  }
  const urlMatch = out.match(/https?:\/\/[^\s"'<>\0\u0080-\uFFFF]+/);
  if (urlMatch) {
    return urlMatch[0].replace(/\/txt\/master\.txt/i, "/master.m3u8").replace(/\/master\.txt/i, "/master.m3u8");
  }
  return null;
}
function decodePn(html) {
  const modMatch = html.match(/charCode\s*-\s*\((\d+)\s*%\s*\(\s*i\s*\+\s*9\s*\)\)/);
  if (!modMatch)
    return null;
  const modVal = parseInt(modMatch[1], 10);
  const arrMatch = html.match(/var\s+\w+\s*=\s*dc_\w+\s*\(\s*(\[[\s\S]*?\])\s*\);/);
  if (!arrMatch)
    return null;
  let arr;
  try {
    arr = JSON.parse(arrMatch[1]);
  } catch (e) {
    const raw = arrMatch[1].match(/"([^"]+)"|'([^']+)'/g);
    if (!raw)
      return null;
    arr = raw.map((s2) => s2.slice(1, -1));
  }
  let s = arr.join("").split("").reverse().join("");
  s = s.replace(/[a-zA-Z]/g, (c) => {
    const code = c.charCodeAt(0);
    const base = code <= 90 ? 65 : 97;
    return String.fromCharCode((code - base + 13) % 26 + base);
  });
  s = decodeBase64Custom(s);
  let out = "";
  for (let i = 0; i < s.length; i++) {
    let byte = s.charCodeAt(i);
    byte = ((byte - modVal % (i + 9)) % 256 + 256) % 256;
    out += String.fromCharCode(byte);
  }
  const urlMatch = out.match(/https?:\/\/[^\s"'<>\0\u0080-\uFFFF]+/);
  if (urlMatch) {
    return urlMatch[0].replace(/\/txt\/master\.txt/i, "/master.m3u8").replace(/\/master\.txt/i, "/master.m3u8");
  }
  return null;
}
function decodeYe(arr) {
  try {
    if (!Array.isArray(arr) || arr.length < 5)
      return null;
    const copy = [...arr];
    const n = copy.length - 2;
    const pos1 = n % 7;
    const pos2 = 8 + n % 5;
    if (pos2 >= copy.length || pos1 >= copy.length)
      return null;
    const opKey = copy.splice(pos2, 1)[0];
    const seedKey = copy.splice(pos1, 1)[0];
    let s = copy.join("");
    if (opKey.length > 2048)
      s = s.split("").reverse().join("");
    let h1 = 0, h2 = 0;
    for (let i = 0; i < seedKey.length; i++) {
      const c = seedKey.charCodeAt(i);
      h1 = (h1 * 37 + c) % 241;
      h2 = h2 + (c << 1 ^ i) & 255;
    }
    const seed0 = (h1 * 3 + h2) % 256;
    const step = h2 % 11 + 5;
    let lcg = (h2 * 251 + h1) % 65519 + 1;
    for (let i = opKey.length - 1; i >= 0; i--) {
      const ch = opKey.charAt(i);
      if (ch === "7") {
        s = decodeBase64Custom(s);
      } else if (ch === "3") {
        s = s.split("").reverse().join("");
      } else {
        const rot = (26 - (ch.charCodeAt(0) - 96) % 26) % 26;
        s = s.replace(/[a-zA-Z]/g, (c) => {
          const code = c.charCodeAt(0);
          const base = code <= 90 ? 65 : 97;
          return String.fromCharCode((code - base + rot) % 26 + base);
        });
      }
    }
    if (seedKey.length > 4096)
      s = decodeBase64Custom(s);
    const len = s.length;
    const idx = [];
    let l = lcg;
    for (let i = len - 1; i >= 1; i--) {
      l = (l * 97 + 41) % 65519;
      idx[i] = l % (i + 1);
    }
    const chars = s.split("");
    for (let i = 1; i < len; i++) {
      const j = idx[i];
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    s = chars.join("");
    let keyByte = seed0;
    let out = "";
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      keyByte = (keyByte * 5 + step) % 256;
      out += String.fromCharCode(c ^ keyByte);
      keyByte = (keyByte + c) % 256;
    }
    const urlMatch = out.match(/https?:\/\/[^\s"'<>\0\u0080-\uFFFF]+/);
    if (urlMatch) {
      return urlMatch[0].replace(/\/txt\/master\.txt/i, "/master.m3u8").replace(/\/master\.txt/i, "/master.m3u8");
    }
  } catch (e) {
  }
  return null;
}
function decodeStreamUrl(html) {
  const srcMatch = html.match(/sources:\s*\[\{\s*file:\s*([a-zA-Z0-9_$]+)/i);
  if (srcMatch) {
    const varName = srcMatch[1];
    const splitRe = new RegExp("var\\s+" + varName + `\\s*=\\s*[a-zA-Z0-9_$]+\\s*\\(\\s*["']([\\s\\S]*?)["']\\s*\\.split\\(\\s*["']([^"']+)["']\\s*\\)\\s*\\);`);
    const splitMatch = html.match(splitRe);
    if (splitMatch) {
      const parts = splitMatch[1].replace(/\\\//g, "/").split(splitMatch[2]);
      const url = decodeYe(parts);
      if (url && !isBlocked(url))
        return url;
    }
    const arrRe = new RegExp("var\\s+" + varName + "\\s*=\\s*[a-zA-Z0-9_$]+\\s*\\(\\s*(\\[[\\s\\S]*?\\])\\s*\\);");
    const arrMatch = html.match(arrRe);
    if (arrMatch) {
      try {
        const parsed = JSON.parse(arrMatch[1]);
        const url = decodeYe(parsed);
        if (url && !isBlocked(url))
          return url;
      } catch (e) {
      }
      const url2 = decodeVn(html);
      if (url2 && !isBlocked(url2))
        return url2;
    }
  }
  const splitRe2 = /var\s+[a-zA-Z0-9_$]+\s*=\s*[a-zA-Z0-9_$]+\s*\(\s*["']([\s\S]*?)["']\.split\(\s*["']([^"']+)["']\s*\)\s*\);/g;
  let m2;
  while ((m2 = splitRe2.exec(html)) !== null) {
    const raw = m2[1].replace(/\\\//g, "/");
    const sep = m2[2];
    if (raw.length > 50 && sep.length <= 3) {
      const url = decodeYe(raw.split(sep));
      if (url && !isBlocked(url))
        return url;
    }
  }
  if (html.includes("function(p,a,c,k,e,d)")) {
    const unpacked = deobfuscatePacked(html);
    if (unpacked) {
      const url1 = decodePn(unpacked);
      if (url1 && !isBlocked(url1))
        return url1;
      const m3u8 = unpacked.match(/https?:\/\/[^\s"'<>\0\u0080-\uFFFF]+\.m3u8[^\s"'<>\0\u0080-\uFFFF]*/i);
      if (m3u8 && !isBlocked(m3u8[0]))
        return m3u8[0];
    }
  }
  const scriptRe = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let sm;
  while ((sm = scriptRe.exec(html)) !== null) {
    const scriptContent = sm[1].replace(/<!--[\s\S]*?-->/g, "").trim();
    if (scriptContent.includes("function(p,a,c,k,e,d)")) {
      const unpacked = deobfuscatePacked(scriptContent);
      if (unpacked) {
        const url1 = decodePn(unpacked);
        if (url1 && !isBlocked(url1))
          return url1;
      }
    }
    const urlVn = decodeVn(scriptContent);
    if (urlVn && !isBlocked(urlVn))
      return urlVn;
  }
  const directM3u8 = html.match(/https?:\/\/[^\s"'<>]+\/master\.m3u8[^\s"'<>]*/i);
  if (directM3u8 && !isBlocked(directM3u8[0]))
    return directM3u8[0];
  return null;
}
function isBlocked(url) {
  return BLOCKED_STREAM_DOMAINS.some((d) => url.includes(d));
}
function extractSubtitles(html, baseUrl) {
  const subs = [];
  const tracksMatch = html.match(/tracks\s*:\s*(\[\s*\{[\s\S]*?\}\s*\])/);
  if (!tracksMatch)
    return subs;
  let tracks = [];
  try {
    tracks = JSON.parse(tracksMatch[1]);
  } catch (e) {
    try {
      const cleaned = tracksMatch[1].replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\\\//g, "/");
      tracks = JSON.parse(cleaned);
    } catch (e2) {
      const re = /"file"\s*:\s*"([^"]+)"[\s\S]*?"label"\s*:\s*"([^"]+)"/gi;
      let tm;
      while ((tm = re.exec(tracksMatch[1])) !== null) {
        tracks.push({ file: tm[1].replace(/\\\//g, "/"), label: tm[2] });
      }
    }
  }
  if (!Array.isArray(tracks))
    return subs;
  for (const t of tracks) {
    if (!t || !t.file || t.file.includes("get_slides") || t.kind === "thumbnails")
      continue;
    const fileUrl = t.file.startsWith("/") ? baseUrl + t.file : t.file;
    const label = t.label || "T\xFCrk\xE7e";
    const isTr = label.toLowerCase().includes("t\xFCrk") || label.toLowerCase().includes("turk");
    const isEn = label.toLowerCase().includes("ing") || label.toLowerCase().includes("eng");
    const origin = fileUrl.startsWith("http") ? (() => {
      try {
        return new URL(fileUrl).origin;
      } catch (e) {
        return baseUrl;
      }
    })() : baseUrl;
    subs.push({
      id: String(subs.length),
      url: fileUrl,
      language: isTr ? "Turkish" : isEn ? "English" : label,
      name: label,
      lang: isTr ? "tr" : isEn ? "en" : "und",
      label,
      headers: {
        Referer: origin + "/",
        "User-Agent": UA_BROWSER,
        "Accept": "*/*"
      }
    });
  }
  return subs.sort((a, b) => {
    const atr = a.lang === "tr" ? 0 : a.lang === "en" ? 1 : 2;
    const btr = b.lang === "tr" ? 0 : b.lang === "en" ? 1 : 2;
    return atr - btr;
  });
}
function extractStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    const streams = [];
    try {
      const startTime = Date.now();
      const isTv = mediaType === "tv" || mediaType === "series";
      const baseUrl = yield resolveBaseUrl();
      if (!baseUrl) {
        console.warn(`[${PROVIDER_NAME}] Sa\u011Flay\u0131c\u0131 adresi al\u0131namad\u0131.`);
        return [];
      }
      console.log(`[${PROVIDER_NAME}] [1/4] IMDb ID \xE7\xF6z\xFCmleniyor (TMDB: ${tmdbId})...`);
      const { imdbId, trTitle } = yield getTmdbInfo(tmdbId, mediaType);
      if (!imdbId) {
        console.warn(`[${PROVIDER_NAME}] IMDb ID bulunamad\u0131: ${tmdbId}`);
        return [];
      }
      const imdbFull = imdbId.startsWith("tt") ? imdbId : "tt" + imdbId;
      console.log(`[${PROVIDER_NAME}] IMDb: ${imdbFull} | Ba\u015Fl\u0131k: ${trTitle || "-"}`);
      console.log(`[${PROVIDER_NAME}] [2/4] HTML aramas\u0131 yap\u0131l\u0131yor (${imdbFull})...`);
      let contentUrl = null;
      try {
        const searchRes = yield fetch(`${baseUrl}/arama/?s=${encodeURIComponent(imdbFull)}`, {
          headers: { "User-Agent": UA_BROWSER, "Referer": baseUrl + "/" },
          signal: typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(5e3) : void 0
        });
        if (searchRes.ok) {
          const searchHtml = yield searchRes.text();
          const links = matchAll(/href=["']((?:https?:\/\/[^"']*)?\/(?:film|dizi)\/[^"']+)["']/gi, searchHtml);
          for (const link of links) {
            const url = link[1];
            if (["/filmler-", "/yabanci-dizi-", "/tur/", "/ulke/"].some((s) => url.includes(s)))
              continue;
            const isDizi = url.includes("/dizi/");
            if (isTv && isDizi) {
              contentUrl = fixUrl(url, baseUrl);
              break;
            }
            if (!isTv && !isDizi) {
              contentUrl = fixUrl(url, baseUrl);
              break;
            }
          }
          if (!contentUrl) {
            for (const link of links) {
              const url = link[1];
              if (!["/filmler-", "/yabanci-dizi-", "/tur/", "/ulke/"].some((s) => url.includes(s))) {
                contentUrl = fixUrl(url, baseUrl);
                break;
              }
            }
          }
        }
      } catch (e) {
        console.warn(`[${PROVIDER_NAME}] Arama hatas\u0131: ${e.message}`);
      }
      if (!contentUrl) {
        console.warn(`[${PROVIDER_NAME}] \u0130\xE7erik bulunamad\u0131.`);
        return [];
      }
      console.log(`[${PROVIDER_NAME}] \u0130\xE7erik bulundu: ${contentUrl}`);
      if (isTv) {
        const s = season != null ? parseInt(String(season), 10) : 1;
        const e = episode != null ? parseInt(String(episode), 10) : 1;
        console.log(`[${PROVIDER_NAME}] [3/4] Dizi b\xF6l\xFCm\xFC aran\u0131yor (S${s}E${e})...`);
        try {
          const diziRes = yield fetch(contentUrl, {
            headers: { "User-Agent": UA_BROWSER, "Referer": baseUrl + "/" },
            signal: typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(4e3) : void 0
          });
          if (diziRes.ok) {
            const diziHtml = yield diziRes.text();
            const epLinks = matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, diziHtml);
            let epUrl = null;
            for (const ep of epLinks) {
              const href = ep[1];
              const m = href.match(/sezon-(\d+)\/bolum-(\d+)/i);
              if (m && parseInt(m[1]) === s && parseInt(m[2]) === e) {
                epUrl = fixUrl(href, baseUrl);
                break;
              }
              const text = ep[2].replace(/<[^>]+>/g, "").toLowerCase().trim();
              const sm = text.match(/(\d+)\.\s*sezon/);
              const em = text.match(/(\d+)\.\s*bölüm/);
              if (sm && em && parseInt(sm[1]) === s && parseInt(em[1]) === e) {
                epUrl = fixUrl(href, baseUrl);
                break;
              }
            }
            contentUrl = epUrl || contentUrl.replace(/\/$/, "") + `/sezon-${s}/bolum-${e}/`;
          }
        } catch (e2) {
        }
        console.log(`[${PROVIDER_NAME}] B\xF6l\xFCm sayfas\u0131: ${contentUrl}`);
      }
      console.log(`[${PROVIDER_NAME}] [3/4] Video oynat\u0131c\u0131lar taran\u0131yor...`);
      const pageRes = yield fetch(contentUrl, {
        headers: { "User-Agent": UA_BROWSER, "Referer": baseUrl + "/" },
        signal: typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(5e3) : void 0
      });
      if (!pageRes.ok) {
        console.warn(`[${PROVIDER_NAME}] \u0130\xE7erik sayfas\u0131 y\xFCklenemedi: HTTP ${pageRes.status}`);
        return [];
      }
      const pageHtml = yield pageRes.text();
      let players = [];
      for (const m of matchAll(/<iframe\b[^>]*?(?:data-src|src)=["']([^"']+)["']/gi, pageHtml)) {
        players.push({ label: "Varsay\u0131lan", url: m[1] });
      }
      for (const m of matchAll(/<a\b[^>]*data-video_url=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, pageHtml)) {
        players.push({ label: m[2].replace(/<[^>]*>/g, "").trim() || "Player", url: m[1] });
      }
      players = players.filter((p) => !p.url.includes("youtube.com") && !p.url.includes("youtu.be"));
      if (players.length === 0) {
        console.warn(`[${PROVIDER_NAME}] Ge\xE7erli oynat\u0131c\u0131 bulunamad\u0131.`);
        return [];
      }
      players.sort((a, b) => {
        const score = (p) => (p.url.includes("closeload") ? 4 : 0) + (p.url.includes("rapid") ? 3 : 0) + (p.label.toLowerCase().includes("altyaz") ? 1 : 0);
        return score(b) - score(a);
      });
      let streamUrl = "";
      let subtitles = [];
      let iframeOrigin = baseUrl;
      for (const player of players) {
        try {
          const pUrl = fixUrl(player.url.trim(), baseUrl);
          const pRes = yield fetch(pUrl, {
            headers: { "User-Agent": UA_BROWSER, "Referer": contentUrl },
            signal: typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(5e3) : void 0
          });
          if (!pRes.ok)
            continue;
          const pHtml = yield pRes.text();
          const decoded = decodeStreamUrl(pHtml);
          if (decoded && (decoded.startsWith("http://") || decoded.startsWith("https://")) && !isBlocked(decoded)) {
            streamUrl = decoded;
            subtitles = extractSubtitles(pHtml, baseUrl);
            try {
              iframeOrigin = new URL(pUrl).origin;
            } catch (e) {
            }
            console.log(`[${PROVIDER_NAME}] Oynat\u0131c\u0131 \xE7\xF6z\xFCld\xFC (${player.label}).`);
            break;
          }
        } catch (e) {
          console.warn(`[${PROVIDER_NAME}] Embed hatas\u0131 (${player.label}): ${e.message}`);
        }
      }
      if (!streamUrl) {
        console.warn(`[${PROVIDER_NAME}] Video ak\u0131\u015F adresi de\u015Fifre edilemedi.`);
        return [];
      }
      const isDub = players.some(
        (p) => p.label.toLowerCase().includes("dublaj") || p.label.toLowerCase().includes("dual")
      ) || streamUrl.toLowerCase().includes("dual") || streamUrl.toLowerCase().includes("trdub");
      const langTitle = isDub ? subtitles.length > 0 ? "Dublaj / Altyaz\u0131l\u0131" : "Dublaj" : subtitles.length > 0 ? "Altyaz\u0131l\u0131" : "Orijinal";
      const elapsed = ((Date.now() - startTime) / 1e3).toFixed(2);
      console.log(`[${PROVIDER_NAME}] [4/4] TAMAMLANDI: ${langTitle} | ${elapsed}s | Altyaz\u0131: ${subtitles.length}`);
      streams.push({
        name: PROVIDER_NAME,
        title: langTitle,
        description: `${langTitle}
1080p \u2022 HLS`,
        url: streamUrl,
        quality: `1080p \u2022 ${langTitle}`,
        format: "m3u8",
        subtitles,
        headers: {
          "Referer": iframeOrigin + "/",
          "User-Agent": UA_OKHTTP,
          "Origin": iframeOrigin
        }
      });
    } catch (err) {
      console.error(`[${PROVIDER_NAME}] Kritik hata: ${err.message}`);
    }
    return streams;
  });
}

// src/patronFilmMakinesi/index.js
var PROVIDER_NAME2 = "PatronFilmMakinesi";
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[${PROVIDER_NAME2}] \u0130stek: ${mediaType} | TMDB: ${tmdbId} | S:${season != null ? season : "-"} E:${episode != null ? episode : "-"}`);
      return yield extractStreams(tmdbId, mediaType, season, episode);
    } catch (error) {
      console.error(`[${PROVIDER_NAME2}] Hata: ${error.message}`);
      return [];
    }
  });
}
