/**
 * patronhdfcehennemi - Built from src/patronhdfcehennemi/
 * Generated: 2026-04-22T14:33:04.082Z
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

// src/patronhdfcehennemi/index.js
var patronhdfcehennemi_exports = {};
__export(patronhdfcehennemi_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patronhdfcehennemi_exports);

// src/patronhdfcehennemi/extractor.js
var import_cheerio_without_node_native = __toESM(require("cheerio-without-node-native"));

// src/patronhdfcehennemi/http.js
var MAIN_URL = "https://www.hdfilmcehennemi.nl";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
};
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
function fixUrl(url) {
  if (!url)
    return "";
  if (url.startsWith("http://") || url.startsWith("https://"))
    return url;
  if (url.startsWith("//"))
    return `https:${url}`;
  if (url.startsWith("/"))
    return `${MAIN_URL}${url}`;
  return `${MAIN_URL}/${url}`;
}

// src/patronhdfcehennemi/tmdb.js
function getTmdbTitle(tmdbId, mediaType) {
  return __async(this, null, function* () {
    try {
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
        title = ogMatch[1].split("(")[0].trim();
      } else {
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        if (titleMatch) {
          title = titleMatch[1].split("(")[0].split("\u2014")[0].split("\xE2\u20AC\u201D")[0].trim();
        }
      }
      let origTitle = title;
      const origMatch = html.match(/<h3 class="caption" dir="auto">([^<]+)<\/h3>/i) || html.match(/<strong class="original_title">([^<]+)<\/strong>/i);
      if (origMatch) {
        const matched = origMatch[1].replace("Orijinal Adi", "").replace("Orijinal Ad\u0131", "").trim();
        if (matched)
          origTitle = matched;
      }
      return { trTitle: title, origTitle };
    } catch (error) {
      console.error(`[PatronHDFCehennemi] TMDB baslik hatasi: ${error.message}`);
      return { trTitle: "", origTitle: "" };
    }
  });
}

// src/patronhdfcehennemi/extractor.js
var PROVIDER_NAME = "PatronHDFCehennemi";
function normalizeTitle(value) {
  return (value || "").toLowerCase().replace(/[^a-z0-9çğıöşü]+/gi, " ").trim();
}
function pickBestMatch(results, query) {
  const normalizedQuery = normalizeTitle(query);
  return results.find((item) => normalizeTitle(item.title) === normalizedQuery) || results.find((item) => normalizeTitle(item.title).startsWith(normalizedQuery)) || results.find((item) => normalizeTitle(item.title).includes(normalizedQuery)) || results[0] || null;
}
function searchContent(query) {
  return __async(this, null, function* () {
    var _a;
    const raw = yield fetchText(`${MAIN_URL}/search?q=${encodeURIComponent(query)}`, {
      headers: {
        "X-Requested-With": "fetch",
        "Accept": "*/*"
      }
    });
    let json;
    try {
      json = JSON.parse(raw);
    } catch (error) {
      console.error(`[${PROVIDER_NAME}] Arama JSON parse hatasi: ${error.message}`);
      return null;
    }
    const results = [];
    for (const html of json.results || []) {
      const $ = import_cheerio_without_node_native.default.load(html);
      const title = $("h4.title").first().text().trim();
      const href = fixUrl($("a").first().attr("href"));
      if (title && href) {
        results.push({ title, href });
      }
    }
    return ((_a = pickBestMatch(results, query)) == null ? void 0 : _a.href) || null;
  });
}
function findEpisodeUrl(seriesUrl, season, episode) {
  return __async(this, null, function* () {
    const html = yield fetchText(seriesUrl);
    const $ = import_cheerio_without_node_native.default.load(html);
    let found = null;
    $("div.seasons-tab-content a").each((_, el) => {
      var _a, _b;
      if (found)
        return;
      const epName = $(el).find("h4").text().trim();
      const href = fixUrl($(el).attr("href"));
      const epEpisode = (_a = epName.match(/(\d+)\.\s*B[öo]l[üu]m/i)) == null ? void 0 : _a[1];
      const epSeason = ((_b = epName.match(/(\d+)\.\s*Sezon/i)) == null ? void 0 : _b[1]) || "1";
      if (Number(epSeason) === Number(season) && Number(epEpisode) === Number(episode) && href) {
        found = href;
      }
    });
    return found;
  });
}
function scanPackedScript(script) {
  const packedBlocks = [];
  let searchIndex = 0;
  while (true) {
    const start = script.indexOf("eval(function(p,a,c,k,e,d)", searchIndex) >= 0 ? script.indexOf("eval(function(p,a,c,k,e,d)", searchIndex) : script.indexOf("eval(function(p,a,c,k,e", searchIndex);
    if (start < 0)
      break;
    let depth = 0;
    let end = -1;
    for (let i = start + 4; i < script.length; i++) {
      if (script[i] === "(")
        depth++;
      else if (script[i] === ")") {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    if (end < 0)
      break;
    packedBlocks.push(script.slice(start, end));
    searchIndex = end;
  }
  return packedBlocks;
}
function unpackEvalBlock(block) {
  try {
    return eval(block.replace(/^eval\(/, "("));
  } catch (_) {
    return "";
  }
}
function decodeDcHello(parts) {
  const s = parts.join("");
  const rot13String = (value) => value.replace(/[A-Za-z]/g, (char) => {
    const base = char <= "Z" ? 65 : 97;
    return String.fromCharCode((char.charCodeAt(0) - base + 13) % 26 + base);
  });
  const reverseString = (value) => value.split("").reverse().join("");
  const base64ToBinary = (value) => {
    try {
      const decoded = atob(value);
      return Uint8Array.from(decoded, (char) => char.charCodeAt(0));
    } catch (_) {
      return null;
    }
  };
  const binaryToAscii = (bytes) => String.fromCharCode(...bytes);
  const rot13Bytes = (bytes) => Uint8Array.from(bytes, (byte) => {
    let code = byte;
    if (code >= 97 && code <= 122)
      code = (code - 97 + 13) % 26 + 97;
    else if (code >= 65 && code <= 90)
      code = (code - 65 + 13) % 26 + 65;
    return code;
  });
  const reverseBytes = (bytes) => Uint8Array.from([...bytes].reverse());
  const unmix = (bytes) => {
    let out = "";
    for (let i = 0; i < bytes.length; i++) {
      const newChar = (bytes[i] - 399756995 % (i + 5) + 256) % 256;
      out += String.fromCharCode(newChar);
    }
    return out;
  };
  const isValid = (value) => {
    if (!value || value.length < 10)
      return false;
    if (/[\x00-\x08\x0E-\x1F]/.test(value))
      return false;
    return /^https?:\/\//i.test(value) || value.includes("m3u8") || value.includes("mp4");
  };
  const strategies = [
    () => {
      const bytes = base64ToBinary(reverseString(rot13String(s)));
      return bytes ? unmix(bytes) : "";
    },
    () => {
      const bytes = base64ToBinary(rot13String(s));
      return bytes ? unmix(reverseBytes(bytes)) : "";
    },
    () => {
      const bytes = base64ToBinary(reverseString(s));
      return bytes ? unmix(rot13Bytes(bytes)) : "";
    },
    () => {
      const bytes = base64ToBinary(rot13String(reverseString(s)));
      return bytes ? unmix(bytes) : "";
    },
    () => {
      const bytes = base64ToBinary(s);
      return bytes ? unmix(reverseBytes(rot13Bytes(bytes))) : "";
    },
    () => {
      const bytes = base64ToBinary(reverseString(s));
      if (!bytes)
        return "";
      const nested = base64ToBinary(binaryToAscii(bytes));
      return nested ? unmix(nested) : "";
    },
    () => {
      const bytes = base64ToBinary(s);
      return bytes ? unmix(rot13Bytes(reverseBytes(bytes))) : "";
    },
    () => {
      const bytes = base64ToBinary(reverseString(rot13String(s)));
      if (!bytes)
        return "";
      const nested = base64ToBinary(binaryToAscii(bytes));
      return nested ? unmix(nested) : "";
    }
  ];
  for (const strategy of strategies) {
    try {
      const result = strategy();
      if (isValid(result))
        return result;
    } catch (_) {
      continue;
    }
  }
  return "";
}
function parseQuotedArray(arraySource) {
  const values = [];
  const regex = /"([^"]*)"|'([^']*)'/g;
  let match;
  while ((match = regex.exec(arraySource)) !== null) {
    values.push(match[1] || match[2] || "");
  }
  return values;
}
function resolveVideoFromScript(script) {
  var _a, _b, _c, _d;
  const unpacked = scanPackedScript(script).map(unpackEvalBlock).filter(Boolean).join("\n");
  const combined = `${script}
${unpacked}`;
  const fileLinkMatch = combined.match(/file_link\s*=\s*"([^"]+)";/i);
  if (fileLinkMatch) {
    const parts = parseQuotedArray(fileLinkMatch[1]);
    const decoded = decodeDcHello(parts);
    if (decoded)
      return decoded.startsWith("http") ? decoded : `https${decoded.substring(decoded.indexOf("://"))}`;
  }
  const sourceVar = (_a = combined.match(/sources\s*:\s*\[\s*\{\s*file\s*:\s*([A-Za-z0-9_]+)\s*\}\s*]/i)) == null ? void 0 : _a[1];
  if (sourceVar) {
    const varRegex = new RegExp(`var\\s+${sourceVar}\\s*=\\s*[A-Za-z0-9_]+\\(\\[([\\s\\S]*?)\\]\\)`, "i");
    const varMatch = combined.match(varRegex);
    if (varMatch) {
      const parts = parseQuotedArray(varMatch[1]);
      const decoded = decodeDcHello(parts);
      if (decoded)
        return decoded;
    }
  }
  const directMatch = ((_b = combined.match(/sources\s*:\s*\[\s*\{\s*file\s*:\s*"([^"]+\.m3u8[^"]*)"/i)) == null ? void 0 : _b[1]) || ((_c = combined.match(/["'](https?:\/\/[^"']+\.m3u8[^"']*)["']/i)) == null ? void 0 : _c[1]) || ((_d = combined.match(/["'](https?:\/\/[^"']+\.mp4[^"']*)["']/i)) == null ? void 0 : _d[1]);
  return directMatch || "";
}
function parseTracks(script) {
  var _a;
  const raw = (_a = script.match(/tracks\s*:\s*\[([\s\S]*?)\]\s*,\s*image\s*:/i)) == null ? void 0 : _a[1];
  if (!raw)
    return [];
  try {
    return JSON.parse(`[${raw}]`);
  } catch (_) {
    return [];
  }
}
function resolveIframeSource(source, iframeUrl, pageUrl) {
  return __async(this, null, function* () {
    const html = yield fetchText(iframeUrl, {
      headers: {
        Referer: `${MAIN_URL}/`
      }
    });
    const $ = import_cheerio_without_node_native.default.load(html);
    const script = $("script").toArray().map((el) => $(el).html() || "").find((text) => text.includes("sources:") || text.includes("file_link=")) || "";
    if (!script)
      return null;
    const videoUrl = resolveVideoFromScript(script);
    if (!videoUrl)
      return null;
    const tracks = parseTracks(script).filter((item) => item.kind === "captions" && item.file);
    const subtitleNote = tracks.length ? ` | Subs: ${tracks.length}` : "";
    return {
      name: PROVIDER_NAME,
      title: `${source}${subtitleNote}`,
      url: videoUrl,
      quality: "Auto",
      headers: {
        Referer: `${MAIN_URL}/`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Origin: MAIN_URL
      }
    };
  });
}
function extractFromPage(pageUrl) {
  return __async(this, null, function* () {
    var _a, _b, _c;
    const html = yield fetchText(pageUrl);
    const $ = import_cheerio_without_node_native.default.load(html);
    const streams = [];
    for (const element of $("div.alternative-links").toArray()) {
      const langCode = ($(element).attr("data-lang") || "").toUpperCase();
      for (const button of $(element).find("button.alternative-link").toArray()) {
        const videoID = $(button).attr("data-video");
        const sourceName = `${$(button).text().replace("(HDrip Xbet)", "").trim()} ${langCode}`.trim();
        if (!videoID)
          continue;
        try {
          const apiGet = yield fetchText(`${MAIN_URL}/video/${videoID}/`, {
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "fetch",
              Referer: pageUrl
            }
          });
          let iframe = ((_b = (_a = apiGet.match(/data-src=\\?"([^"]+)"/i)) == null ? void 0 : _a[1]) == null ? void 0 : _b.replace(/\\/g, "")) || ((_c = apiGet.match(/<iframe[^>]+(?:data-src|src)="([^"]+)"/i)) == null ? void 0 : _c[1]);
          if (!iframe)
            continue;
          if (iframe.includes("rapidrame")) {
            iframe = `${MAIN_URL}/rplayer/${iframe.split("?rapidrame_id=").pop()}`;
          } else if (iframe.includes("mobi")) {
            const iframeDoc = import_cheerio_without_node_native.default.load(apiGet);
            iframe = fixUrl(iframeDoc("iframe").attr("data-src") || iframeDoc("iframe").attr("src"));
          } else {
            iframe = fixUrl(iframe);
          }
          const stream = yield resolveIframeSource(sourceName, iframe, pageUrl);
          if (stream)
            streams.push(stream);
        } catch (error) {
          console.error(`[${PROVIDER_NAME}] Kaynak hatasi (${sourceName}): ${error.message}`);
        }
      }
    }
    const seen = /* @__PURE__ */ new Set();
    return streams.filter((stream) => {
      const key = `${stream.url}|${stream.title}`;
      if (seen.has(key))
        return false;
      seen.add(key);
      return true;
    });
  });
}
function extractStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    const { trTitle, origTitle } = yield getTmdbTitle(tmdbId, mediaType);
    console.log(`[${PROVIDER_NAME}] TMDB: ${tmdbId} | TR: ${trTitle} | ORIG: ${origTitle}`);
    let contentUrl = null;
    if (trTitle)
      contentUrl = yield searchContent(trTitle);
    if (!contentUrl && origTitle && origTitle !== trTitle) {
      contentUrl = yield searchContent(origTitle);
    }
    if (!contentUrl) {
      console.warn(`[${PROVIDER_NAME}] Icerik bulunamadi`);
      return [];
    }
    let targetUrl = contentUrl;
    if (mediaType !== "movie") {
      const episodeUrl = yield findEpisodeUrl(contentUrl, season, episode);
      if (!episodeUrl) {
        console.warn(`[${PROVIDER_NAME}] Bolum bulunamadi`);
        return [];
      }
      targetUrl = episodeUrl;
    }
    return yield extractFromPage(targetUrl);
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
