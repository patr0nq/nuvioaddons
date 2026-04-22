/**
 * patrondortkhd - Built from src/patrondortkhd/
 * Generated: 2026-04-22T14:17:37.372Z
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

// src/patrondortkhd/index.js
var patrondortkhd_exports = {};
__export(patrondortkhd_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patrondortkhd_exports);

// src/patrondortkhd/extractor.js
var import_cheerio_without_node_native = __toESM(require("cheerio-without-node-native"));

// src/patrondortkhd/http.js
var DOMAINS_URL = "https://raw.githubusercontent.com/phisher98/TVVVV/refs/heads/main/domains.json";
var DEFAULT_MAIN_URL = "https://4khdhub.dad";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9,tr-TR;q=0.8,tr;q=0.7"
};
var cachedDomains = null;
function getDomains() {
  return __async(this, null, function* () {
    if (cachedDomains)
      return cachedDomains;
    try {
      const res = yield fetch(DOMAINS_URL, { headers: HEADERS });
      if (!res.ok)
        throw new Error(`HTTP ${res.status}`);
      cachedDomains = yield res.json();
    } catch (error) {
      console.warn(`[PatronDortKHD] domains.json alinamadi: ${error.message}`);
      cachedDomains = {};
    }
    return cachedDomains;
  });
}
function getMainUrl() {
  return __async(this, null, function* () {
    const domains = yield getDomains();
    return domains["4khdhub"] || domains.n4khdhub || DEFAULT_MAIN_URL;
  });
}
function fixUrl(url, baseUrl) {
  if (!url)
    return "";
  if (url.startsWith("http://") || url.startsWith("https://"))
    return url;
  if (url.startsWith("//"))
    return `https:${url}`;
  if (!baseUrl)
    return url;
  try {
    return new URL(url, baseUrl).toString();
  } catch (_) {
    return url;
  }
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

// src/patrondortkhd/tmdb.js
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
      console.error(`[PatronDortKHD] TMDB baslik hatasi: ${error.message}`);
      return { trTitle: "", origTitle: "" };
    }
  });
}

// src/patrondortkhd/extractor.js
var PROVIDER_NAME = "PatronDortKHD";
var REDIRECT_REGEX = /s\('o','([A-Za-z0-9+/=]+)'|ck\('_wp_http_\d+','([^']+)'/g;
function dedupeStreams(streams) {
  const seen = /* @__PURE__ */ new Set();
  return streams.filter((stream) => {
    const key = `${stream.url}|${JSON.stringify(stream.headers || {})}`;
    if (seen.has(key))
      return false;
    seen.add(key);
    return true;
  });
}
function rot13(value) {
  return value.replace(/[A-Za-z]/g, (char) => {
    const base = char <= "Z" ? 65 : 97;
    return String.fromCharCode((char.charCodeAt(0) - base + 13) % 26 + base);
  });
}
function decodeBase64(value) {
  try {
    return atob(value);
  } catch (_) {
    return "";
  }
}
function normalizeTitle(value) {
  return (value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function parseQuality(text) {
  const value = (text || "").toLowerCase();
  if (/2160p|4k|uhd/.test(value))
    return "4K";
  if (/1440p/.test(value))
    return "1440p";
  if (/1080p/.test(value))
    return "1080p";
  if (/720p/.test(value))
    return "720p";
  if (/480p/.test(value))
    return "480p";
  return "Auto";
}
function cleanFileDetails(title) {
  const normalized = (title || "").replace(/\.[a-z0-9]{2,4}$/i, "").replace(/WEB[-_. ]?DL/gi, "WEB-DL").replace(/WEB[-_. ]?RIP/gi, "WEBRIP").replace(/H[ .]?265/gi, "H265").replace(/H[ .]?264/gi, "H264").replace(/DDP[ .]?([0-9]\.[0-9])/gi, "DDP$1");
  const allowed = /* @__PURE__ */ new Set([
    "WEB-DL",
    "WEBRIP",
    "BLURAY",
    "HDRIP",
    "DVDRIP",
    "HDTV",
    "CAM",
    "TS",
    "BRRIP",
    "BDRIP",
    "H264",
    "H265",
    "X264",
    "X265",
    "HEVC",
    "AVC",
    "AAC",
    "AC3",
    "DTS",
    "MP3",
    "FLAC",
    "DD",
    "ATMOS",
    "HDR",
    "HDR10",
    "HDR10+",
    "DV",
    "DOLBYVISION",
    "NF",
    "CR",
    "SDR"
  ]);
  const parts = normalized.split(/[ ._]+/).map((part) => part.toUpperCase());
  const filtered = [];
  for (const part of parts) {
    if (allowed.has(part))
      filtered.push(part === "DV" ? "DOLBYVISION" : part);
    else if (/^DDP\d\.\d$/.test(part))
      filtered.push(part);
  }
  return [...new Set(filtered)].join(" ");
}
function getRedirectLinks(url) {
  return __async(this, null, function* () {
    let html = "";
    try {
      html = yield fetchText(url);
    } catch (error) {
      console.error(`[${PROVIDER_NAME}] Redirect sayfasi alinamadi: ${error.message}`);
      return "";
    }
    let combined = "";
    let match;
    while ((match = REDIRECT_REGEX.exec(html)) !== null) {
      combined += match[1] || match[2] || "";
    }
    if (!combined)
      return "";
    try {
      const decoded = decodeBase64(rot13(decodeBase64(decodeBase64(combined))));
      const json = JSON.parse(decoded);
      const encodedUrl = decodeBase64(json.o || "").trim();
      if (encodedUrl)
        return encodedUrl;
      const data = decodeBase64(json.data || "");
      const blogUrl = json.blog_url || "";
      if (!data || !blogUrl)
        return "";
      const finalText = yield fetchText(`${blogUrl}?re=${encodeURIComponent(data)}`);
      return finalText.trim();
    } catch (error) {
      console.error(`[${PROVIDER_NAME}] Redirect cozumleme hatasi: ${error.message}`);
      return "";
    }
  });
}
function searchContent(query, mediaType) {
  return __async(this, null, function* () {
    var _a, _b, _c;
    const mainUrl = yield getMainUrl();
    const searchUrl = `${mainUrl}/?s=${encodeURIComponent(query)}`;
    const html = yield fetchText(searchUrl);
    const $ = import_cheerio_without_node_native.default.load(html);
    const results = [];
    $("div.card-grid a, div.card-grid-small a, a[href]").each((_, el) => {
      const href = fixUrl($(el).attr("href"), mainUrl);
      if (!href || href.includes("/category/") || href.includes("/tag/"))
        return;
      const title = $(el).find("h3").first().text().trim() || $(el).attr("title") || $(el).find("img").attr("alt") || $(el).text().trim();
      if (!title)
        return;
      const lowerHref = href.toLowerCase();
      const looksSeries = /season|s\d{1,2}|episode|series/.test(lowerHref) || /season|series/i.test(title);
      const looksMovie = /movie/i.test(title) || /movies/.test(lowerHref);
      if (mediaType === "movie" && looksSeries && !looksMovie)
        return;
      results.push({ title, href });
    });
    if (!results.length)
      return null;
    const q = normalizeTitle(query);
    return ((_a = results.find((item) => normalizeTitle(item.title) === q)) == null ? void 0 : _a.href) || ((_b = results.find((item) => normalizeTitle(item.title).startsWith(q))) == null ? void 0 : _b.href) || ((_c = results.find((item) => normalizeTitle(item.title).includes(q))) == null ? void 0 : _c.href) || results[0].href;
  });
}
function collectMovieLinks($, pageUrl) {
  const links = [];
  $("div.download-item a[href]").each((_, el) => {
    const href = fixUrl($(el).attr("href"), pageUrl);
    if (href)
      links.push(href);
  });
  return [...new Set(links)];
}
function collectEpisodeLinks($, pageUrl, season, episode) {
  const directEpisodeLinks = [];
  $("div.episodes-list div.season-item").each((_, seasonEl) => {
    const seasonText = $(seasonEl).find("div.episode-number").first().text();
    const seasonMatch = seasonText.match(/S?([1-9][0-9]*)/i);
    if (!seasonMatch || parseInt(seasonMatch[1], 10) !== Number(season))
      return;
    $(seasonEl).find("div.episode-download-item").each((__, episodeEl) => {
      const episodeText = $(episodeEl).find("div.episode-file-info span.badge-psa").text();
      const episodeMatch = episodeText.match(/Episode-?0*([1-9][0-9]*)/i);
      if (!episodeMatch || parseInt(episodeMatch[1], 10) !== Number(episode))
        return;
      $(episodeEl).find("a[href]").each((___, linkEl) => {
        const href = fixUrl($(linkEl).attr("href"), pageUrl);
        if (href)
          directEpisodeLinks.push(href);
      });
    });
  });
  if (directEpisodeLinks.length) {
    return [...new Set(directEpisodeLinks)];
  }
  const packLinks = [];
  $("div.download-item").each((_, item) => {
    const headerText = $(item).find("div.flex-1.text-left.font-semibold").text().trim();
    const seasonMatch = headerText.match(/S([0-9]+)/i);
    if (!seasonMatch || parseInt(seasonMatch[1], 10) !== Number(season))
      return;
    $(item).find("a[href]").each((__, linkEl) => {
      const href = fixUrl($(linkEl).attr("href"), pageUrl);
      if (href)
        packLinks.push(href);
    });
  });
  return [...new Set(packLinks)];
}
function buildStream(title, url, quality = "Auto", headers = {}) {
  return {
    name: PROVIDER_NAME,
    title,
    url,
    quality,
    headers: Object.keys(headers).length ? headers : void 0
  };
}
function resolveHubcdnDirect(url, sourceTitle) {
  return __async(this, null, function* () {
    var _a, _b, _c;
    const html = yield fetchText(url, { headers: __spreadValues({ Referer: url }, HEADERS) });
    const encoded = ((_a = html.match(/r=([A-Za-z0-9+/=]+)/)) == null ? void 0 : _a[1]) || ((_c = (_b = html.match(/reurl\s*=\s*"([^"]+)"/)) == null ? void 0 : _b[1]) == null ? void 0 : _c.split("?r=").pop());
    if (!encoded)
      return [];
    const decoded = decodeBase64(encoded).split("link=").pop();
    if (!decoded || decoded === encoded)
      return [];
    return [buildStream(`${sourceTitle} - HUBCDN`, decoded, "Auto", { Referer: url })];
  });
}
function resolveHubdrive(url, sourceTitle) {
  return __async(this, null, function* () {
    const html = yield fetchText(url);
    const $ = import_cheerio_without_node_native.default.load(html);
    const href = $("a.btn.btn-primary.btn-user.btn-success1.m-1").attr("href");
    if (!href)
      return [];
    return yield resolveLink(fixUrl(href, url), `${sourceTitle} - HubDrive`, url);
  });
}
function resolveHblinks(url, sourceTitle) {
  return __async(this, null, function* () {
    const html = yield fetchText(url);
    const $ = import_cheerio_without_node_native.default.load(html);
    const links = [];
    $("h3 a, h5 a, div.entry-content p a").each((_, el) => {
      const href = fixUrl($(el).attr("href"), url);
      if (href)
        links.push(href);
    });
    const nested = [];
    for (const link of links) {
      nested.push(...yield resolveLink(link, `${sourceTitle} - Hblinks`, url));
    }
    return nested;
  });
}
function resolveHubcloud(url, sourceTitle, referer) {
  return __async(this, null, function* () {
    const baseHeaders = referer ? { Referer: referer } : {};
    let entryUrl = url;
    if (!/hubcloud\.php/i.test(url)) {
      const html2 = yield fetchText(url, { headers: baseHeaders });
      const $2 = import_cheerio_without_node_native.default.load(html2);
      const raw = $2("#download").attr("href");
      if (!raw)
        return [];
      entryUrl = fixUrl(raw, url);
    }
    const html = yield fetchText(entryUrl, { headers: __spreadValues({ Referer: url }, baseHeaders) });
    const $ = import_cheerio_without_node_native.default.load(html);
    const size = $("i#size").first().text().trim();
    const header = $("div.card-header").first().text().trim();
    const details = cleanFileDetails(header);
    const quality = parseQuality(header);
    const extras = [details, size].filter(Boolean).join(" | ");
    const streams = [];
    $("a.btn[href]").each((_, el) => {
      const link = fixUrl($(el).attr("href"), entryUrl);
      const text = $(el).text().trim().toLowerCase();
      if (!link)
        return;
      const titleSuffix = extras ? ` [${extras}]` : "";
      if (text.includes("buzzserver")) {
        streams.push(buildStream(`${sourceTitle} - BuzzServer${titleSuffix}`, link, quality, { Referer: entryUrl }));
        return;
      }
      if (text.includes("pixel") || text.includes("pixeldrain")) {
        try {
          const base = new URL(link);
          const fileId = base.pathname.split("/").filter(Boolean).pop();
          const finalUrl = link.includes("/api/file/") || link.includes("?download") ? link : `${base.protocol}//${base.host}/api/file/${fileId}?download`;
          streams.push(buildStream(`${sourceTitle} - Pixeldrain${titleSuffix}`, finalUrl, quality, { Referer: entryUrl }));
        } catch (_2) {
          streams.push(buildStream(`${sourceTitle} - Pixeldrain${titleSuffix}`, link, quality, { Referer: entryUrl }));
        }
        return;
      }
      if (text.includes("download file") || text.includes("fsl server") || text.includes("s3 server") || text.includes("mega server") || text.includes("fslv2") || text.includes("pdl server")) {
        streams.push(buildStream(`${sourceTitle}${titleSuffix}`, link, quality, { Referer: entryUrl }));
        return;
      }
      streams.push(...[]);
    });
    return streams;
  });
}
function resolveDirectFile(url, sourceTitle, referer) {
  return __async(this, null, function* () {
    return [buildStream(sourceTitle, url, parseQuality(url), referer ? { Referer: referer } : {})];
  });
}
function resolveLink(rawUrl, sourceTitle, referer = "") {
  return __async(this, null, function* () {
    let url = rawUrl;
    if (!url)
      return [];
    if (url.includes("id=")) {
      const redirected = yield getRedirectLinks(url);
      if (redirected)
        url = redirected;
    }
    const lower = url.toLowerCase();
    try {
      if (/\.(m3u8|mp4|mkv)(\?|$)/i.test(url)) {
        return yield resolveDirectFile(url, sourceTitle, referer);
      }
      if (lower.includes("hubdrive")) {
        return yield resolveHubdrive(url, sourceTitle);
      }
      if (lower.includes("hubcloud")) {
        return yield resolveHubcloud(url, sourceTitle, referer);
      }
      if (lower.includes("hubcdn")) {
        return yield resolveHubcdnDirect(url, sourceTitle);
      }
      if (lower.includes("hblinks")) {
        return yield resolveHblinks(url, sourceTitle);
      }
      if (lower.includes("pixeldrain")) {
        return [buildStream(`${sourceTitle} - Pixeldrain`, url, "Auto", referer ? { Referer: referer } : {})];
      }
    } catch (error) {
      console.error(`[${PROVIDER_NAME}] Link cozumleme hatasi (${url}): ${error.message}`);
    }
    return [];
  });
}
function extractStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    const { trTitle, origTitle } = yield getTmdbTitle(tmdbId, mediaType);
    console.log(`[${PROVIDER_NAME}] TMDB: ${tmdbId} | TR: ${trTitle} | ORIG: ${origTitle}`);
    if (!trTitle && !origTitle)
      return [];
    let contentUrl = null;
    if (trTitle)
      contentUrl = yield searchContent(trTitle, mediaType);
    if (!contentUrl && origTitle && origTitle !== trTitle) {
      contentUrl = yield searchContent(origTitle, mediaType);
    }
    if (!contentUrl) {
      console.warn(`[${PROVIDER_NAME}] Icerik bulunamadi`);
      return [];
    }
    const html = yield fetchText(contentUrl);
    const $ = import_cheerio_without_node_native.default.load(html);
    const isMoviePage = $("div.episodes-list").length === 0;
    let links = [];
    if (mediaType === "movie" || mediaType !== "movie" && isMoviePage) {
      links = collectMovieLinks($, contentUrl);
    } else {
      links = collectEpisodeLinks($, contentUrl, season, episode);
    }
    if (!links.length) {
      console.warn(`[${PROVIDER_NAME}] Sayfada uygun link bulunamadi`);
      return [];
    }
    const allStreams = [];
    for (const link of links) {
      allStreams.push(...yield resolveLink(link, PROVIDER_NAME, contentUrl));
    }
    const directLinks = links.filter((link) => /\.(m3u8|mp4|mkv)(\?|$)/i.test(link)).map((link) => buildStream(PROVIDER_NAME, link, parseQuality(link), { Referer: contentUrl }));
    return dedupeStreams([...allStreams, ...directLinks]);
  });
}

// src/patrondortkhd/index.js
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[PatronDortKHD] Istek: ${mediaType} | TMDB: ${tmdbId} | S:${season} E:${episode}`);
      return yield extractStreams(tmdbId, mediaType, season, episode);
    } catch (error) {
      console.error(`[PatronDortKHD] Hata: ${error.message}`);
      return [];
    }
  });
}
