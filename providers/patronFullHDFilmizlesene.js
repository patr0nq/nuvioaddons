/**
 * patronFullHDFilmizlesene - Built from src/patronFullHDFilmizlesene/
 * Generated: 2026-08-23T17:02:42.753Z
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

// src/patronFullHDFilmizlesene/index.js
var patronFullHDFilmizlesene_exports = {};
__export(patronFullHDFilmizlesene_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patronFullHDFilmizlesene_exports);

// src/patronFullHDFilmizlesene/http.js
var MAIN_URL = "https://www.fullhdfilmizlesene.now";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Referer": `${MAIN_URL}/`
};
function fixUrl(url, baseUrl = MAIN_URL) {
  if (!url)
    return "";
  if (url.startsWith("http://") || url.startsWith("https://"))
    return url;
  if (url.startsWith("//"))
    return `https:${url}`;
  try {
    return new URL(url, baseUrl).toString();
  } catch (_) {
    return url;
  }
}
function fetchWithResponse(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const response = yield fetch(url, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues(__spreadValues({}, HEADERS), options.headers || {})
    }));
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} -> ${url}`);
    }
    return response;
  });
}
function fetchText(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const res = yield fetchWithResponse(url, options);
    return yield res.text();
  });
}

// src/patronFullHDFilmizlesene/extractor.js
var PROVIDER_TAG = "[FullHDFilmizlesene]";
function rot13(str) {
  return str.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
  });
}
function atobDecode(str) {
  try {
    if (typeof atob === "function")
      return atob(str);
    return Buffer.from(str, "base64").toString("utf-8");
  } catch (e) {
    return str;
  }
}
function getVideoLinks(html) {
  const scriptMatch = html.match(/scx\s*=\s*(\{[\s\S]*?\});/);
  if (!scriptMatch)
    return [];
  let scxData;
  try {
    scxData = JSON.parse(scriptMatch[1]);
  } catch (e) {
    console.warn(`${PROVIDER_TAG} scx JSON parse hatas\u0131: ${e.message}`);
    return [];
  }
  const keys = ["atom", "advid", "advidprox", "proton", "fast", "fastly", "tr", "en"];
  const linkList = [];
  for (const key of keys) {
    const entry = scxData[key];
    if (!entry || !entry.sx || entry.sx.t === void 0)
      continue;
    const t = entry.sx.t;
    if (Array.isArray(t)) {
      const links = t.map((link) => atobDecode(rot13(link))).filter(Boolean);
      if (links.length > 0) {
        linkList.push({ [key]: links.join(",") });
      }
    } else if (typeof t === "object" && t !== null) {
      const result = {};
      for (const [subKey, value] of Object.entries(t)) {
        if (typeof value === "string") {
          result[subKey] = atobDecode(rot13(value));
        }
      }
      if (Object.keys(result).length > 0) {
        linkList.push(result);
      }
    }
  }
  return linkList;
}
function extractVidMoxy(url, referer) {
  return __async(this, null, function* () {
    try {
      const html = yield fetchText(url, { headers: __spreadProps(__spreadValues({}, HEADERS), { "Referer": referer }) });
      const subtitles = [];
      const subRegex = /captions","file":"([^"]+)","label":"([^"]+)"/g;
      let sm;
      while ((sm = subRegex.exec(html)) !== null) {
        const subUrl = sm[1].replace(/\\/g, "");
        const subLang = sm[2].replace(/\\u0131/g, "\u0131").replace(/\\u0130/g, "\u0130").replace(/\\u00fc/g, "\xFC").replace(/\\u00e7/g, "\xE7");
        subtitles.push({ lang: subLang, url: fixUrl(subUrl) });
      }
      let videoUrl = null;
      const hexMatch = html.match(/file": "(.*)",/);
      if (hexMatch && hexMatch[1]) {
        try {
          const bytes = hexMatch[1].split("\\x").filter(Boolean).map((h) => parseInt(h, 16));
          videoUrl = String.fromCharCode(...bytes);
        } catch (_) {
        }
      }
      if (!videoUrl) {
        const plainMatch = html.match(/file":"([^"]+\.m3u8[^"]*)"/);
        if (plainMatch)
          videoUrl = plainMatch[1].replace(/\\/g, "");
      }
      if (!videoUrl)
        return null;
      return { url: videoUrl, subtitles, type: "hls" };
    } catch (e) {
      console.warn(`${PROVIDER_TAG} VidMoxy hata: ${e.message}`);
      return null;
    }
  });
}
function extractTurboImgz(key, url, referer) {
  return __async(this, null, function* () {
    try {
      const realUrl = url.includes("||") ? url.split("||")[1] : url;
      const html = yield fetchText(realUrl, { headers: __spreadProps(__spreadValues({}, HEADERS), { "Referer": referer }) });
      const match = html.match(/file: "(.*)",/);
      if (!match)
        return null;
      return { url: match[1], name: `TurboImgz - ${key.toUpperCase()}`, type: "hls" };
    } catch (e) {
      console.warn(`${PROVIDER_TAG} TurboImgz hata: ${e.message}`);
      return null;
    }
  });
}
function extractTRsTX(url, referer) {
  return __async(this, null, function* () {
    try {
      const TRSTX_BASE = "https://trstx.org";
      const html = yield fetchText(url, { headers: __spreadProps(__spreadValues({}, HEADERS), { "Referer": referer }) });
      const fileMatch = html.match(/file":"([^"]+)"/);
      if (!fileMatch)
        return [];
      const filePath = fileMatch[1].replace(/\\/g, "");
      const postLink = `${TRSTX_BASE}/${filePath}`;
      const postRes = yield fetch(postLink, {
        method: "POST",
        headers: __spreadProps(__spreadValues({}, HEADERS), { "Referer": referer })
      });
      if (!postRes.ok)
        return [];
      let rawList;
      try {
        rawList = yield postRes.json();
      } catch (_) {
        return [];
      }
      if (!Array.isArray(rawList) || rawList.length < 2)
        return [];
      const results = [];
      for (const item of rawList.slice(1)) {
        if (!item.title || !item.file)
          continue;
        const playlistUrl = `${TRSTX_BASE}/playlist/${item.file.replace(/^\//, "")}.txt`;
        try {
          const playRes = yield fetch(playlistUrl, {
            method: "POST",
            headers: __spreadProps(__spreadValues({}, HEADERS), { "Referer": referer })
          });
          if (!playRes.ok)
            continue;
          const m3uLink = (yield playRes.text()).trim();
          if (m3uLink)
            results.push({ title: item.title, url: m3uLink });
        } catch (_) {
        }
      }
      return results;
    } catch (e) {
      console.warn(`${PROVIDER_TAG} TRsTX hata: ${e.message}`);
      return [];
    }
  });
}
function rapidVidDecodeSecret(encoded) {
  try {
    const reversed = encoded.split("").reverse().join("");
    const t = atobDecode(reversed);
    const key = "K9L";
    let shifted = "";
    for (let i = 0; i < t.length; i++) {
      const offset = key[i % key.length].charCodeAt(0) % 5 + 1;
      shifted += String.fromCharCode(t.charCodeAt(i) - offset);
    }
    return atobDecode(shifted);
  } catch (e) {
    return null;
  }
}
function extractRapidVid(url, referer) {
  return __async(this, null, function* () {
    try {
      const html = yield fetchText(url, { headers: __spreadProps(__spreadValues({}, HEADERS), { "Referer": referer }) });
      const subtitles = [];
      const trackMatch = html.match(/jwSetup\.tracks\s*=\s*(\[[\s\S]*?\]);/);
      if (trackMatch) {
        try {
          const tracks = JSON.parse(trackMatch[1]);
          for (const t of tracks) {
            if (t.file && t.label) {
              const lang = t.label.replace(/\\u0131/g, "\u0131").replace(/\\u0130/g, "\u0130").replace(/\\u00fc/g, "\xFC").replace(/\\u00e7/g, "\xE7");
              subtitles.push({ lang, url: t.file.replace(/\\/g, "") });
            }
          }
        } catch (_) {
        }
      }
      const sourcesMatch = html.match(/jwSetup\.sources\s*=\s*([\s\S]*?);/);
      if (!sourcesMatch)
        return null;
      const avMatch = sourcesMatch[1].match(/av\('([^']+)'\)/);
      if (!avMatch)
        return null;
      const videoUrl = rapidVidDecodeSecret(avMatch[1]);
      if (!videoUrl)
        return null;
      return { url: videoUrl, subtitles, type: "hls" };
    } catch (e) {
      console.warn(`${PROVIDER_TAG} RapidVid hata: ${e.message}`);
      return null;
    }
  });
}
function extractTurkeyPlayer(url, referer) {
  return __async(this, null, function* () {
    try {
      const TURKEY_BASE = "https://watch.turkeyplayer.com";
      const html = yield fetchText(url, { headers: __spreadProps(__spreadValues({}, HEADERS), { "Referer": referer }) });
      const videoJsonMatch = html.match(/var\s+video\s*=\s*(\{[\s\S]*?\});/);
      if (!videoJsonMatch)
        return null;
      const videoData = JSON.parse(videoJsonMatch[1]);
      if (!videoData.id || !videoData.md5)
        return null;
      const masterUrl = `${TURKEY_BASE}/m3u8/8/${videoData.md5}/master.txt?s=1&id=${videoData.id}&cache=1`;
      return { url: masterUrl, type: "hls" };
    } catch (e) {
      console.warn(`${PROVIDER_TAG} TurkeyPlayer hata: ${e.message}`);
      return null;
    }
  });
}
function searchMovie(query) {
  return __async(this, null, function* () {
    try {
      const searchUrl = `${MAIN_URL}/arama/${encodeURIComponent(query)}`;
      const html = yield fetchText(searchUrl);
      const results = [];
      const filmRegex = /<li[^>]*class="[^"]*film[^"]*"[^>]*>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>[\s\S]*?<span[^>]*class="[^"]*film-title[^"]*"[^>]*>([^<]+)<\/span>/gi;
      let m;
      while ((m = filmRegex.exec(html)) !== null) {
        results.push({ href: fixUrl(m[1]), title: m[2].trim() });
      }
      if (results.length === 0)
        return null;
      const queryLower = query.toLowerCase().replace(/[^a-z0-9ğüşıöç]/gi, "");
      const normalize = (s) => (s || "").toLowerCase().replace(/[^a-z0-9ğüşıöç]/gi, "");
      const exact = results.find((r) => normalize(r.title) === queryLower) || results.find((r) => normalize(r.title).includes(queryLower)) || results[0];
      return exact.href;
    } catch (e) {
      console.warn(`${PROVIDER_TAG} Arama hatas\u0131: ${e.message}`);
      return null;
    }
  });
}
function extractFromMoviePage(movieUrl) {
  return __async(this, null, function* () {
    const streams = [];
    try {
      console.log(`${PROVIDER_TAG} Film sayfas\u0131 taran\u0131yor: ${movieUrl}`);
      const html = yield fetchText(movieUrl);
      const videoLinks = getVideoLinks(html);
      console.log(`${PROVIDER_TAG} ${videoLinks.length} link grubu bulundu.`);
      if (videoLinks.length === 0)
        return streams;
      for (const videoMap of videoLinks) {
        for (const [key, value] of Object.entries(videoMap)) {
          if (!value)
            continue;
          const urls = value.split(",").map((u) => u.trim()).filter(Boolean);
          for (const rawUrl of urls) {
            const videoUrl = fixUrl(rawUrl);
            if (!videoUrl)
              continue;
            console.log(`${PROVIDER_TAG} [${key}] Kaynak: ${videoUrl.substring(0, 80)}`);
            try {
              if (videoUrl.includes("vidmoxy.com")) {
                const res = yield extractVidMoxy(videoUrl, movieUrl);
                if (res) {
                  streams.push({
                    name: `FullHDFilmizlesene - VidMoxy - ${key}`,
                    title: `VidMoxy | ${key} | Auto`,
                    url: res.url,
                    quality: "Auto",
                    type: "hls",
                    headers: { "Referer": videoUrl }
                  });
                  for (const sub of res.subtitles || []) {
                    streams.push({ subtitle: sub });
                  }
                }
              } else if (videoUrl.includes("turbo.imgz.me")) {
                const res = yield extractTurboImgz(key, `${key}||${videoUrl}`, movieUrl);
                if (res) {
                  streams.push({
                    name: `FullHDFilmizlesene - TurboImgz - ${key}`,
                    title: `TurboImgz | ${key.toUpperCase()} | Auto`,
                    url: res.url,
                    quality: "Auto",
                    type: "hls",
                    headers: { "Referer": videoUrl }
                  });
                }
              } else if (videoUrl.includes("trstx.org")) {
                const trstxResults = yield extractTRsTX(videoUrl, movieUrl);
                for (const r of trstxResults) {
                  streams.push({
                    name: `FullHDFilmizlesene - TRsTX - ${r.title}`,
                    title: `TRsTX | ${r.title} | Auto`,
                    url: r.url,
                    quality: "Auto",
                    type: "hls",
                    headers: { "Referer": videoUrl }
                  });
                }
              } else if (videoUrl.includes("rapidvid.net")) {
                const res = yield extractRapidVid(videoUrl, movieUrl);
                if (res) {
                  streams.push({
                    name: `FullHDFilmizlesene - RapidVid - ${key}`,
                    title: `RapidVid | ${key} | Auto`,
                    url: res.url,
                    quality: "Auto",
                    type: "hls",
                    headers: { "Referer": videoUrl }
                  });
                }
              } else if (videoUrl.includes("turkeyplayer.com")) {
                const res = yield extractTurkeyPlayer(videoUrl, movieUrl);
                if (res) {
                  streams.push({
                    name: `FullHDFilmizlesene - TurkeyPlayer - ${key}`,
                    title: `TurkeyPlayer | ${key} | Auto`,
                    url: res.url,
                    quality: "Auto",
                    type: "hls",
                    headers: { "Referer": videoUrl }
                  });
                }
              } else if (videoUrl.includes(".m3u8") || videoUrl.includes(".mp4")) {
                streams.push({
                  name: `FullHDFilmizlesene - ${key}`,
                  title: `${key} | Auto`,
                  url: videoUrl,
                  quality: "Auto",
                  headers: { "Referer": movieUrl }
                });
              }
            } catch (err) {
              console.warn(`${PROVIDER_TAG} [${key}] \xE7\u0131karma hatas\u0131: ${err.message}`);
            }
          }
        }
      }
      const seen = /* @__PURE__ */ new Set();
      return streams.filter((s) => {
        if (s.subtitle)
          return true;
        if (seen.has(s.url))
          return false;
        seen.add(s.url);
        return true;
      });
    } catch (e) {
      console.error(`${PROVIDER_TAG} extractFromMoviePage hatas\u0131: ${e.message}`);
      return streams;
    }
  });
}

// src/patronFullHDFilmizlesene/tmdb.js
var TMDB_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjMzYjg4NmYwZTM4MmQyNjJlMzAzNWJjMmFjN2Q2MiIsInN1YiI6IjY1MDBlZWZmYzVhYjFhMDBhYTRiNTkxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A5VHhgPzc-3SFfG_qVRIY8n0CWivQdYMmKLLnvSEFLM";
function getTmdbTitle(tmdbId, mediaType) {
  return __async(this, null, function* () {
    var _a, _b;
    try {
      const url = `https://api.themoviedb.org/3/${mediaType === "movie" ? "movie" : "tv"}/${tmdbId}?language=tr-TR`;
      const res = yield fetch(url, {
        headers: {
          "Authorization": `Bearer ${TMDB_KEY}`,
          "Accept": "application/json"
        }
      });
      if (!res.ok)
        throw new Error(`TMDB HTTP ${res.status}`);
      const data = yield res.json();
      const trTitle = data.title || data.name || "";
      const origTitle = data.original_title || data.original_name || "";
      const year = ((_a = data.release_date) == null ? void 0 : _a.substring(0, 4)) || ((_b = data.first_air_date) == null ? void 0 : _b.substring(0, 4)) || "";
      return { trTitle, origTitle, year };
    } catch (e) {
      console.error(`[FullHDFilmizlesene] TMDB hata: ${e.message}`);
      return { trTitle: "", origTitle: "", year: "" };
    }
  });
}

// src/patronFullHDFilmizlesene/index.js
var PROVIDER_TAG2 = "[FullHDFilmizlesene]";
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      if (mediaType !== "movie") {
        console.log(`${PROVIDER_TAG2} Yaln\u0131zca film destekleniyor.`);
        return [];
      }
      console.log(`${PROVIDER_TAG2} \u0130stek: TMDB ${tmdbId}`);
      const { trTitle, origTitle } = yield getTmdbTitle(tmdbId, mediaType);
      console.log(`${PROVIDER_TAG2} Ba\u015Fl\u0131k: TR="${trTitle}" | Orig="${origTitle}"`);
      if (!trTitle && !origTitle) {
        console.warn(`${PROVIDER_TAG2} Ba\u015Fl\u0131k bulunamad\u0131.`);
        return [];
      }
      let movieUrl = null;
      if (trTitle) {
        movieUrl = yield searchMovie(trTitle);
      }
      if (!movieUrl && origTitle && origTitle !== trTitle) {
        movieUrl = yield searchMovie(origTitle);
      }
      if (!movieUrl) {
        console.warn(`${PROVIDER_TAG2} Film bulunamad\u0131: "${trTitle || origTitle}"`);
        return [];
      }
      console.log(`${PROVIDER_TAG2} Film sayfas\u0131: ${movieUrl}`);
      const allStreams = yield extractFromMoviePage(movieUrl);
      const streams = allStreams.filter((s) => !s.subtitle);
      console.log(`${PROVIDER_TAG2} Toplam ${streams.length} stream bulundu.`);
      return streams;
    } catch (e) {
      console.error(`${PROVIDER_TAG2} Hata: ${e.message}`);
      return [];
    }
  });
}
