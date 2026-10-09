/**
 * patronSelcukFlix - Built from src/patronSelcukFlix/
 * Generated: 2026-10-09T18:38:01.546Z
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

// src/patronSelcukFlix/index.js
var patronSelcukFlix_exports = {};
__export(patronSelcukFlix_exports, {
  config: () => config,
  default: () => patronSelcukFlix_default,
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patronSelcukFlix_exports);

// src/patronSelcukFlix/extractor.js
var import_crypto_js = __toESM(require("crypto-js"));

// src/patronSelcukFlix/http.js
var PROVIDER_NAME = "PatronSelcukFlix";
var UA_BROWSER = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var UA_OKHTTP = "okhttp/4.9.2";
var REMOTE_CONFIG_URL = "https://cdn.ezgegan.com/domains.json";
var FALLBACK_CONFIG_URL = "https://domains.ezgegan.com/domains";
var GITHUB_URL = "https://raw.githubusercontent.com/patr0nq/veriler/refs/heads/main/siteurl.txt";
var GITHUB_KEY = "selcukflix";
var KNOWN_DOMAINS = [
  "https://selcukflix.app"
];
var _cachedDomain = null;
var _cachedTmdbKeys = [];
var _lastFetchTime = 0;
var CACHE_TTL = 3e5;
function fetchWithTimeout(url, options = {}, timeoutMs = 8e3) {
  return new Promise((resolve, reject) => {
    let timer;
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    if (controller) {
      options = __spreadProps(__spreadValues({}, options), { signal: controller.signal });
    }
    timer = setTimeout(() => {
      if (controller) {
        try {
          controller.abort();
        } catch (e) {
        }
      }
      reject(new Error(`Timeout (${timeoutMs}ms): ${url}`));
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
function racePromises(promises) {
  if (!promises || promises.length === 0)
    return Promise.resolve(null);
  return new Promise((resolve) => {
    let count = 0;
    let finished = false;
    for (const p of promises) {
      Promise.resolve(p).then((val) => {
        if (!finished && val) {
          finished = true;
          resolve(val);
        }
      }).catch(() => {
      }).finally(() => {
        count++;
        if (count === promises.length && !finished) {
          finished = true;
          resolve(null);
        }
      });
    }
  });
}
function getDynamicTmdbKeys() {
  return _cachedTmdbKeys || [];
}
function resolveBaseUrl() {
  return __async(this, null, function* () {
    var _a;
    const now = Date.now();
    if (_cachedDomain && now - _lastFetchTime < CACHE_TTL) {
      return _cachedDomain;
    }
    const configUrls = [REMOTE_CONFIG_URL, FALLBACK_CONFIG_URL];
    for (const confUrl of configUrls) {
      try {
        const res = yield fetchWithTimeout(confUrl, {
          headers: { "User-Agent": UA_BROWSER }
        }, 4e3);
        if (res.ok) {
          const json = yield res.json();
          const data = (_a = json == null ? void 0 : json.data) != null ? _a : json;
          const domains = (data == null ? void 0 : data.domains) || data;
          if (domains && typeof domains === "object") {
            const resolved = domains.enel || domains.selcukflix || domains["patron-selcukflix"];
            if (resolved && typeof resolved === "string" && resolved.startsWith("http")) {
              let clean = resolved.trim();
              if (clean.endsWith("/"))
                clean = clean.slice(0, -1);
              _cachedDomain = clean;
              _lastFetchTime = now;
              if (Array.isArray(data.tmdb_keys || data.tmdbKeys)) {
                _cachedTmdbKeys = data.tmdb_keys || data.tmdbKeys;
              }
              console.log(`[${PROVIDER_NAME}] Aktif domain (CDN): ${_cachedDomain}`);
              return _cachedDomain;
            }
          }
        }
      } catch (_) {
      }
    }
    try {
      const res = yield fetchWithTimeout(GITHUB_URL, {
        headers: { "User-Agent": UA_BROWSER }
      }, 5e3);
      if (res.ok) {
        const text = yield res.text();
        for (const line of text.split("\n")) {
          const trimmed = line.trim();
          if (trimmed.startsWith(GITHUB_KEY + ":")) {
            let url = trimmed.substring((GITHUB_KEY + ":").length).trim();
            if (url.endsWith("/"))
              url = url.slice(0, -1);
            if (url.startsWith("http")) {
              _cachedDomain = url;
              _lastFetchTime = now;
              console.log(`[${PROVIDER_NAME}] Aktif domain (GitHub): ${_cachedDomain}`);
              return _cachedDomain;
            }
          }
        }
      }
    } catch (_) {
    }
    _cachedDomain = KNOWN_DOMAINS[0];
    _lastFetchTime = now;
    console.log(`[${PROVIDER_NAME}] Aktif domain (Varsayilan): ${_cachedDomain}`);
    return _cachedDomain;
  });
}
function fixUrl(url, baseUrl) {
  if (!url)
    return "";
  let clean = String(url).trim();
  if (clean.startsWith("http://") || clean.startsWith("https://"))
    return clean;
  if (clean.startsWith("//"))
    return `https:${clean}`;
  if (!baseUrl)
    return clean;
  let base = baseUrl.replace(/\/+$/, "");
  if (clean.startsWith("/"))
    return `${base}${clean}`;
  return `${base}/${clean}`;
}

// src/patronSelcukFlix/tmdb.js
var FALLBACK_TMDB_KEYS = [
  "a2f888b27315e62e471b2d587048f32e",
  "68e094699525b18a70bab2f86b1fa706",
  "246ec6ffbbd6c05d76ad714241e3dcd1",
  "1865f43a0549ca50d341dd9ab8b29f49",
  "500330721680edb6d5f7f12ba7cd9023"
];
var imdbIdCache = /* @__PURE__ */ new Map();
var tmdbTitlesCache = /* @__PURE__ */ new Map();
function getAllTmdbKeys() {
  const dynamic = getDynamicTmdbKeys();
  if (Array.isArray(dynamic) && dynamic.length > 0) {
    return [.../* @__PURE__ */ new Set([...dynamic, ...FALLBACK_TMDB_KEYS])];
  }
  return FALLBACK_TMDB_KEYS;
}
function getTmdbExternalIds(tmdbId, mediaType) {
  return __async(this, null, function* () {
    if (!tmdbId)
      return null;
    let cleanId = String(tmdbId).trim().replace(/^tmdb:/i, "");
    if (cleanId.startsWith("tt")) {
      return cleanId;
    }
    const type = mediaType === "tv" || mediaType === "series" ? "tv" : "movie";
    const cacheKey = `${type}:${cleanId}`;
    if (imdbIdCache.has(cacheKey)) {
      return imdbIdCache.get(cacheKey);
    }
    const keys = getAllTmdbKeys();
    for (const key of keys) {
      try {
        const url = `https://api.themoviedb.org/3/${type}/${cleanId}/external_ids?api_key=${key}`;
        const res = yield fetchWithTimeout(url, { headers: { "Accept": "application/json" } }, 4e3);
        if (res.ok) {
          const data = yield res.json();
          if (data && data.imdb_id) {
            imdbIdCache.set(cacheKey, data.imdb_id);
            return data.imdb_id;
          }
        }
        if (res.status === 429)
          continue;
      } catch (_) {
      }
    }
    return null;
  });
}
function getTmdbTitle(tmdbId, mediaType) {
  return __async(this, null, function* () {
    if (!tmdbId)
      return null;
    let cleanId = String(tmdbId).trim().replace(/^tmdb:/i, "");
    const type = mediaType === "tv" || mediaType === "series" ? "tv" : "movie";
    const cacheKey = `${type}:${cleanId}`;
    if (tmdbTitlesCache.has(cacheKey)) {
      return tmdbTitlesCache.get(cacheKey);
    }
    const keys = getAllTmdbKeys();
    for (const key of keys) {
      try {
        const url = `https://api.themoviedb.org/3/${type}/${cleanId}?api_key=${key}&language=tr-TR`;
        const res = yield fetchWithTimeout(url, { headers: { "Accept": "application/json" } }, 4e3);
        if (res.ok) {
          const data = yield res.json();
          const title = data.title || data.name || data.original_title || data.original_name;
          if (title) {
            tmdbTitlesCache.set(cacheKey, title);
            return title;
          }
        }
        if (res.status === 429)
          continue;
      } catch (_) {
      }
    }
    return null;
  });
}

// src/patronSelcukFlix/extractor.js
var PROVIDER_TAG = `[${PROVIDER_NAME}]`;
var An = "9bYMCNQiWsXIYFWYAu7EkdsSbmGBTyUI";
var bn = "00000000000000000000000000000000";
var ar = ["t\xFCrk\xE7e", "turkish", "turkce", "dublaj", "trdual", "trdub", "ses-tr", "audio-tr", "tr-dub"];
var ea = ["tr", "tur", "ota"];
var nr = ["english", "ingilizce", "original", "orijinal", "audio-en"];
var aa = ["en", "eng", "und"];
function y0(str) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let clean = String(str || "").replace(/[\r\n\t =]+/g, "").replace(/-/g, "+").replace(/_/g, "/");
  let out = "";
  for (let i = 0; i < clean.length; i += 4) {
    let c1 = chars.indexOf(clean.charAt(i));
    let c2 = i + 1 < clean.length ? chars.indexOf(clean.charAt(i + 1)) : -1;
    let c3 = i + 2 < clean.length ? chars.indexOf(clean.charAt(i + 2)) : -1;
    let c4 = i + 3 < clean.length ? chars.indexOf(clean.charAt(i + 3)) : -1;
    if (c1 === -1 || c2 === -1)
      break;
    out += String.fromCharCode(c1 << 2 | c2 >> 4);
    if (c3 !== -1) {
      out += String.fromCharCode((c2 & 15) << 4 | c3 >> 2);
      if (c4 !== -1) {
        out += String.fromCharCode((c3 & 3) << 6 | c4);
      }
    }
  }
  return out;
}
function ze(str) {
  if (!str)
    return "";
  let b64 = String(str).trim().replace(/-/g, "+").replace(/_/g, "/");
  try {
    if (typeof atob === "function") {
      let a = atob(b64);
      try {
        return decodeURIComponent(escape(a));
      } catch (e) {
        return a;
      }
    }
  } catch (e) {
  }
  try {
    let decoded = import_crypto_js.default.enc.Base64.parse(b64).toString(import_crypto_js.default.enc.Utf8);
    if (decoded)
      return decoded;
  } catch (e) {
  }
  try {
    let manual = y0(b64);
    try {
      return decodeURIComponent(escape(manual));
    } catch (e) {
      return manual;
    }
  } catch (e) {
    return "";
  }
}
function yn(str, key = An) {
  if (!str)
    return "";
  let clean = str.replace(/[^A-Za-z0-9+/]/g, "");
  if (!clean)
    return "";
  let k = import_crypto_js.default.enc.Utf8.parse(key);
  let iv = import_crypto_js.default.enc.Hex.parse(bn);
  try {
    let decrypted = import_crypto_js.default.AES.decrypt({ ciphertext: import_crypto_js.default.enc.Base64.parse(clean) }, k, { iv });
    try {
      let utf8 = decrypted.toString(import_crypto_js.default.enc.Utf8);
      if (utf8)
        return utf8;
    } catch (e) {
    }
    let latin1 = decrypted.toString(import_crypto_js.default.enc.Latin1);
    if (latin1)
      return latin1;
  } catch (e) {
  }
  try {
    let paddedLen = Math.floor(clean.length / 64) * 64;
    if (paddedLen >= 64) {
      let decrypted = import_crypto_js.default.AES.decrypt({ ciphertext: import_crypto_js.default.enc.Base64.parse(clean.substring(0, paddedLen)) }, k, { iv });
      try {
        let utf8 = decrypted.toString(import_crypto_js.default.enc.Utf8);
        if (utf8)
          return utf8;
      } catch (e) {
      }
      return decrypted.toString(import_crypto_js.default.enc.Latin1);
    }
  } catch (e) {
  }
  return "";
}
function Te(str, key = An) {
  if (!str)
    return null;
  let k = import_crypto_js.default.enc.Utf8.parse(key);
  let iv = import_crypto_js.default.enc.Hex.parse(bn);
  let clean = str.replace(/"/g, "").trim();
  try {
    let decrypted = import_crypto_js.default.AES.decrypt({ ciphertext: import_crypto_js.default.enc.Base64.parse(clean) }, k, { iv }).toString(import_crypto_js.default.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (e) {
    try {
      let decrypted = import_crypto_js.default.AES.decrypt({ ciphertext: import_crypto_js.default.enc.Base64.parse(clean) }, k, { iv }).toString(import_crypto_js.default.enc.Latin1);
      return JSON.parse(decrypted);
    } catch (e2) {
      return null;
    }
  }
}
function lr(html, key) {
  if (!html)
    return [];
  let kStr = `"${key}"`;
  let idx = html.indexOf(kStr);
  if (idx === -1)
    return [];
  let resIdx = html.indexOf('"result":', idx);
  if (resIdx === -1 || resIdx - idx > 250)
    return [];
  let bIdx = html.indexOf("[", resIdx);
  if (bIdx === -1)
    return [];
  let depth = 0, eIdx = -1;
  for (let i = bIdx; i < html.length; i++) {
    if (html[i] === "[")
      depth++;
    else if (html[i] === "]") {
      depth--;
      if (depth === 0) {
        eIdx = i;
        break;
      }
    }
  }
  if (eIdx !== -1) {
    try {
      return JSON.parse(html.substring(bIdx, eIdx + 1));
    } catch (e) {
    }
  }
  return [];
}
function Pe(html) {
  if (!html)
    return null;
  let obj = { RelatedResults: {} };
  let keys = ["getEpisodeSources", "getSerieEpisodeSources", "getMoviePartsById"];
  let found = false;
  for (let k of keys) {
    let res = lr(html, k);
    if (res && res.length > 0) {
      obj.RelatedResults[k] = { result: res };
      found = true;
    }
  }
  return found ? obj : null;
}
function Ce(str) {
  if (!str || typeof str !== "string")
    return null;
  let t = str.trim();
  if (t.startsWith("{") || t.startsWith("[")) {
    try {
      return JSON.parse(t);
    } catch (e) {
    }
  }
  if (t.startsWith("ey") || t.startsWith("Wy") || t.startsWith("Ww")) {
    try {
      let z = ze(t);
      if (z) {
        if (z.startsWith("{") || z.startsWith("[")) {
          try {
            return JSON.parse(z);
          } catch (e) {
          }
        }
        let p = Pe(z);
        if (p)
          return p;
      }
    } catch (e) {
    }
  }
  try {
    let y = yn(t);
    if (y) {
      if (y.startsWith("{") || y.startsWith("[")) {
        try {
          return JSON.parse(y);
        } catch (e) {
        }
      }
      let p = Pe(y);
      if (p)
        return p;
    }
  } catch (e) {
  }
  try {
    let z = ze(t);
    if (z) {
      if (z.startsWith("{") || z.startsWith("[")) {
        try {
          return JSON.parse(z);
        } catch (e) {
        }
      }
      let p = Pe(z);
      if (p)
        return p;
    }
  } catch (e) {
  }
  return null;
}
function E0(html) {
  if (!html)
    return null;
  let idx = 0;
  while ((idx = html.indexOf("secureData", idx)) !== -1) {
    let colonIdx = html.indexOf(":", idx);
    if (colonIdx !== -1 && colonIdx - idx < 30) {
      let quote = '"';
      let q1 = html.indexOf('"', colonIdx);
      let q2 = html.indexOf("'", colonIdx);
      if (q1 === -1 || q2 !== -1 && q2 < q1) {
        q1 = q2;
        quote = "'";
      }
      if (q1 !== -1 && q1 - colonIdx < 15) {
        let qEnd = html.indexOf(quote, q1 + 1);
        if (qEnd !== -1) {
          let block = html.substring(q1 + 1, qEnd);
          if (block.length > 50)
            return block;
        } else {
          let block = html.substring(q1 + 1, q1 + 1 + 8e4).replace(/[^A-Za-z0-9+/]/g, "");
          if (block.length > 200)
            return block;
        }
      }
    }
    idx += 10;
  }
  let m = html.match(/secureData\s*[:=]\s*["']([^"']{50,})["']/i);
  if (m)
    return m[1];
  return null;
}
function En(html) {
  if (!html)
    return null;
  let m = html.match(/src=["']([^"']+)["']/i);
  if (m) {
    let src = m[1];
    if (src.startsWith("//"))
      src = "https:" + src;
    return src;
  }
  return null;
}
function resolveIframeLink(content) {
  if (!content)
    return null;
  let s = En(content);
  return s || (content.startsWith("http://") || content.startsWith("https://") ? content : content.startsWith("//") ? "https:" + content : null);
}
var LANG_MAP = {
  tr: { code: "tr", iso3: "tur", language: "Turkish", name: "T\xFCrk\xE7e" },
  tur: { code: "tr", iso3: "tur", language: "Turkish", name: "T\xFCrk\xE7e" },
  turkish: { code: "tr", iso3: "tur", language: "Turkish", name: "T\xFCrk\xE7e" },
  turkce: { code: "tr", iso3: "tur", language: "Turkish", name: "T\xFCrk\xE7e" },
  st: { code: "tr", iso3: "tur", language: "Turkish", name: "T\xFCrk\xE7e" },
  sot: { code: "tr", iso3: "tur", language: "Turkish", name: "T\xFCrk\xE7e" },
  sotho: { code: "tr", iso3: "tur", language: "Turkish", name: "T\xFCrk\xE7e" },
  sesotho: { code: "tr", iso3: "tur", language: "Turkish", name: "T\xFCrk\xE7e" },
  en: { code: "en", iso3: "eng", language: "English", name: "\u0130ngilizce" },
  eng: { code: "en", iso3: "eng", language: "English", name: "\u0130ngilizce" },
  english: { code: "en", iso3: "eng", language: "English", name: "\u0130ngilizce" },
  ingilizce: { code: "en", iso3: "eng", language: "English", name: "\u0130ngilizce" },
  de: { code: "de", iso3: "deu", language: "German", name: "Almanca" },
  ger: { code: "de", iso3: "deu", language: "German", name: "Almanca" },
  german: { code: "de", iso3: "deu", language: "German", name: "Almanca" },
  almanca: { code: "de", iso3: "deu", language: "German", name: "Almanca" },
  fr: { code: "fr", iso3: "fra", language: "French", name: "Frans\u0131zca" },
  fre: { code: "fr", iso3: "fra", language: "French", name: "Frans\u0131zca" },
  french: { code: "fr", iso3: "fra", language: "French", name: "Frans\u0131zca" },
  fransizca: { code: "fr", iso3: "fra", language: "French", name: "Frans\u0131zca" },
  es: { code: "es", iso3: "spa", language: "Spanish", name: "\u0130spanyolca" },
  spa: { code: "es", iso3: "spa", language: "Spanish", name: "\u0130spanyolca" },
  spanish: { code: "es", iso3: "spa", language: "Spanish", name: "\u0130spanyolca" },
  ispanyolca: { code: "es", iso3: "spa", language: "Spanish", name: "\u0130spanyolca" },
  it: { code: "it", iso3: "ita", language: "Italian", name: "\u0130talyanca" },
  ita: { code: "it", iso3: "ita", language: "Italian", name: "\u0130talyanca" },
  italian: { code: "it", iso3: "ita", language: "Italian", name: "\u0130talyanca" },
  italyanca: { code: "it", iso3: "ita", language: "Italian", name: "\u0130talyanca" },
  ru: { code: "ru", iso3: "rus", language: "Russian", name: "Rus\xE7a" },
  rus: { code: "ru", iso3: "rus", language: "Russian", name: "Rus\xE7a" },
  russian: { code: "ru", iso3: "rus", language: "Russian", name: "Rus\xE7a" },
  rusca: { code: "ru", iso3: "rus", language: "Russian", name: "Rus\xE7a" },
  az: { code: "az", iso3: "aze", language: "Azerbaijani", name: "Azerice" },
  aze: { code: "az", iso3: "aze", language: "Azerbaijani", name: "Azerice" },
  azerbaijani: { code: "az", iso3: "aze", language: "Azerbaijani", name: "Azerice" },
  azerice: { code: "az", iso3: "aze", language: "Azerbaijani", name: "Azerice" },
  ar: { code: "ar", iso3: "ara", language: "Arabic", name: "Arap\xE7a" },
  ara: { code: "ar", iso3: "ara", language: "Arabic", name: "Arap\xE7a" },
  arabic: { code: "ar", iso3: "ara", language: "Arabic", name: "Arap\xE7a" },
  arapca: { code: "ar", iso3: "ara", language: "Arabic", name: "Arap\xE7a" },
  ja: { code: "ja", iso3: "jpn", language: "Japanese", name: "Japonca" },
  jpn: { code: "ja", iso3: "jpn", language: "Japanese", name: "Japonca" },
  japanese: { code: "ja", iso3: "jpn", language: "Japanese", name: "Japonca" },
  japonca: { code: "ja", iso3: "jpn", language: "Japanese", name: "Japonca" },
  ko: { code: "ko", iso3: "kor", language: "Korean", name: "Korece" },
  kor: { code: "ko", iso3: "kor", language: "Korean", name: "Korece" },
  korean: { code: "ko", iso3: "kor", language: "Korean", name: "Korece" },
  korece: { code: "ko", iso3: "kor", language: "Korean", name: "Korece" },
  zh: { code: "zh", iso3: "zho", language: "Chinese", name: "\xC7ince" },
  chi: { code: "zh", iso3: "zho", language: "Chinese", name: "\xC7ince" },
  zho: { code: "zh", iso3: "zho", language: "Chinese", name: "\xC7ince" },
  chinese: { code: "zh", iso3: "zho", language: "Chinese", name: "\xC7ince" },
  cince: { code: "zh", iso3: "zho", language: "Chinese", name: "\xC7ince" }
};
function x0(code1, code2, forced) {
  let clean = (s) => (s || "").replace(/İ/g, "i").replace(/I/g, "i").replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c").toLowerCase().trim();
  let c1 = clean(code1 || "");
  let c2 = clean(code2 || "");
  let isForced = !!forced || c1.includes("forced") || c2.includes("forced") || c1.includes("zorunlu") || c2.includes("zorunlu");
  let formatName = (n) => {
    let cleanN = n.replace(/\s*\((?:forced|zorunlu)\)/gi, "").replace(/\s*-\s*(?:forced|zorunlu)/gi, "").trim();
    return isForced ? cleanN + " (Zorunlu)" : cleanN;
  };
  if (c1 === "st" || c1 === "sot" || c1.includes("sotho") || c2.includes("sotho") || c2.includes("sesotho")) {
    return { code: "tr", iso3: "tur", language: "Turkish", name: isForced ? "T\xFCrk\xE7e (Zorunlu)" : "T\xFCrk\xE7e" };
  }
  let match = LANG_MAP[c1] || LANG_MAP[c2];
  if (match) {
    return { code: match.code, iso3: match.iso3, language: match.language, name: formatName(match.name) };
  }
  if (c1.includes("tr") || c2.includes("tr") || c1.includes("tur") || c2.includes("tur") || c2.includes("t\xFCrk")) {
    return { code: "tr", iso3: "tur", language: "Turkish", name: formatName("T\xFCrk\xE7e") };
  }
  if (c1.includes("en") || c2.includes("en") || c1.includes("eng") || c2.includes("eng") || c2.includes("ing")) {
    return { code: "en", iso3: "eng", language: "English", name: formatName("\u0130ngilizce") };
  }
  let rawName = (code2 || code1 || "Altyaz\u0131").trim().replace(/\s*\((?:forced|zorunlu)\)/gi, "").replace(/\s*-\s*(?:forced|zorunlu)/gi, "").trim();
  let capName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  let cc = c1 && c1.length === 2 ? c1 : c2 && c2.length === 2 ? c2 : "und";
  let iso = c1 && c1.length === 3 ? c1 : c2 && c2.length === 3 ? c2 : "und";
  return { code: cc, iso3: iso, language: capName, name: formatName(capName) };
}
function or(html, baseUrl) {
  let subs = [];
  let origin = "https://pichive.online";
  try {
    origin = new URL(baseUrl).origin;
  } catch (e) {
  }
  let seen = /* @__PURE__ */ new Set();
  let m = html.match(/openPlayer\s*\([\s\S]*?(\[\s*\{\s*["']file["'][\s\S]*?\])\s*\)/) || html.match(/tracks\s*:\s*(\[\s*\{[\s\S]*?\}\s*\])/);
  if (m) {
    try {
      let arr = JSON.parse(m[1].replace(/'/g, '"'));
      if (Array.isArray(arr)) {
        arr.forEach((t) => {
          if (t && t.file) {
            let u = fixUrl(t.file.replace(/\\\//g, "/"), origin);
            if (!seen.has(u)) {
              seen.add(u);
              let label = (t.label || "").replace(/\\u([0-9a-fA-F]{4})/g, (_, x) => String.fromCharCode(parseInt(x, 16))).trim();
              let langObj = x0(u.includes(".en.") || u.includes("eng") ? "en" : "", label);
              subs.push({
                id: String(subs.length),
                url: u,
                language: langObj.language,
                name: langObj.name,
                lang: langObj.code,
                langCode: langObj.iso3,
                label: langObj.name,
                headers: { Referer: origin + "/", Origin: origin, "User-Agent": UA_OKHTTP, Accept: "*/*" }
              });
            }
          }
        });
      }
    } catch (e) {
    }
  }
  let rm = [/"file"\s*:\s*"([^"]+\.vtt[^"]*)"[\s\S]*?"label"\s*:\s*"([^"]+)"/gi, /"label"\s*:\s*"([^"]+)"[\s\S]*?"file"\s*:\s*"([^"]+\.vtt[^"]*)"/gi];
  for (let r of rm) {
    let matches = [...html.matchAll(r)];
    for (let mat of matches) {
      let file = "", label = "";
      if (mat[1].includes(".vtt")) {
        file = mat[1];
        label = mat[2];
      } else {
        label = mat[1];
        file = mat[2];
      }
      file = fixUrl(file.replace(/\\\//g, "/").replace(/\\u0026/g, "&").replace(/\\/g, ""), origin);
      label = label.replace(/\\u([0-9a-fA-F]{4})/g, (_, x) => String.fromCharCode(parseInt(x, 16))).trim();
      if (file.includes(".vtt") && !seen.has(file)) {
        seen.add(file);
        let langObj = x0(file.includes(".en.") || file.includes("eng") ? "en" : "", label);
        subs.push({
          id: String(subs.length),
          url: file,
          language: langObj.language,
          name: langObj.name,
          lang: langObj.code,
          langCode: langObj.iso3,
          label: langObj.name,
          headers: { Referer: origin + "/", Origin: origin, "User-Agent": UA_OKHTTP, Accept: "*/*" }
        });
      }
    }
  }
  if (subs.length === 0) {
    let matches = [...html.matchAll(/https?:\/\/[^\s"'<>]+\.vtt[^\s"'<>]*/gi)];
    for (let mat of matches) {
      let file = fixUrl(mat[0].replace(/\\\//g, "/"), origin);
      if (!seen.has(file)) {
        seen.add(file);
        let isEn = file.includes(".en.") || file.includes("en.vtt") || file.includes("eng");
        let isForced = file.includes("forced");
        let langObj = x0(isForced ? "forced" : isEn ? "en" : "tr", "");
        subs.push({
          id: String(subs.length),
          url: file,
          language: langObj.language,
          name: langObj.name,
          lang: langObj.code,
          langCode: langObj.iso3,
          label: langObj.name,
          headers: { Referer: origin + "/", Origin: origin, "User-Agent": UA_OKHTTP, Accept: "*/*" }
        });
      }
    }
  }
  return subs;
}
function na(subs1 = [], subs2 = []) {
  let combined = [...subs1 || [], ...subs2 || []];
  let unique = [];
  let seen = /* @__PURE__ */ new Set();
  for (let s of combined) {
    if (!s || !s.url)
      continue;
    let u = s.url.trim();
    if (seen.has(u))
      continue;
    seen.add(u);
    let langObj = x0(s.lang, s.label || s.name || s.language);
    let name = langObj.name || s.label || s.name || "Altyaz\u0131";
    unique.push({
      id: String(unique.length),
      url: u,
      label: name,
      name,
      language: langObj.language,
      lang: langObj.code,
      langCode: langObj.iso3,
      headers: s.headers
    });
  }
  return unique;
}
function sr(html) {
  try {
    let km = html.match(/k:\s*["']([^'"]+)["']/);
    let fm = html.match(/file\s*:\s*av\(["']([^'"]+)["']\)/) || html.match(/sources\s*:\s*\[\s*\{\s*file\s*:\s*av\(["']([^'"]+)["']\)/);
    if (!km || !fm)
      return null;
    let kDec = y0(km[1]);
    let fRev = fm[1].split("").reverse().join("");
    let fDec = y0(fRev);
    let out = "";
    for (let i = 0; i < fDec.length; i++) {
      let kc = kDec[i % kDec.length];
      out += String.fromCharCode(fDec.charCodeAt(i) - (kc.charCodeAt(0) % 5 + 1));
    }
    let finalDec = y0(out);
    if (finalDec && (finalDec.startsWith("http://") || finalDec.startsWith("https://"))) {
      return finalDec;
    }
  } catch (e) {
  }
  return null;
}
function Fn(iframeUrl, referer, timeoutMs = 3e3) {
  return __async(this, null, function* () {
    var _a, _b, _c;
    try {
      let origin = "https://pichive.online";
      try {
        origin = new URL(iframeUrl).origin;
      } catch (e) {
      }
      let res = yield fetchWithTimeout(iframeUrl, {
        headers: {
          "User-Agent": UA_OKHTTP,
          "Referer": referer,
          "Origin": new URL(referer || iframeUrl).origin
        }
      }, timeoutMs);
      if (!res.ok)
        return null;
      let html = yield res.text();
      if (html.length < 500 && (html.includes("domain may be for sale") || html.includes("parked")))
        return null;
      let hlsUrl = null;
      let m = html.match(/openPlayer\s*\(\s*['"]([^'"]+)['"]/);
      if (m) {
        let v = m[1];
        let urls = [`${origin}/source2.php?v=${v}`, `${origin}/source2.php?v=${encodeURIComponent(v)}`];
        for (let u of urls) {
          try {
            let r = yield fetchWithTimeout(u, {
              headers: {
                "User-Agent": UA_OKHTTP,
                "Referer": iframeUrl,
                "Origin": origin,
                "X-Requested-With": "XMLHttpRequest"
              }
            }, timeoutMs);
            if (r.ok) {
              let j = yield r.json();
              let f = ((_c = (_b = (_a = ((j == null ? void 0 : j.playlist) || [])[0]) == null ? void 0 : _a.sources) == null ? void 0 : _b[0]) == null ? void 0 : _c.file) || (typeof (j == null ? void 0 : j.data) === "string" ? j.data : null);
              if (f) {
                hlsUrl = fixUrl(f.replace("/m.php", "/master.m3u8").replace("m.php", "master.m3u8"), origin);
                break;
              }
            }
          } catch (e) {
          }
        }
      }
      if (!hlsUrl)
        hlsUrl = fixUrl(sr(html), origin);
      if (!hlsUrl) {
        let regexes = [
          /file\s*:\s*"(https?:\/\/[^"]+\.m3u8[^"]*)"/,
          /src\s*:\s*"(https?:\/\/[^"]+\.m3u8[^"]*)"/,
          /"(https?:\/\/[^"]*\/master\.m3u8[^"]*)"/,
          /"(https?:\/\/[^"]*\.m3u8[^"]*)"/
        ];
        for (let r of regexes) {
          let rM = html.match(r);
          if (rM) {
            hlsUrl = fixUrl(rM[1], origin);
            break;
          }
        }
      }
      if (!hlsUrl)
        return null;
      let subtitles = or(html, iframeUrl);
      let m3u8Text = "";
      try {
        let mRes = yield fetchWithTimeout(hlsUrl, {
          headers: {
            Referer: origin + "/",
            Origin: origin,
            "User-Agent": UA_OKHTTP
          }
        }, 1500);
        if (mRes.ok) {
          m3u8Text = yield mRes.text();
        }
      } catch (e) {
      }
      return { hlsUrl, subtitles, origin, m3u8Text };
    } catch (e) {
      return null;
    }
  });
}
function _n(iframeUrl, referer) {
  return __async(this, null, function* () {
    if (!iframeUrl || !iframeUrl.includes("pichive") && !iframeUrl.includes("dplayer") && !iframeUrl.includes("iframe.php"))
      return null;
    let r1 = yield Fn(iframeUrl, referer, 3e3);
    if (r1 && r1.hlsUrl)
      return r1;
    let m = iframeUrl.match(/[?&]v=([a-zA-Z0-9]+)/);
    if (m) {
      let v = m[1];
      let sub = "four";
      try {
        let p = new URL(iframeUrl).hostname.split(".");
        if (p.length >= 3)
          sub = p[0];
      } catch (e) {
      }
      let mirrors = [
        `https://four.pichive.online/iframe.php?v=${v}`,
        `https://four.dplayer82.site/iframe.php?v=${v}`,
        `https://sn.dplayer82.site/iframe.php?v=${v}`,
        `https://${sub}.dplayer82.site/iframe.php?v=${v}`,
        `https://${sub}.pichive.online/iframe.php?v=${v}`
      ].filter((u, i, a) => u !== iframeUrl && !u.includes("//pichive.online") && a.indexOf(u) === i);
      let mirrorPromises = mirrors.map((u) => Fn(u, referer, 2500));
      return yield racePromises(mirrorPromises);
    }
    return null;
  });
}
function ra(m3u8Text, m3u8Url) {
  let hasTurkishAudio = false;
  let hasOriginalAudio = false;
  let embeddedSubtitles = [];
  let detectedQuality = "1080p";
  let detectedCodec = void 0;
  let detectedAudio = void 0;
  let urlLower = (m3u8Url || "").toLowerCase();
  if (urlLower.includes("trdual") || urlLower.includes("dual") || urlLower.includes("trdub") || urlLower.includes("dublaj")) {
    hasTurkishAudio = true;
    hasOriginalAudio = true;
  } else if (urlLower.includes("ses-tr") || urlLower.includes("turkcedublaj") || urlLower.includes("turkce-dublaj")) {
    hasTurkishAudio = true;
  }
  if (urlLower.includes("2160p") || urlLower.includes("4k") || urlLower.includes("uhd")) {
    detectedQuality = "4K";
  } else if (urlLower.includes("1080p") || urlLower.includes("fhd")) {
    detectedQuality = "1080p";
  } else if (urlLower.includes("720p") || urlLower.includes("hd")) {
    detectedQuality = "720p";
  } else if (urlLower.includes("480p") || urlLower.includes("sd")) {
    detectedQuality = "480p";
  }
  if (urlLower.includes("hevc") || urlLower.includes("h265") || urlLower.includes("x265")) {
    detectedCodec = "HEVC";
  } else if (urlLower.includes("av1")) {
    detectedCodec = "AV1";
  } else if (urlLower.includes("h264") || urlLower.includes("x264") || urlLower.includes("avc")) {
    detectedCodec = "H.264";
  }
  if (m3u8Text && typeof m3u8Text === "string") {
    let lines = m3u8Text.split(/\r?\n/);
    let maxRes = 0;
    for (let line of lines) {
      let trLine = line.trim();
      if (trLine.startsWith("#EXT-X-MEDIA:") && trLine.includes("TYPE=AUDIO")) {
        let nameM = trLine.match(/NAME=["']([^"']+)["']/i);
        let langM = trLine.match(/LANGUAGE=["']([^"']+)["']/i);
        let groupM = trLine.match(/GROUP-ID=["']([^"']+)["']/i);
        let nStr = (nameM ? nameM[1] : "").toLowerCase();
        let lStr = (langM ? langM[1] : "").toLowerCase();
        let gStr = (groupM ? groupM[1] : "").toLowerCase();
        let isTr = ea.includes(lStr) || ar.some((x) => nStr.includes(x) || gStr.includes(x)) || nStr.includes("t\xFCrk") || nStr.includes("turk") || gStr.includes("dual");
        let isOrig = aa.includes(lStr) || nr.some((x) => nStr.includes(x) || gStr.includes(x)) || nStr.includes("orig") || nStr.includes("ing") || nStr.includes("eng");
        if (isTr)
          hasTurkishAudio = true;
        if (isOrig)
          hasOriginalAudio = true;
      }
      if (trLine.startsWith("#EXT-X-MEDIA:") && trLine.includes("TYPE=SUBTITLES")) {
        let uriM = trLine.match(/URI=["']([^"']+)["']/i);
        let nameM = trLine.match(/NAME=["']([^"']+)["']/i);
        let langM = trLine.match(/LANGUAGE=["']([^"']+)["']/i);
        if (uriM && uriM[1]) {
          let subUri = uriM[1];
          if (m3u8Url && !subUri.startsWith("http")) {
            try {
              subUri = new URL(subUri, m3u8Url).toString();
            } catch (e) {
            }
          }
          let subName = nameM ? nameM[1] : "Altyaz\u0131";
          let subLang = langM ? langM[1].toLowerCase() : "";
          if (subLang === "st" || subLang === "sot" || subName.toLowerCase().includes("sotho") || subUri.toLowerCase().includes("sub_st")) {
            subLang = "tr";
            subName = "T\xFCrk\xE7e";
          }
          let lObj = x0(subLang, subName);
          embeddedSubtitles.push({
            label: lObj.name || subName,
            url: subUri,
            lang: lObj.code || subLang
          });
        }
      }
      if (trLine.startsWith("#EXT-X-STREAM-INF:")) {
        let resM = trLine.match(/RESOLUTION=(\d+)x(\d+)/i);
        if (resM) {
          let h = parseInt(resM[2], 10);
          let w = parseInt(resM[1], 10);
          let resHeight = Math.min(w, h);
          if (resHeight > maxRes)
            maxRes = resHeight;
        }
      }
    }
    if (maxRes >= 2100)
      detectedQuality = "4K";
    else if (maxRes >= 1400)
      detectedQuality = "2K";
    else if (maxRes >= 1e3)
      detectedQuality = "1080p";
    else if (maxRes >= 700)
      detectedQuality = "720p";
    else if (maxRes >= 450)
      detectedQuality = "480p";
  }
  let isDual = hasTurkishAudio && hasOriginalAudio || urlLower.includes("dual") || urlLower.includes("trdual");
  return {
    hasTurkishAudio,
    hasOriginalAudio,
    isDual,
    embeddedSubtitles,
    detectedQuality,
    detectedCodec,
    detectedAudio
  };
}
function rr(info) {
  let { hasTurkishAudio, hasOriginalAudio, isDual, hasTurkishSubtitles, siteHint } = info;
  if (siteHint == null ? void 0 : siteHint.label) {
    let l = siteHint.label.toLowerCase();
    if ((l.includes("dub") || l.includes("t\xFCrk")) && (l.includes("alt") || l.includes("sub"))) {
      return "Dublaj / Altyaz\u0131l\u0131";
    }
    if (l.includes("dub") || l.includes("t\xFCrk\xE7e ses"))
      return "Dublaj";
    if (l.includes("alt") || l.includes("sub"))
      return "Altyaz\u0131l\u0131";
    if (l.includes("orijinal") || l.includes("original"))
      return "Orijinal";
  }
  if (isDual || hasTurkishAudio && (hasOriginalAudio || hasTurkishSubtitles)) {
    return "Dublaj / Altyaz\u0131l\u0131";
  }
  if (hasTurkishAudio || (siteHint == null ? void 0 : siteHint.isDublaj))
    return "Dublaj";
  if (hasTurkishSubtitles || (siteHint == null ? void 0 : siteHint.isAltyazi))
    return "Altyaz\u0131l\u0131";
  return hasTurkishAudio ? "Dublaj" : "Orijinal";
}
function ta(options) {
  let { m3u8Text, m3u8Url, externalSubtitles, siteHint } = options;
  let inspection = ra(m3u8Text, m3u8Url);
  let allSubs = na(externalSubtitles, inspection.embeddedSubtitles);
  let hasTurkishSubtitles = allSubs.some((s) => s.lang === "tr" || s.langCode === "tur" || (s.label || "").toLowerCase().includes("t\xFCrk"));
  let hasTurkishAudio = inspection.hasTurkishAudio || !!(siteHint == null ? void 0 : siteHint.isDublaj);
  let hasOriginalAudio = inspection.hasOriginalAudio;
  let isDual = inspection.isDual || hasTurkishAudio && (hasTurkishSubtitles || hasOriginalAudio);
  let title = rr({
    hasTurkishAudio,
    hasOriginalAudio,
    isDual,
    hasTurkishSubtitles,
    siteHint
  });
  return {
    hasTurkishAudio,
    hasOriginalAudio,
    isDual,
    hasTurkishSubtitles,
    languageTitle: title,
    subtitles: allSubs,
    detectedQuality: inspection.detectedQuality,
    detectedCodec: inspection.detectedCodec,
    detectedAudio: inspection.detectedAudio
  };
}
function ia(streamData) {
  var _a, _b, _c, _d;
  let q = streamData.quality || ((_a = streamData.inspection) == null ? void 0 : _a.detectedQuality) || "1080p";
  if (q.includes("\u2022"))
    q = q.split("\u2022")[0].trim();
  if (!q.includes("p") && !q.includes("K") && !q.includes("k") && q !== "HD" && q !== "FHD" && q !== "SD") {
    q = q + "p";
  }
  let title = streamData.title || ((_b = streamData.inspection) == null ? void 0 : _b.languageTitle) || "Orijinal";
  let descParts = [q];
  if ((_c = streamData.inspection) == null ? void 0 : _c.detectedCodec)
    descParts.push(streamData.inspection.detectedCodec);
  descParts.push("HLS");
  let desc = `${title}
${descParts.join(" \u2022 ")}`;
  return {
    name: streamData.name || "SelcukFlix",
    title,
    description: desc,
    url: streamData.url,
    quality: `${q} \u2022 ${title}`,
    format: "m3u8",
    headers: streamData.headers || {},
    subtitles: streamData.subtitles || ((_d = streamData.inspection) == null ? void 0 : _d.subtitles) || []
  };
}
function ur(_0, _1) {
  return __async(this, arguments, function* (baseUrl, slug, userAgent = UA_OKHTTP) {
    let slugClean = slug.replace(/^\/?(film\/)?/, "").replace(/\/$/, "");
    let slugBase = slugClean.replace(/-[a-z]\d+$/i, "");
    let candidates = [
      slug.startsWith("film/") ? `${baseUrl}/${slug}` : `${baseUrl}/film/${slugClean}`,
      `${baseUrl}/${slug.replace(/^\/?/, "")}`,
      `${baseUrl}/film/${slugBase}`,
      `${baseUrl}/film/${slugClean}/izle`,
      `${baseUrl}/${slugClean}/izle`
    ].filter((u, i, a) => a.indexOf(u) === i);
    let promises = candidates.map((candUrl) => __async(this, null, function* () {
      try {
        let res = yield fetchWithTimeout(candUrl, {
          headers: {
            "User-Agent": userAgent,
            Referer: baseUrl + "/"
          }
        }, 8e3);
        if (res.ok) {
          let html = yield res.text();
          let secureData = E0(html);
          if (secureData) {
            return {
              url: res.url || candUrl,
              html,
              secureData
            };
          }
        }
      } catch (e) {
      }
      return null;
    }));
    return yield racePromises(promises);
  });
}
function xr(_0, _1, _2, _3) {
  return __async(this, arguments, function* (baseUrl, slug, season, episode, userAgent = UA_OKHTTP) {
    var _a, _b, _c;
    let slugClean = slug.replace(/^\/?(dizi\/)?/, "").replace(/\/$/, "");
    let hashMatch = slugClean.match(/-[a-z]\d+$/i);
    let hashSuffix = hashMatch ? hashMatch[0] : "";
    let baseSlug = slugClean.replace(/-[a-z]\d+$/i, "");
    let candidates = [
      `${baseUrl}/dizi/${baseSlug}/sezon-${season}/bolum-${episode}`,
      hashSuffix ? `${baseUrl}/dizi/${baseSlug}/sezon-${season}/bolum-${episode}${hashSuffix}` : null,
      `${baseUrl}/${baseSlug}-${season}-sezon-${episode}-bolum`,
      hashSuffix ? `${baseUrl}/${baseSlug}-${season}-sezon-${episode}-bolum${hashSuffix}` : null,
      `${baseUrl}/bolum/${baseSlug}-${season}x${episode}`,
      hashSuffix ? `${baseUrl}/bolum/${baseSlug}-${season}x${episode}${hashSuffix}` : null,
      slugClean !== baseSlug ? `${baseUrl}/dizi/${slugClean}/sezon-${season}/bolum-${episode}` : null,
      slugClean !== baseSlug ? `${baseUrl}/${slugClean}-${season}-sezon-${episode}-bolum` : null,
      `${baseUrl}/dizi/${baseSlug}/sezon-${season}/bolum-${episode}-izle`,
      `${baseUrl}/${baseSlug}-${season}-sezon-${episode}-bolum-izle`
    ].filter(Boolean);
    let candidatePromises = candidates.map((candUrl) => __async(this, null, function* () {
      try {
        let res = yield fetchWithTimeout(candUrl, {
          headers: {
            "User-Agent": userAgent,
            Referer: baseUrl + "/"
          }
        }, 8e3);
        if (res.ok) {
          let html = yield res.text();
          let secureData = E0(html);
          if (secureData) {
            return {
              url: res.url || candUrl,
              html,
              secureData
            };
          }
        }
      } catch (e) {
      }
      return null;
    }));
    let found = yield racePromises(candidatePromises);
    if (found)
      return found;
    try {
      let mainSeriesUrls = [
        `${baseUrl}/dizi/${baseSlug}`,
        `${baseUrl}/${slug.replace(/^\/?/, "")}`
      ];
      for (let mUrl of mainSeriesUrls) {
        let res = yield fetchWithTimeout(mUrl, {
          headers: {
            "User-Agent": userAgent,
            Referer: baseUrl + "/"
          }
        }, 8e3);
        if (res.ok) {
          let html = yield res.text();
          let sec = E0(html);
          if (sec) {
            let data = Ce(sec) || Te(sec);
            let list = ((_c = ((data == null ? void 0 : data.RelatedResults) || ((_b = (_a = data == null ? void 0 : data.content) == null ? void 0 : _a.result) == null ? void 0 : _b.RelatedResults) || {}).getSerieSeasonAndEpisodes) == null ? void 0 : _c.result) || (data == null ? void 0 : data.seasons) || [];
            let epSlug = null;
            if (Array.isArray(list)) {
              for (let item of list) {
                if (Number(item.season_no) === Number(season) && Number(item.episode_no) === Number(episode)) {
                  epSlug = item.used_slug || item.slug;
                  break;
                }
                if (Number(item.season_no) === Number(season) && Array.isArray(item.episodes)) {
                  let matchEp = item.episodes.find((x) => Number(x.episode_no) === Number(episode));
                  if (matchEp) {
                    epSlug = matchEp.used_slug || matchEp.slug;
                    break;
                  }
                }
              }
            }
            if (epSlug) {
              let epUrl = `${baseUrl}/${epSlug.replace(/^\/?/, "")}`;
              let epRes = yield fetchWithTimeout(epUrl, {
                headers: {
                  "User-Agent": userAgent,
                  Referer: baseUrl + "/"
                }
              }, 8e3);
              if (epRes.ok) {
                let epHtml = yield epRes.text();
                let epSec = E0(epHtml);
                if (epSec) {
                  return {
                    url: epRes.url || epUrl,
                    html: epHtml,
                    secureData: epSec
                  };
                }
              }
            }
          }
        }
      }
    } catch (e) {
    }
    return null;
  });
}
function searchContent(_0, _1, _2) {
  return __async(this, arguments, function* (baseUrl, imdbId, isTv, userAgent = UA_OKHTTP, tmdbId = null) {
    let headers = {
      "User-Agent": userAgent,
      Referer: baseUrl + "/",
      Origin: baseUrl,
      "Content-Type": "application/json"
    };
    if (typeof Android !== "undefined" && typeof Android.getNuvioAuth === "function") {
      try {
        let auth = Android.getNuvioAuth(baseUrl);
        if (auth)
          headers["X-Nuvio-Auth"] = auth;
      } catch (e) {
      }
    }
    let searchTerms = [];
    if (imdbId) {
      searchTerms.push(imdbId);
      if (imdbId.startsWith("tt")) {
        searchTerms.push(imdbId.replace(/^tt/, ""));
      }
    }
    for (let term of searchTerms) {
      try {
        let searchUrl = `${baseUrl}/api/bg/searchContent?searchterm=${encodeURIComponent(term)}`;
        let res = yield fetchWithTimeout(searchUrl, {
          method: "POST",
          headers
        }, 6e3);
        if (!res.ok) {
          res = yield fetchWithTimeout(searchUrl, {
            method: "GET",
            headers
          }, 6e3);
        }
        if (!res.ok)
          continue;
        let text = yield res.text();
        if (!text)
          continue;
        let parsed = null;
        try {
          let json = JSON.parse(text);
          parsed = (json == null ? void 0 : json.response) ? Ce(json.response) : json;
        } catch (e) {
          parsed = Ce(text);
        }
        let items = Array.isArray(parsed) ? parsed : Array.isArray(parsed == null ? void 0 : parsed.result) ? parsed.result : [];
        if (items.length > 0) {
          let match = items.find(
            (x) => x.object_related_imdb_id === imdbId || x.imdb_id === imdbId || x.imdbId === imdbId || x.imdb === imdbId || x.object_related_imdb_id === term || x.imdb_id === term || x.imdbId === term || x.imdb === term
          );
          if (match && (match.used_slug || match.slug)) {
            return {
              slug: match.used_slug || match.slug,
              title: match.object_name || match.title || match.name || "\u0130\xE7erik",
              baseUrl
            };
          }
          if (items.length === 1 && (items[0].used_slug || items[0].slug)) {
            return {
              slug: items[0].used_slug || items[0].slug,
              title: items[0].object_name || items[0].title || items[0].name || "\u0130\xE7erik",
              baseUrl
            };
          }
        }
      } catch (_) {
      }
    }
    if (tmdbId) {
      try {
        let title = yield getTmdbTitle(tmdbId, isTv ? "tv" : "movie");
        if (title) {
          let searchUrl = `${baseUrl}/api/bg/searchContent?searchterm=${encodeURIComponent(title)}`;
          let res = yield fetchWithTimeout(searchUrl, { method: "POST", headers }, 6e3);
          if (!res.ok)
            res = yield fetchWithTimeout(searchUrl, { method: "GET", headers }, 6e3);
          if (res.ok) {
            let text = yield res.text();
            let parsed = null;
            try {
              let json = JSON.parse(text);
              parsed = (json == null ? void 0 : json.response) ? Ce(json.response) : json;
            } catch (e) {
              parsed = Ce(text);
            }
            let items = Array.isArray(parsed) ? parsed : Array.isArray(parsed == null ? void 0 : parsed.result) ? parsed.result : [];
            if (items.length > 0 && (items[0].used_slug || items[0].slug)) {
              return {
                slug: items[0].used_slug || items[0].slug,
                title: items[0].object_name || items[0].title || items[0].name || title,
                baseUrl
              };
            }
          }
        }
      } catch (_) {
      }
    }
    return null;
  });
}
function extractSourcesFromSecureData(dataObj, providerName) {
  var _a, _b, _c, _d, _e, _f;
  let list = [];
  if (!dataObj)
    return list;
  let related = dataObj.RelatedResults || ((_b = (_a = dataObj.content) == null ? void 0 : _a.result) == null ? void 0 : _b.RelatedResults) || {};
  let epSources = ((_c = related.getEpisodeSources) == null ? void 0 : _c.result) || [];
  if (Array.isArray(epSources)) {
    for (let item of epSources) {
      let iframe = resolveIframeLink(item.source_content || item.source_url || "");
      if (iframe) {
        list.push({
          name: item.source_name || providerName,
          lang: item.language_name || "T\xFCrk\xE7e",
          iframe
        });
      }
    }
  }
  let serieEpSources = ((_d = related.getSerieEpisodeSources) == null ? void 0 : _d.result) || [];
  if (Array.isArray(serieEpSources)) {
    for (let item of serieEpSources) {
      let iframe = resolveIframeLink(item.source_content || item.source_url || "");
      if (iframe) {
        list.push({
          name: item.source_name || providerName,
          lang: item.language_name || "T\xFCrk\xE7e",
          iframe
        });
      }
    }
  }
  let movieParts = (_e = related.getMoviePartsById) == null ? void 0 : _e.result;
  if (Array.isArray(movieParts)) {
    for (let part of movieParts) {
      let partSources = (_f = related[`getMoviePartSourcesById_${part.id}`]) == null ? void 0 : _f.result;
      if (Array.isArray(partSources)) {
        for (let s of partSources) {
          let iframe = resolveIframeLink(s.source_content || s.source_url || "");
          if (iframe) {
            list.push({
              name: s.source_name || providerName,
              lang: part.language_name || s.language_name || "T\xFCrk\xE7e",
              iframe
            });
          }
        }
      }
    }
  }
  for (let [key, val] of Object.entries(related)) {
    if (key.includes("PartSources") || key.includes("MovieSources") || key.includes("sources")) {
      let arr = val == null ? void 0 : val.result;
      if (Array.isArray(arr)) {
        for (let s of arr) {
          let iframe = resolveIframeLink(s.source_content || s.source_url || "");
          if (iframe) {
            list.push({
              name: s.source_name || providerName,
              lang: s.language_name || "T\xFCrk\xE7e",
              iframe
            });
          }
        }
      }
    }
  }
  let directKeys = ["sources", "mirrors", "links"];
  for (let k of directKeys) {
    if (Array.isArray(dataObj[k])) {
      for (let s of dataObj[k]) {
        let iframe = resolveIframeLink(s.url || s.file || s.link || s.source_content || "");
        if (iframe) {
          list.push({
            name: s.source_name || s.name || providerName,
            lang: s.language_name || s.label || "T\xFCrk\xE7e",
            iframe
          });
        }
      }
    }
  }
  return list;
}
function extractStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    let isTv = mediaType === "tv" || mediaType === "series";
    console.log(`${PROVIDER_TAG} Tarama baslatildi -> TMDB: ${tmdbId}, Tur: ${isTv ? "Dizi" : "Film"}, S:${season || 1} E:${episode || 1}`);
    let imdbId = yield getTmdbExternalIds(tmdbId, isTv ? "tv" : "movie");
    if (!imdbId && !String(tmdbId).startsWith("tt")) {
      console.warn(`${PROVIDER_TAG} IMDb ID bulunamadi, TMDB ID ile devam ediliyor.`);
    } else if (imdbId) {
      console.log(`${PROVIDER_TAG} IMDb ID: ${imdbId}`);
    }
    let baseUrl = yield resolveBaseUrl();
    if (!baseUrl) {
      console.error(`${PROVIDER_TAG} Base URL alinamadi.`);
      return [];
    }
    let searchRes = yield searchContent(baseUrl, imdbId, isTv, UA_OKHTTP, tmdbId);
    if (!searchRes || !searchRes.slug) {
      console.warn(`${PROVIDER_TAG} Arama sonucu bulunamadi.`);
      return [];
    }
    console.log(`${PROVIDER_TAG} Icerik bulundu: "${searchRes.title}" (slug: ${searchRes.slug})`);
    let pageData = isTv ? yield xr(baseUrl, searchRes.slug, season || 1, episode || 1, UA_BROWSER) : yield ur(baseUrl, searchRes.slug, UA_BROWSER);
    if (!pageData || !pageData.secureData) {
      console.warn(`${PROVIDER_TAG} Sayfa veya secureData blogu alinamadi.`);
      return [];
    }
    let { url: pageUrl, secureData } = pageData;
    let dataObj = Ce(secureData) || Te(secureData);
    if (!dataObj) {
      console.error(`${PROVIDER_TAG} secureData desifre edilemedi.`);
      return [];
    }
    let rawSources = extractSourcesFromSecureData(dataObj, "SelcukFlix");
    let seenIframes = /* @__PURE__ */ new Set();
    let uniqueSources = [];
    for (let s of rawSources) {
      if (!seenIframes.has(s.iframe)) {
        seenIframes.add(s.iframe);
        uniqueSources.push(s);
      }
    }
    if (uniqueSources.length === 0) {
      console.warn(`${PROVIDER_TAG} Oynatici kaynagi bulunamadi.`);
      return [];
    }
    uniqueSources.sort((a, b) => {
      let score = (u) => u.includes("four.pichive") || u.includes("four.dplayer") || u.includes("sn.dplayer") ? 0 : u.includes("pichive") || u.includes("dplayer") ? 1 : 2;
      return score(a.iframe) - score(b.iframe);
    });
    let hasDubHint = uniqueSources.some((s) => {
      var _a, _b;
      return ((_a = s.lang) == null ? void 0 : _a.toLowerCase().includes("dub")) || ((_b = s.name) == null ? void 0 : _b.toLowerCase().includes("dub"));
    });
    let hasAltHint = uniqueSources.some((s) => {
      var _a, _b;
      return ((_a = s.lang) == null ? void 0 : _a.toLowerCase().includes("alt")) || ((_b = s.name) == null ? void 0 : _b.toLowerCase().includes("alt"));
    });
    let results = [];
    let seenHls = /* @__PURE__ */ new Set();
    for (let source of uniqueSources) {
      try {
        let res = yield _n(source.iframe, pageUrl);
        if (res && res.hlsUrl && !seenHls.has(res.hlsUrl)) {
          seenHls.add(res.hlsUrl);
          let isDub = hasDubHint || (source.lang || "").toLowerCase().includes("dub");
          let isAlt = hasAltHint || res.subtitles && res.subtitles.length > 0 || (source.lang || "").toLowerCase().includes("alt");
          let inspection = ta({
            m3u8Text: res.m3u8Text,
            m3u8Url: res.hlsUrl,
            externalSubtitles: res.subtitles || [],
            siteHint: {
              isDublaj: isDub,
              isAltyazi: isAlt,
              label: source.lang || source.name
            }
          });
          let stream = ia({
            name: "SelcukFlix",
            url: res.hlsUrl,
            inspection,
            quality: "1080p",
            format: "m3u8",
            headers: {
              Referer: res.origin + "/",
              Origin: res.origin,
              "User-Agent": UA_OKHTTP
            }
          });
          results.push(stream);
        }
      } catch (_) {
      }
    }
    console.log(`${PROVIDER_TAG} Toplam ${results.length} stream hazirlandi.`);
    return results;
  });
}

// src/patronSelcukFlix/index.js
var config = {
  id: "patron-selcukflix",
  name: "SelcukFlix",
  version: "1.0.0",
  type: "provider",
  author: "Nuvio",
  description: "SelcukFlix"
};
function normalizeInputs(tmdbId, mediaType, season, episode) {
  var _a, _b, _c, _d, _e;
  let rawId = tmdbId;
  let rawType = mediaType;
  let rawSeason = season;
  let rawEpisode = episode;
  if (typeof tmdbId === "object" && tmdbId !== null && !Array.isArray(tmdbId)) {
    rawId = tmdbId.id || tmdbId.tmdbId || tmdbId.rawTmdbId || tmdbId.imdbId || "";
    rawType = tmdbId.type || tmdbId.mediaType || tmdbId.rawMediaType;
    rawSeason = (_b = (_a = tmdbId.season) != null ? _a : tmdbId.seasonNum) != null ? _b : tmdbId.rawSeasonNum;
    rawEpisode = (_d = (_c = tmdbId.episode) != null ? _c : tmdbId.episodeNum) != null ? _d : tmdbId.rawEpisodeNum;
  }
  let idStr = String(rawId || "").trim();
  if (idStr.toLowerCase().startsWith("tmdb:")) {
    idStr = idStr.slice(5);
  }
  let parts = idStr.split(":");
  if (parts[0] === "series" || parts[0] === "tv" || parts[0] === "show" || parts[0] === "dizi") {
    parts.shift();
    rawType = "tv";
  } else if (parts[0] === "movie" || parts[0] === "film") {
    parts.shift();
    rawType = "movie";
  }
  let cleanId = ((_e = parts[0]) == null ? void 0 : _e.trim()) || idStr;
  if (parts.length >= 3) {
    let s = parseInt(parts[1], 10);
    let e = parseInt(parts[2], 10);
    if (!isNaN(s))
      rawSeason = s;
    if (!isNaN(e))
      rawEpisode = e;
  }
  let typeStr = String(rawType || "").toLowerCase().trim();
  let isTv = typeStr === "tv" || typeStr === "series" || typeStr === "show" || typeStr === "dizi";
  let finalType = isTv ? "tv" : "movie";
  let sNum = rawSeason != null && rawSeason !== "" ? parseInt(String(rawSeason), 10) : 1;
  let eNum = rawEpisode != null && rawEpisode !== "" ? parseInt(String(rawEpisode), 10) : 1;
  return {
    tmdbId: cleanId,
    mediaType: finalType,
    season: isNaN(sNum) ? 1 : sNum,
    episode: isNaN(eNum) ? 1 : eNum
  };
}
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      const norm = normalizeInputs(tmdbId, mediaType, season, episode);
      console.log(`[PatronSelcukFlix] \u0130stek: ${norm.mediaType} | TMDB: ${norm.tmdbId} | S:${norm.season} E:${norm.episode}`);
      return yield extractStreams(norm.tmdbId, norm.mediaType, norm.season, norm.episode);
    } catch (e) {
      console.error(`[PatronSelcukFlix] Stream al\u0131n\u0131rken hata: ${e.message}`);
      return [];
    }
  });
}
var patronSelcukFlix_default = {
  config,
  getStreams
};
