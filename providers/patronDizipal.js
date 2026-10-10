/**
 * patronDizipal - Built from src/patronDizipal/
 * Generated: 2026-10-10T14:11:28.115Z
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

// src/patronDizipal/index.js
var patronDizipal_exports = {};
__export(patronDizipal_exports, {
  config: () => config,
  default: () => patronDizipal_default,
  getStreams: () => getStreams,
  sn: () => sn
});
module.exports = __toCommonJS(patronDizipal_exports);

// src/patronDizipal/http.js
var PROVIDER_NAME = "patronDizipal";
var USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var MOBILE_USER_AGENT = "okhttp/4.9.2";
var GITHUB_URL = "https://raw.githubusercontent.com/patr0nq/veriler/refs/heads/main/siteurl.txt";
var FALLBACK_DOMAINS = [
  "https://dizipal2138.com"
];
var CACHE_TTL = 3e5;
var ROOT = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {};
var _cachedDomain = null;
var _lastFetchTime = 0;
function W(name, message, type = "info", extra = null) {
  const prefix = `[${name}]`;
  const tail = extra !== null && extra !== void 0 ? extra : "";
  if (type === "error") {
    console.error(prefix, message, tail);
  } else if (type === "warn") {
    console.warn(prefix, message, tail);
  } else {
    console.log(prefix, message, tail);
  }
  try {
    const devUrl = ROOT.__NUVIO_DEV_LOG_URL__;
    if (typeof devUrl === "string" && devUrl.startsWith("http") && typeof fetch === "function") {
      fetch(devUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: name, level: type, message, details: extra })
      }).catch(() => {
      });
    }
  } catch (_) {
  }
}
var CookieJar = class {
  constructor(initialCookies) {
    this.cookies = {};
    if (initialCookies) {
      if (typeof initialCookies === "string") {
        this.parseHeader(initialCookies);
      } else if (typeof initialCookies === "object") {
        this.cookies = __spreadValues({}, initialCookies);
      }
    }
  }
  set(key, val) {
    if (key) {
      this.cookies[String(key).trim()] = String(val != null ? val : "").trim();
    }
  }
  get(key) {
    return this.cookies[String(key).trim()];
  }
  has(key) {
    return Object.prototype.hasOwnProperty.call(this.cookies, String(key).trim());
  }
  parseHeader(headerStr) {
    if (!headerStr)
      return;
    const parts = headerStr.split(";");
    for (const part of parts) {
      const eqIdx = part.indexOf("=");
      if (eqIdx > 0) {
        const k = part.substring(0, eqIdx).trim();
        const v = part.substring(eqIdx + 1).trim();
        if (k)
          this.cookies[k] = v;
      }
    }
  }
  update(responseOrHeaders) {
    if (!responseOrHeaders)
      return;
    try {
      let setCookies = [];
      const headers = responseOrHeaders.headers ? responseOrHeaders.headers : responseOrHeaders;
      if (typeof headers.getSetCookie === "function") {
        setCookies = headers.getSetCookie();
      } else if (typeof headers.get === "function") {
        const sc = headers.get("set-cookie");
        if (sc)
          setCookies = [sc];
      } else if (typeof headers === "object") {
        const sc = headers["set-cookie"] || headers["Set-Cookie"];
        if (Array.isArray(sc))
          setCookies = sc;
        else if (sc)
          setCookies = [String(sc)];
      }
      for (const item of setCookies) {
        if (!item)
          continue;
        const first = item.split(";")[0];
        const eqIdx = first.indexOf("=");
        if (eqIdx > 0) {
          const k = first.substring(0, eqIdx).trim();
          const v = first.substring(eqIdx + 1).trim();
          if (k)
            this.cookies[k] = v;
        }
      }
    } catch (_) {
    }
  }
  toHeader() {
    return Object.entries(this.cookies).map(([k, v]) => `${k}=${v}`).join("; ");
  }
  toRecord() {
    return __spreadValues({}, this.cookies);
  }
};
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
function fetchBaseUrl() {
  return __async(this, null, function* () {
    const now = Date.now();
    if (_cachedDomain && now - _lastFetchTime < CACHE_TTL) {
      return _cachedDomain;
    }
    try {
      const res = yield fetchWithTimeout(GITHUB_URL, {
        headers: { "User-Agent": USER_AGENT }
      }, 5e3);
      if (res.ok) {
        const text = yield res.text();
        const found = {};
        for (const line of text.split(/\r?\n/)) {
          const trimmed = line.trim();
          const colonIdx = trimmed.indexOf(":");
          if (colonIdx <= 0)
            continue;
          const key = trimmed.substring(0, colonIdx).trim();
          if (key !== "dizipalDiger" && key !== "dizipal")
            continue;
          let url2 = trimmed.substring(colonIdx + 1).trim();
          if (url2.endsWith("/"))
            url2 = url2.slice(0, -1);
          if (url2.startsWith("http"))
            found[key] = url2;
        }
        const url = found.dizipalDiger || found.dizipal;
        if (url) {
          _cachedDomain = url;
          _lastFetchTime = now;
          W(PROVIDER_NAME, "Aktif domain (GitHub): " + _cachedDomain, "info");
          return _cachedDomain;
        }
      }
    } catch (_) {
    }
    _cachedDomain = FALLBACK_DOMAINS[0];
    _lastFetchTime = now;
    W(PROVIDER_NAME, "Aktif domain (Varsay\u0131lan): " + _cachedDomain, "info");
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

// src/patronDizipal/tmdb.js
var FALLBACK_TMDB_KEYS = [
  "500330721680edb6d5f7f12ba7cd9023"
];
var imdbIdCache = /* @__PURE__ */ new Map();
var tmdbTitlesCache = /* @__PURE__ */ new Map();
function getAllTmdbKeys() {
  return FALLBACK_TMDB_KEYS;
}
function resolveImdbId(tmdbId, type) {
  return __async(this, null, function* () {
    var _a;
    if (!tmdbId)
      return null;
    let cleanId = String(tmdbId).trim().replace(/^tmdb:/i, "");
    if (cleanId.startsWith("tt")) {
      return cleanId;
    }
    const mediaType = type === "tv" || type === "series" ? "tv" : "movie";
    const cacheKey = `${mediaType}:${cleanId}`;
    if (imdbIdCache.has(cacheKey)) {
      return imdbIdCache.get(cacheKey);
    }
    const keys = getAllTmdbKeys();
    for (const key of keys) {
      try {
        const url = `https://api.themoviedb.org/3/${mediaType}/${cleanId}/external_ids?api_key=${key}`;
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
    try {
      const cinemetaType = mediaType === "tv" ? "series" : "movie";
      const url = `https://v3-cinemeta.strem.io/meta/${cinemetaType}/tmdb:${cleanId}.json`;
      const res = yield fetchWithTimeout(url, { headers: { "Accept": "application/json" } }, 4e3);
      if (res.ok) {
        const json = yield res.json();
        if ((_a = json == null ? void 0 : json.meta) == null ? void 0 : _a.imdb_id) {
          imdbIdCache.set(cacheKey, json.meta.imdb_id);
          return json.meta.imdb_id;
        }
      }
    } catch (e) {
      W(PROVIDER_NAME, "Cinemeta IMDb cozumu basarisiz: " + e.message, "warn");
    }
    return null;
  });
}
function getTmdbTitle(tmdbId, type) {
  return __async(this, null, function* () {
    if (!tmdbId)
      return null;
    let cleanId = String(tmdbId).trim().replace(/^tmdb:/i, "");
    const mediaType = type === "tv" || type === "series" ? "tv" : "movie";
    const cacheKey = `${mediaType}:${cleanId}`;
    if (tmdbTitlesCache.has(cacheKey)) {
      return tmdbTitlesCache.get(cacheKey);
    }
    const keys = getAllTmdbKeys();
    for (const key of keys) {
      try {
        const url = `https://api.themoviedb.org/3/${mediaType}/${cleanId}?api_key=${key}&language=tr-TR`;
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

// src/patronDizipal/extractor.js
var import_crypto_js = __toESM(require("crypto-js"));
var TR_AUDIO_WORDS = ["t\xFCrk\xE7e", "turkish", "turkce", "dublaj", "trdual", "trdub", "ses-tr", "audio-tr", "tr-dub"];
var TR_CODES = ["tr", "tur", "ota"];
var ORIG_AUDIO_WORDS = ["english", "ingilizce", "original", "orijinal", "audio-en"];
var ORIG_CODES = ["en", "eng", "und"];
function s0(str) {
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
function xe(str) {
  let bin = s0(str);
  let bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes;
}
function On(arr1, arr2) {
  let len = Math.min(arr1.length, arr2.length);
  let res = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    res[i] = arr1[i] ^ arr2[i];
  }
  return res;
}
function me(bytes) {
  let words = [];
  for (let i = 0; i < bytes.length; i += 4) {
    words.push(
      (bytes[i] || 0) << 24 | (bytes[i + 1] || 0) << 16 | (bytes[i + 2] || 0) << 8 | (bytes[i + 3] || 0)
    );
  }
  return import_crypto_js.default.lib.WordArray.create(words, bytes.length);
}
function cn(enc) {
  if (!enc || !enc.c || !enc.iv || !enc.k1 || !enc.k2) {
    return null;
  }
  try {
    let k1Bytes = xe(enc.k1);
    let k2Bytes = xe(enc.k2);
    let ivBytes = xe(enc.iv);
    let cBytes = xe(enc.c);
    let keyBytes = On(k1Bytes, k2Bytes);
    let keyWords = me(keyBytes);
    let ivWords = me(ivBytes);
    let cWords = me(cBytes);
    let decrypted = import_crypto_js.default.AES.decrypt(
      { ciphertext: cWords },
      keyWords,
      {
        iv: ivWords,
        mode: import_crypto_js.default.mode.CBC,
        padding: import_crypto_js.default.pad.Pkcs7
      }
    );
    return decrypted.toString(import_crypto_js.default.enc.Utf8) || null;
  } catch (e) {
    return null;
  }
}
function on(cfg) {
  if (!cfg)
    return "";
  let str = cfg;
  for (let i = 0; i < 3; i++) {
    let replaced = str.replace(/&amp;quot;/g, '"').replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&apos;/g, "'");
    if (replaced === str)
      break;
    str = replaced;
  }
  return str;
}
var LANG_DEFS = [
  ["tr", "tur", "Turkish", "T\xFCrk\xE7e", "st|sot|sotho|sesotho|guneysotho|guney sotho|southernsotho|southern sotho"],
  ["en", "eng", "English", "\u0130ngilizce"],
  ["de", "deu", "German", "Almanca", "ger"],
  ["fr", "fra", "French", "Frans\u0131zca", "fre"],
  ["es", "spa", "Spanish", "\u0130spanyolca"],
  ["pt", "por", "Portuguese", "Portekizce"],
  ["it", "ita", "Italian", "\u0130talyanca"],
  ["ru", "rus", "Russian", "Rus\xE7a"],
  ["ar", "ara", "Arabic", "Arap\xE7a"],
  ["ja", "jpn", "Japanese", "Japonca"],
  ["ko", "kor", "Korean", "Korece"],
  ["zh", "chi", "Chinese", "\xC7ince", "zho"],
  ["az", "aze", "Azerbaijani", "Azerbaycanca"],
  ["pl", "pol", "Polish", "Leh\xE7e"],
  ["nl", "nld", "Dutch", "Felemenk\xE7e", "dut|hollandaca"],
  ["el", "ell", "Greek", "Yunanca", "gre"],
  ["hu", "hun", "Hungarian", "Macarca"],
  ["ro", "ron", "Romanian", "Romence", "rum"],
  ["sv", "swe", "Swedish", "\u0130sve\xE7\xE7e"],
  ["no", "nor", "Norwegian", "Norve\xE7\xE7e"],
  ["da", "dan", "Danish", "Danca"],
  ["fi", "fin", "Finnish", "Fince"],
  ["cs", "ces", "Czech", "\xC7ek\xE7e", "cze"],
  ["uk", "ukr", "Ukrainian", "Ukraynaca"],
  ["bg", "bul", "Bulgarian", "Bulgarca"],
  ["hr", "hrv", "Croatian", "H\u0131rvat\xE7a"],
  ["sr", "srp", "Serbian", "S\u0131rp\xE7a"],
  ["sk", "slk", "Slovak", "Slovak\xE7a"],
  ["sl", "slv", "Slovenian", "Slovence"],
  ["hi", "hin", "Hindi", "Hint\xE7e"],
  ["th", "tha", "Thai", "Tayca"],
  ["vi", "vie", "Vietnamese", "Vietnamca"],
  ["id", "ind", "Indonesian", "Endonezce"],
  ["ms", "msa", "Malay", "Malayca", "may"],
  ["ca", "cat", "Catalan", "Katalanca"],
  ["he", "heb", "Hebrew", "\u0130branice"],
  ["fa", "fas", "Persian", "Fars\xE7a", "per"],
  ["ta", "tam", "Tamil", "Tamilce"],
  ["te", "tel", "Telugu", "Teluguca"],
  ["kn", "kan", "Kannada", "Kannadaca"],
  ["ml", "mal", "Malayalam", "Malayalamca"],
  ["tl", "tgl", "Filipino", "Filipince", "fil|tagalog"],
  ["ka", "kat", "Georgian", "G\xFCrc\xFCce", "geo"],
  ["sq", "sqi", "Albanian", "Arnavut\xE7a", "alb"],
  ["bs", "bos", "Bosnian", "Bo\u015Fnak\xE7a"],
  ["mk", "mkd", "Macedonian", "Makedonca", "mac"],
  ["kk", "kaz", "Kazakh", "Kazak\xE7a"],
  ["uz", "uzb", "Uzbek", "\xD6zbek\xE7e"],
  ["bn", "ben", "Bengali", "Bengalce"],
  ["mr", "mar", "Marathi", "Marathice"],
  ["gu", "guj", "Gujarati", "Gucerat\xE7a"],
  ["pa", "pan", "Punjabi", "Pencap\xE7a"],
  ["eu", "baq", "Basque", "Bask\xE7a", "eus"],
  ["gl", "glg", "Galician", "Galisyaca"],
  ["et", "est", "Estonian", "Estonca"],
  ["lv", "lav", "Latvian", "Letonca"],
  ["lt", "lit", "Lithuanian", "Litvanca"],
  ["is", "isl", "Icelandic", "\u0130zlandaca", "ice"]
];
function foldText(s) {
  return String(s || "").replace(/İ/g, "i").replace(/I/g, "i").replace(/ı/g, "i").toLowerCase().replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c").trim();
}
var LANG_INDEX = {};
for (const [code, iso3, language, name, extra = ""] of LANG_DEFS) {
  const info = { code, iso3, language, name };
  const keys = [code, iso3, language, name, ...extra.split("|")];
  for (const k of keys) {
    if (k)
      LANG_INDEX[foldText(k)] = info;
  }
}
var PT_BR = { code: "pt-BR", iso3: "por", language: "Portuguese (BR)", name: "Portekizce (Brezilya)" };
var PT_PT = { code: "pt-PT", iso3: "por", language: "Portuguese (EU)", name: "Portekizce (Avrupa)" };
var CA_EU = { code: "ca", iso3: "cat", language: "Catalan", name: "Katalanca (Avrupa)" };
["pt-br", "por-br", "portekizce brezilya"].forEach((k) => {
  LANG_INDEX[k] = PT_BR;
});
["pt-pt", "por-eu", "portekizce avrupa"].forEach((k) => {
  LANG_INDEX[k] = PT_PT;
});
["cat-eu", "katalanca avrupa"].forEach((k) => {
  LANG_INDEX[k] = CA_EU;
});
var LONG_LANG_KEYS = Object.keys(LANG_INDEX).filter((k) => k.length >= 4);
function C0(code1, code2, forced) {
  let c1 = foldText(code1);
  let c2 = foldText(code2);
  let isForced = !!forced || c1.includes("forced") || c2.includes("forced") || c1.includes("zorunlu") || c2.includes("zorunlu");
  let strip = (s) => s.replace(/\b(forced|zorunlu|narrative|captions|cc|sdh)\b/g, "").replace(/[-_()[\]]/g, " ").replace(/\s+/g, " ").trim();
  let s1 = strip(c1);
  let s2 = strip(c2);
  let formatName = (n) => {
    let cleanN = n.replace(/\s*\((?:forced|zorunlu)\)/gi, "").replace(/\s*-\s*(?:forced|zorunlu)/gi, "").trim();
    return isForced ? cleanN + " (Zorunlu)" : cleanN;
  };
  if (s1 === "st" || s1 === "sot" || s1.includes("sotho") || s2.includes("sotho") || s2.includes("sesotho")) {
    return { code: "tr", iso3: "tur", language: "Turkish", name: isForced ? "T\xFCrk\xE7e (Zorunlu)" : "T\xFCrk\xE7e" };
  }
  let match = LANG_INDEX[c1] || LANG_INDEX[c2] || LANG_INDEX[s1] || LANG_INDEX[s2];
  if (!match) {
    let words = (s2 + " " + s1).split(/\s+/).filter((w) => w.length >= 3);
    for (let w of words) {
      if (LANG_INDEX[w]) {
        match = LANG_INDEX[w];
        break;
      }
    }
  }
  if (!match) {
    for (let k of LONG_LANG_KEYS) {
      if (s2.includes(k) || s1.includes(k)) {
        match = LANG_INDEX[k];
        break;
      }
    }
  }
  if (match) {
    return { code: match.code, iso3: match.iso3, language: match.language, name: formatName(match.name) };
  }
  let rawName = (code2 || code1 || "Altyaz\u0131").trim().replace(/\s*\((?:forced|zorunlu)\)/gi, "").replace(/\s*-\s*(?:forced|zorunlu)/gi, "").trim();
  let capName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  let cc = c1 && c1.length === 2 ? c1 : c2 && c2.length === 2 ? c2 : "und";
  let iso = c1 && c1.length === 3 ? c1 : c2 && c2.length === 3 ? c2 : "und";
  return { code: cc, iso3: iso, language: capName, name: formatName(capName) };
}
function isTurkishSub(s) {
  let label = (s.label || s.name || s.title || "").toLowerCase();
  let lang = (s.lang || s.code || "").toLowerCase();
  let iso = (s.langCode || s.iso3 || "").toLowerCase();
  return lang === "tr" || lang === "tur" || lang === "st" || lang === "sot" || iso === "tur" || iso === "sot" || label.includes("t\xFCrk") || label.includes("turk") || label.includes("sotho") || (s.language || "").toLowerCase() === "turkish" || (s.language || "").toLowerCase().includes("sotho");
}
function isForcedSub(s) {
  let label = (s.label || s.name || "").toLowerCase();
  return label.includes("forced") || label.includes("zorunlu");
}
function Xe(subtitles) {
  return [...subtitles].sort((a, b) => {
    let aForced = isForcedSub(a);
    let bForced = isForcedSub(b);
    let aTr = isTurkishSub(a);
    let bTr = isTurkishSub(b);
    if (aTr && bTr) {
      if (!aForced && bForced)
        return -1;
      if (aForced && !bForced)
        return 1;
      return 0;
    }
    if (aTr && !bTr)
      return -1;
    if (!aTr && bTr)
      return 1;
    let aEn = a.lang === "en" || a.lang === "eng" || a.langCode === "eng" || (a.label || a.name || "").toLowerCase().includes("ing");
    let bEn = b.lang === "en" || b.lang === "eng" || b.langCode === "eng" || (b.label || b.name || "").toLowerCase().includes("ing");
    if (aEn && !bEn)
      return -1;
    if (!aEn && bEn)
      return 1;
    return (a.label || a.name || a.title || "").localeCompare(b.label || b.name || b.title || "", "tr");
  });
}
function We(listA, listB) {
  let out = [];
  let seen = /* @__PURE__ */ new Set();
  let all = [...listA || [], ...listB || []];
  for (let sub of all) {
    if (!sub || !sub.url)
      continue;
    let url = sub.url.trim();
    if (seen.has(url))
      continue;
    seen.add(url);
    let lang = C0(sub.lang, sub.label || sub.name || sub.language);
    let name = lang.name || sub.label || sub.name || "Altyaz\u0131";
    let item = {
      id: String(out.length),
      url,
      label: name,
      name,
      language: lang.language,
      lang: lang.code,
      langCode: lang.iso3,
      headers: sub.headers
    };
    if (sub.format)
      item.format = sub.format;
    if (sub.type)
      item.type = sub.type;
    out.push(item);
  }
  return out;
}
function Nn(html) {
  try {
    let fileMatch = html.match(/file\s*:\s*["'](https?:\/\/[^"']+\.m3u8[^"']*)["']/);
    if (fileMatch)
      return fileMatch[1];
    let kMatch = html.match(/k:\s*["']([^'"]+)["']/);
    let avMatch = html.match(/file\s*:\s*av\(["']([^'"]+)["']\)/) || html.match(/sources\s*:\s*\[\s*\{\s*file\s*:\s*av\(["']([^'"]+)["']\)/);
    if (!kMatch || !avMatch)
      return null;
    let kDec = s0(kMatch[1]);
    let avRev = avMatch[1].split("").reverse().join("");
    let avDec = s0(avRev);
    let out = "";
    for (let i = 0; i < avDec.length; i++) {
      let kChar = kDec[i % kDec.length];
      out += String.fromCharCode(avDec.charCodeAt(i) - (kChar.charCodeAt(0) % 5 + 1));
    }
    let finalDec = s0(out);
    if (finalDec && (finalDec.startsWith("http://") || finalDec.startsWith("https://"))) {
      return finalDec;
    }
  } catch (e) {
  }
  return null;
}
function Mn(html, embedUrl) {
  let match = html.match(/var\s+k\s*=\s*\[([\d,\s]+)\]\s*,\s*e\s*=\s*\[([\s\S]*?)\];/);
  if (match) {
    try {
      let origin = new URL(embedUrl).origin;
      let kArr = match[1].split(",").map((x) => parseInt(x.trim(), 10));
      let eArr = (match[2].match(/["']([^"']+)["']/g) || []).map((x) => x.replace(/["']/g, ""));
      let hlsUrl = null;
      let subtitles = [];
      for (let encItem of eArr) {
        let dec = s0(encItem);
        let out = "";
        for (let i = 0; i < dec.length; i++) {
          out += String.fromCharCode(dec.charCodeAt(i) ^ kArr[i % kArr.length]);
        }
        if (out.includes(".m3u8") && !hlsUrl) {
          hlsUrl = out;
        } else if (out.includes(".vtt") || out.includes(".srt")) {
          let isTr = out.includes("_tur") || out.includes("turk") || out.includes("_tr");
          let code = isTr ? "tr" : "en";
          let label = isTr ? "T\xFCrk\xE7e" : "English";
          subtitles.push({
            id: String(subtitles.length),
            url: out,
            label,
            name: label,
            title: label,
            language: isTr ? "Turkish" : "English",
            lang: code,
            langCode: isTr ? "tur" : "eng",
            headers: {
              Referer: origin + "/",
              Origin: origin,
              "User-Agent": USER_AGENT,
              Accept: "*/*"
            }
          });
        }
      }
      if (hlsUrl) {
        return { hlsUrl, subtitles };
      }
    } catch (e) {
    }
  }
  try {
    let fMatch = html.match(/file\s*:\s*([a-zA-Z0-9_$]+)\s*\(\s*["']([^"']+)["']\s*\)/);
    if (fMatch) {
      let funcName = fMatch[1];
      let encParam = fMatch[2];
      let kRegex = new RegExp("(?:function\\s+" + funcName + "|(?:var|let|const)?\\s*" + funcName + `\\s*=\\s*function)[^{]*\\{[^}]*?k\\s*=\\s*["']([^"']+)["']`);
      let kMatch = html.match(kRegex);
      if (kMatch) {
        let kStr = kMatch[1];
        let dec = s0(encParam);
        let out = "";
        for (let i = 0; i < dec.length; i++) {
          out += String.fromCharCode(dec.charCodeAt(i) ^ kStr.charCodeAt(i % kStr.length));
        }
        if (out.includes(".m3u8")) {
          return { hlsUrl: out, subtitles: [] };
        }
      }
    }
  } catch (e) {
  }
  return { hlsUrl: null, subtitles: [] };
}
function Wn(html, embedUrl) {
  let subs = [];
  let origin = new URL(embedUrl).origin;
  let seen = /* @__PURE__ */ new Set();
  let headers = () => ({
    Referer: origin + "/",
    Origin: origin,
    "User-Agent": USER_AGENT,
    Accept: "*/*"
  });
  try {
    let tracksMatch = html.match(/(?:tracks|baseTracks)\s*[:=]\s*\[([\s\S]*?)\]/i);
    if (tracksMatch) {
      let items = tracksMatch[1].match(/\{[\s\S]*?\}/g) || [];
      for (let item of items) {
        if (item.toLowerCase().includes("thumbnail"))
          continue;
        let fileM = item.match(/file\s*:\s*["']([^"']+)["']/i);
        let labelM = item.match(/label\s*:\s*["']([^"']+)["']/i);
        if (fileM) {
          let file = fileM[1].replace(/\\\//g, "/");
          if (file.startsWith("/"))
            file = origin + file;
          if (seen.has(file))
            continue;
          seen.add(file);
          let label = labelM ? labelM[1].trim() : "";
          let isForced = label.toLowerCase().includes("forced") || file.toLowerCase().includes("forced");
          let langHint = "";
          let codeM = file.match(/_([a-z]{2,3})(?:\.vtt|\.srt)/i);
          if (codeM)
            langHint = codeM[1].toLowerCase();
          let langObj = C0(langHint, label, isForced);
          subs.push({
            id: String(subs.length),
            url: file,
            name: langObj.name,
            label: langObj.name,
            title: langObj.name,
            language: langObj.language,
            lang: langObj.code,
            langCode: langObj.iso3,
            format: "vtt",
            type: "vtt",
            headers: headers()
          });
        }
      }
    }
    let pjsMatch = html.match(/playerjsSubtitle\s*=\s*["']([^"']+)["']/i);
    if (pjsMatch && subs.length === 0) {
      pjsMatch[1].split(",").forEach((entry) => {
        let m = entry.match(/(?:\[(.*?)\])?(https?:\/\/[^\s,]+)/);
        if (m) {
          let label = (m[1] || "").trim();
          let url = m[2];
          if (seen.has(url))
            return;
          seen.add(url);
          let isForced = label.toLowerCase().includes("forced") || url.toLowerCase().includes("forced");
          let langHint = "";
          let codeM = url.match(/_([a-z]{2,3})(?:\.vtt|\.srt)/i);
          if (codeM)
            langHint = codeM[1].toLowerCase();
          let langObj = C0(langHint, label, isForced);
          subs.push({
            id: String(subs.length),
            url,
            name: langObj.name,
            label: langObj.name,
            title: langObj.name,
            language: langObj.language,
            lang: langObj.code,
            langCode: langObj.iso3,
            format: "vtt",
            type: "vtt",
            headers: headers()
          });
        }
      });
    }
  } catch (e) {
  }
  return Xe(subs);
}
function wordTokens(s) {
  return s.split(/[^a-z0-9çğıöşü]+/i).filter(Boolean);
}
function Ke(m3u8Text, m3u8Url) {
  let hasTurkishAudio = false;
  let hasOriginalAudio = false;
  let embeddedSubtitles = [];
  let detectedQuality;
  let detectedCodec;
  let detectedAudio;
  let u = (m3u8Url || "").toLowerCase();
  let hasWord = (w) => new RegExp("(^|[^a-z0-9])" + w + "([^a-z0-9]|$)").test(u);
  if (u.includes("trdual") || u.includes("dual") || u.includes("trdub") || u.includes("dublaj")) {
    hasTurkishAudio = true;
    hasOriginalAudio = true;
  } else if (u.includes("ses-tr") || u.includes("turkcedublaj") || u.includes("turkce-dublaj")) {
    hasTurkishAudio = true;
  }
  if (u.includes("2160p") || u.includes("4k") || u.includes("uhd") || u.includes("-2160.")) {
    detectedQuality = "4K";
  } else if (u.includes("1080p") || u.includes("1920x1080") || u.includes("fhd") || u.includes("-1080.")) {
    detectedQuality = "1080p";
  } else if (u.includes("720p") || u.includes("1280x720") || hasWord("hd") || u.includes("-720.")) {
    detectedQuality = "720p";
  } else if (u.includes("480p") || u.includes("854x480") || hasWord("sd") || u.includes("-480.")) {
    detectedQuality = "480p";
  } else if (u.includes("360p") || u.includes("640x360") || u.includes("-360.")) {
    detectedQuality = "360p";
  }
  if (u.includes("hevc") || u.includes("h265") || u.includes("x265")) {
    detectedCodec = "HEVC";
  } else if (u.includes("av1")) {
    detectedCodec = "AV1";
  } else if (u.includes("h264") || u.includes("x264") || u.includes("avc")) {
    detectedCodec = "H.264";
  }
  if (u.includes("5.1") || u.includes("eac3") || u.includes("ac3") || u.includes("ddp")) {
    detectedAudio = "Dolby 5.1";
  } else if (u.includes("7.1") || u.includes("atmos")) {
    detectedAudio = "Dolby Atmos 7.1";
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
        let nTokens = wordTokens(nStr);
        let gTokens = wordTokens(gStr);
        let isTr = TR_CODES.includes(lStr) || TR_CODES.some((c) => nTokens.includes(c) || gTokens.includes(c)) || TR_AUDIO_WORDS.some((x) => nStr.includes(x) || gStr.includes(x)) || nStr.includes("t\xFCrk") || nStr.includes("turk") || gStr.includes("dual");
        let isOrig = ORIG_CODES.includes(lStr) || ORIG_CODES.some((c) => nTokens.includes(c) || gTokens.includes(c)) || ORIG_AUDIO_WORDS.some((x) => nStr.includes(x) || gStr.includes(x)) || nStr.includes("orig") || nStr.includes("ing") || nStr.includes("eng");
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
          let lowName = subName.toLowerCase();
          if (subLang === "st" || subLang === "sot" || lowName.includes("sotho") || lowName.includes("sesotho") || subUri.toLowerCase().includes("sub_st")) {
            subLang = "tr";
            subName = "T\xFCrk\xE7e";
          } else if (!subLang) {
            subLang = lowName.includes("t\xFCrk") ? "tr" : "und";
          }
          let lObj = C0(subLang, subName);
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
          let w = parseInt(resM[1], 10);
          let h = parseInt(resM[2], 10);
          let minSide = Math.min(w, h);
          let maxSide = Math.max(w, h);
          let res = minSide >= 2100 || maxSide >= 3800 ? 2160 : minSide >= 1400 || maxSide >= 2500 ? 1440 : minSide >= 1e3 || maxSide >= 1900 ? 1080 : minSide >= 700 || maxSide >= 1200 ? 720 : minSide >= 450 ? 480 : minSide;
          if (res > maxRes)
            maxRes = res;
        } else {
          let nameM = trLine.match(/NAME=["']?([^"',\s]+)["']?/i);
          if (nameM) {
            let n = nameM[1].toLowerCase();
            if (n.includes("2160") || n.includes("4k")) {
              if (maxRes < 2160)
                maxRes = 2160;
            } else if (n.includes("1440") || n.includes("2k")) {
              if (maxRes < 1440)
                maxRes = 1440;
            } else if (n.includes("1080")) {
              if (maxRes < 1080)
                maxRes = 1080;
            } else if (n.includes("720") && maxRes < 720) {
              maxRes = 720;
            }
          }
        }
      }
    }
    if (maxRes >= 2160)
      detectedQuality = "4K";
    else if (maxRes >= 1440)
      detectedQuality = "2K";
    else if (maxRes >= 1080)
      detectedQuality = "1080p";
    else if (maxRes >= 720)
      detectedQuality = "720p";
    else if (maxRes >= 480)
      detectedQuality = "480p";
  }
  let isDual = hasTurkishAudio && hasOriginalAudio || u.includes("dual") || u.includes("trdual");
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
function In(info) {
  let { hasTurkishAudio, hasOriginalAudio, isDual, hasTurkishSubtitles, isYerli, siteHint, defaultTitle } = info;
  if (isYerli || (siteHint == null ? void 0 : siteHint.isYerli)) {
    return "Yerli";
  }
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
  return defaultTitle || (hasTurkishAudio ? "Dublaj" : "Orijinal");
}
function Ge(options) {
  let { m3u8Text, m3u8Url, externalSubtitles, siteHint, defaultTitle } = options;
  let inspection = Ke(m3u8Text, m3u8Url);
  let allSubs = We(externalSubtitles, inspection.embeddedSubtitles);
  let hasSubtitles = allSubs.length > 0 || !!(siteHint == null ? void 0 : siteHint.isAltyazi);
  let hasTurkishSubtitles = allSubs.some(isTurkishSub);
  let hasTurkishAudio = inspection.hasTurkishAudio || !!(siteHint == null ? void 0 : siteHint.isDublaj);
  let hasOriginalAudio = inspection.hasOriginalAudio;
  let isDual = inspection.isDual || hasTurkishAudio && (hasTurkishSubtitles || hasOriginalAudio);
  let title = In({
    hasTurkishAudio,
    hasOriginalAudio,
    isDual,
    hasSubtitles,
    hasTurkishSubtitles,
    isYerli: siteHint == null ? void 0 : siteHint.isYerli,
    siteHint,
    defaultTitle
  });
  return {
    hasTurkishAudio,
    hasOriginalAudio,
    isDual,
    hasSubtitles,
    hasTurkishSubtitles,
    isYerli: siteHint == null ? void 0 : siteHint.isYerli,
    languageTitle: title,
    // Harici + master playlist içindeki gömülü altyazılar
    subtitles: allSubs,
    detectedQuality: inspection.detectedQuality,
    detectedCodec: inspection.detectedCodec,
    detectedAudio: inspection.detectedAudio
  };
}
function $e(streamData) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  let urlInfo = streamData.url ? Ke(void 0, streamData.url) : {};
  let q = streamData.quality || ((_a = streamData.inspection) == null ? void 0 : _a.detectedQuality) || urlInfo.detectedQuality || "1080p";
  if (q.includes("\u2022"))
    q = q.split("\u2022")[0].trim();
  if (!q.includes("p") && !q.includes("K") && !q.includes("k") && q !== "HD" && q !== "FHD" && q !== "SD") {
    q = q + "p";
  }
  let subs = streamData.subtitles || ((_b = streamData.inspection) == null ? void 0 : _b.subtitles);
  let hasTrSub = !!((_c = streamData.inspection) == null ? void 0 : _c.hasTurkishSubtitles) || !!(subs == null ? void 0 : subs.some(isTurkishSub));
  let rawTitle = (streamData.languageTitle || ((_d = streamData.inspection) == null ? void 0 : _d.languageTitle) || "").toLowerCase().trim();
  let hasTrAudio = rawTitle.includes("dub") || rawTitle.includes("ses") || rawTitle.includes("dual") || !!urlInfo.hasTurkishAudio || !!((_e = streamData.inspection) == null ? void 0 : _e.hasTurkishAudio);
  let isDual = rawTitle.includes("dual") || rawTitle.includes("dub") && (rawTitle.includes("alt") || rawTitle.includes("sub")) || hasTrAudio && hasTrSub;
  let title = "Orijinal";
  if (rawTitle.includes("yerli") || ((_f = streamData.inspection) == null ? void 0 : _f.isYerli)) {
    title = "Yerli";
  } else if (isDual) {
    title = "Dublaj / Altyaz\u0131l\u0131";
  } else if (hasTrAudio) {
    title = "Dublaj";
  } else if (hasTrSub || rawTitle.includes("alt") || rawTitle.includes("sub")) {
    title = "Altyaz\u0131l\u0131";
  }
  let url = streamData.url;
  let isM3u8 = streamData.format === "m3u8" || url.includes(".m3u8") || url.includes("/master.") || url.includes("/hls/") || url.includes("/txt/");
  let format = streamData.format || (isM3u8 ? "m3u8" : url.includes(".mp4") ? "mp4" : "m3u8");
  let formatLabel = format === "m3u8" ? "HLS" : format.toUpperCase();
  let parts = [q];
  let codec = streamData.codec || ((_g = streamData.inspection) == null ? void 0 : _g.detectedCodec) || urlInfo.detectedCodec;
  if (codec && codec !== "H.264")
    parts.push(codec);
  parts.push(formatLabel);
  if (streamData.bitrate)
    parts.push(streamData.bitrate);
  let audio = streamData.audio || ((_h = streamData.inspection) == null ? void 0 : _h.detectedAudio) || urlInfo.detectedAudio;
  if (audio && audio !== "AAC 2.0")
    parts.push(audio);
  let details = streamData.details || parts.join(" \u2022 ");
  let result = {
    name: streamData.name,
    title,
    description: title + "\n" + details,
    url,
    quality: q + " \u2022 " + title,
    format
  };
  if (streamData.headers && Object.keys(streamData.headers).length > 0) {
    result.headers = streamData.headers;
  }
  if (subs && subs.length > 0) {
    result.subtitles = subs;
  }
  return result;
}
function resolveDizipalPlayer(contentLink, baseUrl, jar) {
  return __async(this, null, function* () {
    var _a, _b;
    try {
      W(PROVIDER_NAME, "[Ad\u0131m 3/4] Oynat\u0131c\u0131 oturumu a\xE7\u0131l\u0131yor...");
      let cookieJar = jar || new CookieJar();
      let pageRes = yield fetchWithTimeout(contentLink, {
        headers: {
          "User-Agent": MOBILE_USER_AGENT,
          Referer: baseUrl + "/",
          Cookie: cookieJar.toHeader()
        }
      }, 6e3);
      cookieJar.update(pageRes);
      if (!pageRes.ok) {
        W(PROVIDER_NAME, "Sayfa y\xFCklenemedi: HTTP " + pageRes.status, "warn");
        return [];
      }
      let pageHtml = yield pageRes.text();
      let cfgMatch = pageHtml.match(/data-cfg="([^"]+)"/);
      let embedUrl = null;
      if (cfgMatch) {
        let unescapedCfg = on(cfgMatch[1]);
        if (!cookieJar.has("_ct")) {
          try {
            let tokenRes = yield fetchWithTimeout(baseUrl + "/ajax-token", {
              headers: {
                "User-Agent": MOBILE_USER_AGENT,
                Referer: contentLink,
                Cookie: cookieJar.toHeader()
              }
            }, 4e3);
            cookieJar.update(tokenRes);
            if (tokenRes.ok) {
              let tokenJson = yield tokenRes.json();
              if ((tokenJson == null ? void 0 : tokenJson.t) && !cookieJar.has("_ct")) {
                cookieJar.set("_ct", tokenJson.t);
              }
            }
          } catch (_) {
          }
        }
        let ajaxEndpoints = [baseUrl + "/ajax", baseUrl + "/ajax-player-config"];
        for (let ep of ajaxEndpoints) {
          try {
            let ajaxRes = yield fetchWithTimeout(ep, {
              method: "POST",
              headers: {
                "User-Agent": MOBILE_USER_AGENT,
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
                Referer: contentLink,
                Origin: baseUrl,
                Cookie: cookieJar.toHeader()
              },
              body: "cfg=" + encodeURIComponent(unescapedCfg)
            }, 5e3);
            cookieJar.update(ajaxRes);
            if (ajaxRes.ok) {
              let ajaxJson = yield ajaxRes.json();
              if ((_a = ajaxJson == null ? void 0 : ajaxJson.config) == null ? void 0 : _a.v) {
                embedUrl = ajaxJson.config.v;
                break;
              } else if (ajaxJson == null ? void 0 : ajaxJson.enc) {
                let decrypted = cn(ajaxJson.enc);
                if (decrypted) {
                  embedUrl = decrypted;
                  break;
                }
              }
            }
          } catch (_) {
          }
        }
      }
      if (!embedUrl) {
        let iframeMatch = pageHtml.match(/<iframe\s+[^>]*src="([^"]+)"/i);
        if (iframeMatch) {
          embedUrl = iframeMatch[1];
        }
      }
      if (embedUrl && embedUrl.startsWith("//")) {
        embedUrl = "https:" + embedUrl;
      }
      if (!embedUrl) {
        W(PROVIDER_NAME, "Video embed linki \xE7\xF6z\xFClemedi.", "warn");
        return [];
      }
      W(PROVIDER_NAME, "Embed oynat\u0131c\u0131 bulundu: " + embedUrl, "info");
      let embedOrigin = new URL(embedUrl).origin;
      let embedRes = yield fetchWithTimeout(embedUrl, {
        headers: {
          "User-Agent": MOBILE_USER_AGENT,
          Referer: contentLink
        }
      }, 5e3);
      if (!embedRes.ok) {
        W(PROVIDER_NAME, "Embed sayfas\u0131 a\xE7\u0131lamad\u0131: HTTP " + embedRes.status, "warn");
        return [];
      }
      let embedHtml = yield embedRes.text();
      let subtitles = Wn(embedHtml, embedUrl);
      let hlsUrl = null;
      let embedHash = (_b = embedUrl.split("/").pop()) == null ? void 0 : _b.split("?")[0];
      if (embedHash && embedUrl.includes("imagestoo.com")) {
        try {
          let imgApiUrl = "https://imagestoo.com/player/index.php?data=" + embedHash + "&do=getVideo";
          let imgRes = yield fetchWithTimeout(imgApiUrl, {
            method: "POST",
            headers: {
              "User-Agent": MOBILE_USER_AGENT,
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
              "X-Requested-With": "XMLHttpRequest",
              Referer: embedUrl,
              Origin: embedOrigin
            },
            body: "hash=" + embedHash + "&r=" + encodeURIComponent(contentLink)
          }, 5e3);
          if (imgRes.ok) {
            let imgJson = yield imgRes.json();
            if (imgJson == null ? void 0 : imgJson.securedLink) {
              hlsUrl = imgJson.securedLink;
            } else if (imgJson == null ? void 0 : imgJson.videoSource) {
              hlsUrl = imgJson.videoSource.replace("/master.txt", "/master.m3u8");
            }
          }
        } catch (_) {
        }
      }
      if (!hlsUrl) {
        let mnRes = Mn(embedHtml, embedUrl);
        if (mnRes.hlsUrl) {
          hlsUrl = mnRes.hlsUrl;
          if (mnRes.subtitles.length > 0) {
            subtitles.push(...mnRes.subtitles);
          }
        }
      }
      if (!hlsUrl) {
        hlsUrl = Nn(embedHtml);
      }
      if (!hlsUrl) {
        let mMatch = embedHtml.match(/file\s*:\s*["'](https?:\/\/[^"']+\.m3u8[^"']*)["']/);
        if (mMatch)
          hlsUrl = mMatch[1];
      }
      if (!hlsUrl) {
        let mMatch2 = embedHtml.match(/["'](https?:\/\/[^"'\s<>]+\.m3u8[^"'\s<>]*)["']/);
        if (mMatch2)
          hlsUrl = mMatch2[1];
      }
      if (!hlsUrl) {
        W(PROVIDER_NAME, "Video ak\u0131\u015F adresi \xE7\xF6z\xFClemedi.", "warn");
        return [];
      }
      let m3u8Text = "";
      try {
        let m3u8Res = yield fetchWithTimeout(hlsUrl, {
          headers: {
            Referer: embedOrigin + "/",
            Origin: embedOrigin,
            "User-Agent": MOBILE_USER_AGENT
          }
        }, 2500);
        if (m3u8Res.ok) {
          m3u8Text = yield m3u8Res.text();
        }
      } catch (_) {
      }
      let inspection = Ge({
        m3u8Text,
        m3u8Url: hlsUrl,
        externalSubtitles: subtitles
      });
      let streamObj = $e({
        name: "Dizipal",
        url: hlsUrl,
        inspection,
        subtitles: inspection.subtitles,
        format: "m3u8",
        headers: {
          Referer: embedOrigin + "/",
          Origin: embedOrigin,
          "User-Agent": MOBILE_USER_AGENT
        }
      });
      W(PROVIDER_NAME, "Altyaz\u0131lar: " + (inspection.subtitles.map((x) => `${x.lang}:${x.label}`).join(", ") || "yok"), "info");
      W(PROVIDER_NAME, "[Ad\u0131m 4/4] TAMAMLANDI: Ak\u0131\u015F haz\u0131rland\u0131 -> " + streamObj.quality, "success", {
        altyaz\u0131lar: inspection.subtitles.length,
        dil: inspection.languageTitle
      });
      return [streamObj];
    } catch (e) {
      W(PROVIDER_NAME, "Oynat\u0131c\u0131 \xE7\xF6z\xFCmlenirken hata: " + e.message, "error");
      return [];
    }
  });
}

// src/patronDizipal/index.js
var config = {
  id: "patron-dizipal",
  name: "patronDizipal",
  version: "1.1.0",
  type: "provider",
  author: "patr0n",
  description: "Dizipal tabanl\u0131 film ve dizi sa\u011Flay\u0131c\u0131s\u0131."
};
function normalizeInputs(idObj, mediaType, seasonNum, episodeNum) {
  var _a, _b, _c, _d, _e;
  let rawId = idObj;
  let rawType = mediaType;
  let rawSeason = seasonNum;
  let rawEpisode = episodeNum;
  if (typeof idObj === "object" && idObj !== null && !Array.isArray(idObj)) {
    rawId = idObj.id || idObj.tmdbId || idObj.rawTmdbId || idObj.imdbId || "";
    rawType = idObj.type || idObj.mediaType || idObj.rawMediaType;
    rawSeason = (_b = (_a = idObj.season) != null ? _a : idObj.seasonNum) != null ? _b : idObj.rawSeasonNum;
    rawEpisode = (_d = (_c = idObj.episode) != null ? _c : idObj.episodeNum) != null ? _d : idObj.rawEpisodeNum;
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
    isTv,
    season: isNaN(sNum) ? 1 : sNum,
    episode: isNaN(eNum) ? 1 : eNum
  };
}
function sn(seriesHtml, season, episode) {
  if (!seriesHtml)
    return null;
  let linkRegex = /<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let m;
  let links = [];
  while ((m = linkRegex.exec(seriesHtml)) !== null) {
    links.push({
      href: m[1],
      text: m[2].replace(/<[^>]*>/g, "").trim()
    });
  }
  let textMatches = [
    `${season}. Sezon ${episode}. B\xF6l\xFCm`,
    `S${season} E${episode}`,
    `${season}.Sezon ${episode}.B\xF6l\xFCm`,
    `${season}. Sezon ${episode}.B\xF6l\xFCm`,
    `${season}.Sezon ${episode}. B\xF6l\xFCm`
  ];
  for (let l of links) {
    if (textMatches.some((t) => l.text.includes(t))) {
      return l.href;
    }
  }
  let urlPatterns = [
    `-${season}x${episode}`,
    `/${season}x${episode}`,
    `-${season}-sezon-${episode}-bolum`,
    `/sezon-${season}/bolum-${episode}`
  ];
  for (let l of links) {
    let h = l.href.toLowerCase();
    if (urlPatterns.some((p) => h.includes(p))) {
      return l.href;
    }
  }
  for (let l of links) {
    let match = l.text.match(/(\d+)\.\s*Sezon\s*(\d+)\.\s*Bölüm/i);
    if (match) {
      let s = parseInt(match[1], 10);
      let e = parseInt(match[2], 10);
      if (s === season && e === episode) {
        return l.href;
      }
    }
  }
  return null;
}
function getStreams(idObj, mediaType, seasonNum, episodeNum) {
  return __async(this, null, function* () {
    let startTime = Date.now();
    try {
      const norm = normalizeInputs(idObj, mediaType, seasonNum, episodeNum);
      W(PROVIDER_NAME, `Tarama Ba\u015Flat\u0131ld\u0131 -> TMDB: ${norm.tmdbId}, T\xFCr: ${norm.mediaType}, Sezon: ${norm.season}, B\xF6l\xFCm: ${norm.episode}`);
      if (!norm.tmdbId)
        return [];
      W(PROVIDER_NAME, `[Ad\u0131m 1/4] IMDb ID \xE7\xF6z\xFCmleniyor (${norm.tmdbId})...`);
      let imdbId = yield resolveImdbId(norm.tmdbId, norm.mediaType);
      if (!imdbId && norm.tmdbId.startsWith("tt")) {
        imdbId = norm.tmdbId;
      }
      const baseUrl = yield fetchBaseUrl();
      if (!baseUrl) {
        W(PROVIDER_NAME, "Sa\u011Flay\u0131c\u0131 adresi al\u0131namad\u0131.", "warn");
        return [];
      }
      let cookieJar = new CookieJar();
      try {
        let initRes = yield fetchWithTimeout(baseUrl + "/", {
          headers: { "User-Agent": MOBILE_USER_AGENT }
        }, 5e3);
        cookieJar.update(initRes);
      } catch (_) {
      }
      let searchResults = [];
      let searchQueries = [];
      if (imdbId) {
        searchQueries.push(imdbId);
        if (imdbId.startsWith("tt")) {
          searchQueries.push(imdbId.replace(/^tt/, ""));
        }
      }
      for (let q of searchQueries) {
        W(PROVIDER_NAME, `[Ad\u0131m 2/4] Kaynakta kesin IMDb aramas\u0131 yap\u0131l\u0131yor (${q})...`);
        let searchUrl = `${baseUrl}/ajax-search?q=${encodeURIComponent(q)}`;
        try {
          let res = yield fetchWithTimeout(searchUrl, {
            headers: {
              "User-Agent": MOBILE_USER_AGENT,
              Referer: baseUrl + "/",
              Accept: "application/json, text/javascript, */*; q=0.01",
              "X-Requested-With": "XMLHttpRequest",
              Cookie: cookieJar.toHeader()
            }
          }, 5e3);
          cookieJar.update(res);
          if (res.ok) {
            let json = yield res.json();
            if (Array.isArray(json == null ? void 0 : json.results) && json.results.length > 0) {
              searchResults = json.results;
              break;
            }
          }
        } catch (_) {
        }
      }
      if (searchResults.length === 0) {
        let title = yield getTmdbTitle(norm.tmdbId, norm.mediaType);
        if (title) {
          W(PROVIDER_NAME, `Ba\u015Fl\u0131k ile arama deneniyor: "${title}"...`);
          let searchUrl = `${baseUrl}/ajax-search?q=${encodeURIComponent(title)}`;
          try {
            let res = yield fetchWithTimeout(searchUrl, {
              headers: {
                "User-Agent": MOBILE_USER_AGENT,
                Referer: baseUrl + "/",
                Accept: "application/json, text/javascript, */*; q=0.01",
                "X-Requested-With": "XMLHttpRequest",
                Cookie: cookieJar.toHeader()
              }
            }, 5e3);
            cookieJar.update(res);
            if (res.ok) {
              let json = yield res.json();
              if (Array.isArray(json == null ? void 0 : json.results) && json.results.length > 0) {
                searchResults = json.results;
              }
            }
          } catch (_) {
          }
        }
      }
      if (searchResults.length === 0) {
        W(PROVIDER_NAME, "E\u015Fle\u015Fen i\xE7erik bulunamad\u0131.", "warn");
        return [];
      }
      let contentLink = "";
      for (let item of searchResults) {
        let u = item.url;
        if (u) {
          if (norm.isTv && (u.includes("/dizi/") || u.includes("/series/"))) {
            contentLink = u;
            break;
          } else if (!norm.isTv && (u.includes("/film/") || u.includes("/movies/"))) {
            contentLink = u;
            break;
          }
        }
      }
      if (!contentLink && searchResults.length > 0) {
        contentLink = searchResults[0].url || "";
      }
      if (!contentLink) {
        W(PROVIDER_NAME, "Ge\xE7erli bir i\xE7erik linki bulunamad\u0131.", "warn");
        return [];
      }
      contentLink = fixUrl(contentLink, baseUrl);
      W(PROVIDER_NAME, "[Do\u011Frulama] \u0130\xE7erik bulundu: " + contentLink, "info");
      if (norm.isTv) {
        W(PROVIDER_NAME, `Dizi b\xF6l\xFCm\xFC aran\u0131yor (S${norm.season}E${norm.episode})...`);
        let seriesRes = yield fetchWithTimeout(contentLink, {
          headers: {
            "User-Agent": MOBILE_USER_AGENT,
            Referer: baseUrl + "/",
            Cookie: cookieJar.toHeader()
          }
        }, 6e3);
        cookieJar.update(seriesRes);
        if (!seriesRes.ok) {
          W(PROVIDER_NAME, "Dizi sayfas\u0131 y\xFCklenemedi: HTTP " + seriesRes.status, "warn");
          return [];
        }
        let seriesHtml = yield seriesRes.text();
        let episodeHref = sn(seriesHtml, norm.season, norm.episode);
        if (episodeHref) {
          contentLink = fixUrl(episodeHref, baseUrl);
          W(PROVIDER_NAME, `[Do\u011Frulama] B\xF6l\xFCm bulundu (S${norm.season}E${norm.episode}) -> ${contentLink}`, "info");
        } else {
          W(PROVIDER_NAME, `Sezon ${norm.season} B\xF6l\xFCm ${norm.episode} bulunamad\u0131.`, "warn");
          return [];
        }
      }
      return yield resolveDizipalPlayer(contentLink, baseUrl, cookieJar);
    } catch (err) {
      W(PROVIDER_NAME, "Kritik Hata: " + err.message, "error");
      return [];
    }
  });
}
var patronDizipal_default = {
  config,
  getStreams
};
