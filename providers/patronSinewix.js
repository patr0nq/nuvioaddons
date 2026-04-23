/**
 * patronSinewix - Built from src/patronSinewix/
 * Generated: 2026-04-23T21:48:06.834Z
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

// src/patronSinewix/index.js
var patronSinewix_exports = {};
__export(patronSinewix_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patronSinewix_exports);

// src/patronSinewix/http.js
var BASE_URL = "https://ydfvfdizipanel.ru";
var API_TOKEN = "9iQNC5HQwPlaFuJDkhncJ5XTJ8feGXOJatAA";
var HEADERS = {
  "hash256": "711bff4afeb47f07ab08a0b07e85d3835e739295e8a6361db77eebd93d96306b",
  "signature": "3082058830820370a00302010202145bbfbba9791db758ad12295636e094ab4b07dc24300d06092a864886f70d01010b05003074310b3009060355040613025553311330110603550408130a43616c69666f726e6961311630140603550407130d4d6f756e7461696e205669657731143012060355040a130b476f6f676c6520496e632e3110300e060355040b1307416e64726f69643110300e06035504031307416e64726f69643020170d3231313231353232303433335a180f32303531313231353232303433335a3074310b3009060355040613025553311330110603550408130a43616c69666f726e6961311630140603550407130d4d6f756e7461696e205669657731143012060355040a130b476f6f676c6520496e632e3110300e060355040b1307416e64726f69643110300e06035504031307416e64726f696430820222300d06092a864886f70d01010105000382020f003082020a0282020100a5106a24bb3f9c0aaf3a2b228f794b5eaf1757ba758b19736a39d1bdc73fc983a7237b8d5ca5156cfa999c1dab3418bbc2be0920e0ee001c8aa4812d1dae75d080f09e91e0abda83ff9a76e8384a4429f4849248069a59505b12ac2c14ba2e4d1a13afcdaf54e508697ff928a9f738e6f4a6fc27409c55329eb149b5ff89c5a2d7c06bf9e62086f955cad17d7be2623ee9d5ec56068eadc23cb0965a13ff97d49fe10ef41afc6eeca36b4ace9582097faff89f590bc831cdb3a69eec5d15b67c3f2cad49e37ed053733e3d2d400c47755b932bdbe15d749fd6ad1dce30ba5e66094dfb6ee6f64cafb807e11b19a990c5d078c6d6701cda0bdeb21e99404ff166074f4c89b04c418f4e7940db5c78647c475bcfb85d4c4e836ee7d7c1d53e9e736b5d96d4b4d8b98209064b729ac6a682d55a6a930e518d849898bb28329ca0aaa133b5e5270a9d5940cac6af4802a57fd971efda91abb602882dd6aa6ce2b236b57b52ee2481498f0cacbcc2c36c238bc84becad7eaaf1125b9a1ca9ded6c79f3f283a52050377809b2a9995d66e1636b0ed426fdd8685c47cb18e82077f4aefcc07887e1dc58b4d64be1632f0e7b4625da6f40c65a8512a6454a4b96963e7f876136e6c0069a519a79ad632078ed965aa12482458060c030ed50db706d854f88cb004630b49285d8af8b471ff8f6070687826412287b50049bcb7d1b6b62ef90203010001a310300e300c0603551d13040530030101ff300d06092a864886f70d01010b0500038202010051c0b7bd793181dc29ca777d3773f928a366c8469ecf2fa3cfb076e8831970d19bb2b96e44e8ccc647cf0696bb824ac61c23d958525d283cab26037b04d58aa79bf92192db843adf5c26a980f081d2f0e14f759fc5ff4c5bb3dce0860299bfe7b349a8155a2efaf731ba25ce796a80c1442c7bf80f8c1a7912ff0b6f6592264315337251a846460194fa594f81f38f9e5233a63201e931ad9cab5bf119f24025613f307194eaa6eb39a83f3c05a49ba34455b1aff7c6839bbb657d9392ffdf397432af6e56ba9534a8b07d7060fe09691c6cf07cb5324f67b3cc0871a8c621d81fe71d71085c55206a4f57e25f774fd4b979b299e8bb076b50fca42fa57da2d519fd35a4a7c0137babaed4345f8031b63b6a71f5e8268f709d658ccd7c2a58849379d25bfa598c3f4a2c3d9b7d89285fefeb7f0ec65137d38b08ce432a15688b624a179e6a4a505ebc3bcdfbc4d4330508ee2d8d0f016924dcec21a6838ef7d834c6f43bde4a5201ed0b3bb4e9bd377b470e36bcf5bc3d56169dbd8e39567aa7dce4d1a8a8a54a5e1aa6fb1a8aab0062669a966f96e15ccce6fe12ea5e6a8b8c8823bdc94988ca39759fd1cc8fd8ae5c3d74db50b174cf7d77655016c075c91d439ed01cc0a9f695c99fad3b5495fb6cb1e01a5fa020cc6022a85c07ec55f9eba89719f86e49d34ab5bd208c5f70cced2b7b7963c014f8404432979b506de29e",
  "User-Agent": "EasyPlex (Android 14; SM-A546B; Samsung Galaxy A54 5G; tr)",
  "Accept": "application/json"
};
function fetchJSON(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const response = yield fetch(url, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues(__spreadValues({}, HEADERS), options.headers || {})
    }));
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} -> ${url}`);
    }
    return yield response.json();
  });
}

// src/patronSinewix/tmdb.js
var import_cheerio_without_node_native = __toESM(require("cheerio-without-node-native"));
function getTmdbTitle(tmdbId, mediaType) {
  return __async(this, null, function* () {
    try {
      let decodeHtml = function(text) {
        return (text || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#039;/g, "'");
      };
      const type = mediaType === "movie" ? "movie" : "tv";
      const url = `https://www.themoviedb.org/${type}/${tmdbId}?language=tr-TR`;
      const response = yield fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
        }
      });
      if (!response.ok) {
        throw new Error(`TMDB HTML fetch hatasi: ${response.status}`);
      }
      const html = yield response.text();
      let title = "";
      const ogMatch = html.match(/<meta property="og:title" content="([^"]+)">/i);
      if (ogMatch) {
        title = decodeHtml(ogMatch[1]).split("(")[0].trim();
      } else {
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        if (titleMatch) {
          title = decodeHtml(titleMatch[1]).split("(")[0].split("\u2014")[0].split("\xE2\u20AC\u201D")[0].trim();
        }
      }
      const $ = import_cheerio_without_node_native.default.load(html);
      let origTitle = title;
      $("section.facts p").each((_, el) => {
        const text = $(el).text();
        if (text.includes("Orijinal Ba\u015Fl\u0131k") || text.includes("Original Title")) {
          const found = text.replace("Orijinal Ba\u015Fl\u0131k", "").replace("Original Title", "").trim();
          if (found)
            origTitle = decodeHtml(found);
        }
      });
      if (origTitle === title) {
        const origMatch = html.match(/<h3 class="caption" dir="auto">([^<]+)<\/h3>/i) || html.match(/<strong class="original_title">([^<]+)<\/strong>/i);
        if (origMatch) {
          const matched = decodeHtml(origMatch[1]).replace("Orijinal Adi", "").replace("Orijinal Ad\u0131", "").trim();
          if (matched)
            origTitle = matched;
        }
      }
      let shortTitle = "";
      if (origTitle && (origTitle.includes(":") || origTitle.toLowerCase().includes(" and "))) {
        shortTitle = origTitle.split(":")[0].split(/ and /i)[0].trim();
      }
      return { trTitle: title, origTitle, shortTitle };
    } catch (error) {
      console.error(`[SineWix] TMDB baslik hatasi: ${error.message}`);
      return { trTitle: "", origTitle: "", shortTitle: "" };
    }
  });
}

// src/patronSinewix/extractor.js
var PROVIDER_NAME = "SineWix";
function normalizeTitle(value) {
  return (value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function searchContent(query) {
  return __async(this, null, function* () {
    const url = `${BASE_URL}/public/api/search/${encodeURIComponent(query)}/${API_TOKEN}`;
    const data = yield fetchJSON(url);
    return data.search || [];
  });
}
function buildStream(video, sourceName) {
  let url = video.link || video.youtubelink || video.embed;
  if (!url)
    return null;
  if (!/\.(m3u8|mp4|mkv)/i.test(url)) {
    url += url.includes("#") ? "" : "#.mkv";
  }
  return {
    name: PROVIDER_NAME,
    title: `${video.server || "Server"} - ${video.lang || "TR"}`,
    url,
    quality: "Auto",
    headers: HEADERS
  };
}
function extractStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      const { trTitle, origTitle, shortTitle } = yield getTmdbTitle(tmdbId, mediaType);
      console.log(`[${PROVIDER_NAME}] TMDB: ${tmdbId} | TR: ${trTitle} | ORIG: ${origTitle}`);
      if (!trTitle && !origTitle)
        return [];
      let results = yield searchContent(trTitle);
      console.log(`[${PROVIDER_NAME}] Search "${trTitle}" found ${results.length} results`);
      if (!results.length && origTitle && origTitle !== trTitle) {
        results = yield searchContent(origTitle);
        console.log(`[${PROVIDER_NAME}] Search "${origTitle}" found ${results.length} results`);
      }
      if (!results.length && shortTitle) {
        results = yield searchContent(shortTitle);
        console.log(`[${PROVIDER_NAME}] Search "${shortTitle}" found ${results.length} results`);
      }
      const q = normalizeTitle(trTitle || origTitle);
      const match = results.find(
        (item) => (normalizeTitle(item.name) === q || normalizeTitle(item.title) === q || normalizeTitle(item.original_name) === q) && (mediaType === "movie" ? item.type === "movie" : item.type === "serie")
      ) || results.find(
        (item) => normalizeTitle(item.name) === q || normalizeTitle(item.title) === q || normalizeTitle(item.original_name) === q
      ) || results[0];
      if (!match) {
        console.warn(`[${PROVIDER_NAME}] Icerik eslesmedi`);
        return [];
      }
      console.log(`[${PROVIDER_NAME}] Matched: ${match.name || match.title} (ID: ${match.id})`);
      const id = match.id;
      const isMovie = mediaType === "movie";
      const typePath = isMovie ? "media" : "series";
      const method = isMovie ? "detail" : "show";
      const detailUrl = `${BASE_URL}/public/api/${typePath}/${method}/${id}/${API_TOKEN}`;
      const detailData = yield fetchJSON(detailUrl);
      const streams = [];
      if (isMovie) {
        const videos = detailData.videos || [];
        videos.forEach((v) => {
          const s = buildStream(v, PROVIDER_NAME);
          if (s)
            streams.push(s);
        });
      } else {
        const seasons = detailData.seasons || [];
        const targetSeason = seasons.find((s) => s.season_number == season);
        if (targetSeason) {
          const episodes = targetSeason.episodes || [];
          const targetEpisode = episodes.find((e) => e.episode_number == episode);
          if (targetEpisode) {
            const videos = targetEpisode.videos || [];
            videos.forEach((v) => {
              const s = buildStream(v, PROVIDER_NAME);
              if (s)
                streams.push(s);
            });
          }
        }
      }
      return streams;
    } catch (error) {
      console.error(`[${PROVIDER_NAME}] Extractor error: ${error.message}`);
      return [];
    }
  });
}

// src/patronSinewix/index.js
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[SineWix] Request: ${mediaType} ${tmdbId} S${season}E${episode}`);
      return yield extractStreams(tmdbId, mediaType, season, episode);
    } catch (error) {
      console.error(`[SineWix] Error: ${error.message}`);
      return [];
    }
  });
}
