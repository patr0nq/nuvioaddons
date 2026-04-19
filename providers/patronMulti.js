/**
 * patronMulti - Built from src/patronMulti/
 * Generated: 2026-04-19T17:51:55.932Z
 */
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

// src/patronMulti/extractor.js
var TMDB_API_KEY = "500330721680edb6d5f7f12ba7cd9023";
var VERSION = "3.0.0";
var VIDLINK_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
  "Connection": "keep-alive",
  "Referer": "https://vidlink.pro/",
  "Origin": "https://vidlink.pro",
  "Accept": "application/json,*/*"
};
function getTmdbInfo(tmdbId, mediaType) {
  return __async(this, null, function* () {
    var typePath = mediaType === "movie" ? "movie" : "tv";
    var tmdbUrl = `https://api.themoviedb.org/3/${typePath}/${tmdbId}?api_key=${TMDB_API_KEY}&language=tr-TR&append_to_response=external_ids`;
    var tmdbRes = yield fetch(tmdbUrl);
    var d = yield tmdbRes.json();
    return {
      imdbId: d.external_ids ? d.external_ids.imdb_id : null,
      title: d.title || d.name || "\u0130\xE7erik",
      year: (d.release_date || d.first_air_date || "").slice(0, 4)
    };
  });
}
function encryptTmdbId(tmdbId) {
  return __async(this, null, function* () {
    try {
      var res = yield fetch(`https://enc-dec.app/api/enc-vidlink?text=${tmdbId}`);
      var data = yield res.json();
      if (data && data.result)
        return data.result;
    } catch (e) {
      console.log(`[PatronMulti V${VERSION}] [VidLink] \u015Eifreleme ba\u015Far\u0131s\u0131z: ${e.message}`);
    }
    return null;
  });
}
function parseM3U8(content, baseUrl) {
  var lines = content.split("\n").map(function(l) {
    return l.trim();
  }).filter(Boolean);
  var streams = [];
  var current = null;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.startsWith("#EXT-X-STREAM-INF:")) {
      current = { bandwidth: null, resolution: null, url: null };
      var bw = line.match(/BANDWIDTH=(\d+)/);
      if (bw)
        current.bandwidth = parseInt(bw[1]);
      var res = line.match(/RESOLUTION=(\d+x\d+)/);
      if (res)
        current.resolution = res[1];
    } else if (current && !line.startsWith("#")) {
      current.url = line.startsWith("http") ? line : resolveUrl(line, baseUrl);
      streams.push(current);
      current = null;
    }
  }
  return streams;
}
function resolveUrl(url, baseUrl) {
  if (url.startsWith("http"))
    return url;
  try {
    return new URL(url, baseUrl).toString();
  } catch (e) {
    return url;
  }
}
function qualityFromResolution(resolution) {
  if (!resolution)
    return "Auto";
  var h = parseInt(resolution.split("x")[1] || "0");
  if (h >= 2160)
    return "4K";
  if (h >= 1440)
    return "1440p";
  if (h >= 1080)
    return "1080p";
  if (h >= 720)
    return "720p";
  if (h >= 480)
    return "480p";
  if (h >= 360)
    return "360p";
  return "240p";
}
function tryVidLink(tmdbId, mediaType, season, episode, title, year) {
  return __async(this, null, function* () {
    try {
      console.log(`[PatronMulti V${VERSION}] VidLink kontrol ediliyor...`);
      var encryptedId = yield encryptTmdbId(tmdbId);
      if (!encryptedId) {
        console.log(`[PatronMulti V${VERSION}] VidLink: \u015Fifreleme ba\u015Far\u0131s\u0131z, ge\xE7iliyor.`);
        return [];
      }
      var apiUrl = mediaType === "tv" ? `https://vidlink.pro/api/b/tv/${encryptedId}/${season}/${episode}` : `https://vidlink.pro/api/b/movie/${encryptedId}`;
      var displayTitle = mediaType === "tv" ? `${title} S${String(season).padStart(2, "0")}E${String(episode).padStart(2, "0")}` : year ? `${title} (${year})` : title;
      var response = yield fetch(apiUrl, { headers: VIDLINK_HEADERS });
      if (!response.ok) {
        console.log(`[PatronMulti V${VERSION}] VidLink: HTTP ${response.status}`);
        return [];
      }
      var data = yield response.json();
      if (!data || !data.stream) {
        console.log(`[PatronMulti V${VERSION}] VidLink: stream verisi yok`);
        return [];
      }
      var streams = [];
      var streamHeaders = {
        "Referer": "https://vidlink.pro/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
      };
      if (data.stream.qualities) {
        Object.keys(data.stream.qualities).forEach(function(qKey) {
          var qData = data.stream.qualities[qKey];
          if (qData && qData.url) {
            streams.push({
              url: qData.url,
              name: "VidLink",
              title: `${displayTitle} (VidLink ${qKey})`,
              quality: qKey,
              headers: streamHeaders
            });
          }
        });
        console.log(`[PatronMulti V${VERSION}] VidLink: ${streams.length} kalite bulundu (qualities)`);
      }
      if (data.stream.playlist) {
        console.log(`[PatronMulti V${VERSION}] VidLink: playlist al\u0131nd\u0131, parse ediliyor...`);
        try {
          var plRes = yield fetch(data.stream.playlist, { headers: streamHeaders });
          if (plRes.ok) {
            var plText = yield plRes.text();
            var parsed = parseM3U8(plText, data.stream.playlist);
            if (parsed.length > 0) {
              parsed.forEach(function(s) {
                var q = qualityFromResolution(s.resolution);
                streams.push({
                  url: s.url,
                  name: "VidLink",
                  title: `${displayTitle} (VidLink ${q})`,
                  quality: q,
                  headers: streamHeaders
                });
              });
              console.log(`[PatronMulti V${VERSION}] VidLink: ${parsed.length} varyant bulundu (playlist parse)`);
            } else {
              streams.push({
                url: data.stream.playlist,
                name: "VidLink",
                title: `${displayTitle} (VidLink Auto)`,
                quality: "Auto",
                headers: streamHeaders
              });
              console.log(`[PatronMulti V${VERSION}] VidLink: tek stream d\xF6nd\xFCr\xFCld\xFC (master playlist)`);
            }
          }
        } catch (parseErr) {
          streams.push({
            url: data.stream.playlist,
            name: "VidLink",
            title: `${displayTitle} (VidLink Auto)`,
            quality: "Auto",
            headers: streamHeaders
          });
          console.log(`[PatronMulti V${VERSION}] VidLink: playlist parse hatas\u0131, master eklendi`);
        }
      }
      return streams;
    } catch (e) {
      console.log(`[PatronMulti V${VERSION}] VidLink hatas\u0131: ${e.message}`);
      return [];
    }
  });
}
function tryVidsrcPro(tmdbId, mediaType, season, episode, title, year) {
  return __async(this, null, function* () {
    try {
      console.log(`[PatronMulti V${VERSION}] Vidsrc.pro kontrol ediliyor...`);
      var url = mediaType === "tv" ? `https://vidsrc.pro/embed/tv/${tmdbId}/${season}/${episode}` : `https://vidsrc.pro/embed/movie/${tmdbId}`;
      var displayTitle = mediaType === "tv" ? `${title} S${String(season).padStart(2, "0")}E${String(episode).padStart(2, "0")}` : year ? `${title} (${year})` : title;
      var response = yield fetch(url, { headers: { "Referer": "https://vidsrc.pro/", "User-Agent": "Mozilla/5.0" } });
      var text = yield response.text();
      var mMatch = text.match(/["'](https?:\/\/[^"']+\.m3u8[^"']*)["']/i);
      if (mMatch) {
        return [{
          url: mMatch[1].replace(/\\/g, ""),
          name: "VidsrcPro",
          title: `${displayTitle} (VidsrcPro)`,
          quality: "Auto",
          headers: { "Referer": "https://vidsrc.pro/" }
        }];
      }
      return [];
    } catch (e) {
      console.log(`[PatronMulti V${VERSION}] Vidsrc.pro hatas\u0131: ${e.message}`);
      return [];
    }
  });
}
function tryMultiEmbed(tmdbId, mediaType, season, episode, title, year) {
  return __async(this, null, function* () {
    try {
      console.log(`[PatronMulti V${VERSION}] MultiEmbed kontrol ediliyor...`);
      var url = mediaType === "tv" ? `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1&s=${season}&e=${episode}` : `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`;
      var displayTitle = mediaType === "tv" ? `${title} S${String(season).padStart(2, "0")}E${String(episode).padStart(2, "0")}` : year ? `${title} (${year})` : title;
      var response = yield fetch(url, { headers: { "Referer": "https://multiembed.mov/", "User-Agent": "Mozilla/5.0" } });
      var text = yield response.text();
      var streams = [];
      var matches = text.match(/["'](https?:\/\/[^"']+\.(?:m3u8|mp4)[^"']*)["']/gi);
      if (matches) {
        matches.forEach(function(m) {
          var cleanUrl = m.replace(/["']/g, "").replace(/\\/g, "");
          if (!cleanUrl.includes("google") && !cleanUrl.includes("histats")) {
            streams.push({
              url: cleanUrl,
              name: "MultiEmbed",
              title: `${displayTitle} (MultiEmbed)`,
              quality: "Auto",
              headers: { "Referer": "https://multiembed.mov/" }
            });
          }
        });
      }
      return streams.slice(0, 3);
    } catch (e) {
      console.log(`[PatronMulti V${VERSION}] MultiEmbed hatas\u0131: ${e.message}`);
      return [];
    }
  });
}
function tryVidmody(imdbId, mediaType, season, episode, title, year) {
  return __async(this, null, function* () {
    try {
      var targetUrl = "";
      var displayTitle = title;
      if (mediaType === "movie") {
        targetUrl = `https://vidmody.com/vs/${imdbId}#.m3u8`;
        displayTitle += year ? ` (${year})` : "";
      } else {
        var sStr = "s" + season;
        var eStr = "e" + (episode < 10 ? "0" + episode : episode);
        targetUrl = `https://vidmody.com/vs/${imdbId}/${sStr}/${eStr}#.m3u8`;
        displayTitle += ` - ${sStr.toUpperCase()}${eStr.toUpperCase()}`;
      }
      var checkRes = yield fetch(targetUrl.replace("#.m3u8", ""), { method: "HEAD" });
      if (checkRes.status === 200) {
        console.log(`[PatronMulti V${VERSION}] Vidmody: i\xE7erik bulundu`);
        return [{
          url: targetUrl,
          name: "Vidmody",
          title: `${displayTitle} (Vidmody)`,
          quality: "Auto",
          headers: {
            "Referer": "https://vidmody.com/",
            "User-Agent": "Mozilla/5.0"
          }
        }];
      }
      console.log(`[PatronMulti V${VERSION}] Vidmody: i\xE7erik bulunamad\u0131 (${checkRes.status})`);
      return [];
    } catch (e) {
      console.log(`[PatronMulti V${VERSION}] Vidmody hatas\u0131: ${e.message}`);
      return [];
    }
  });
}
function extractStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      var info = yield getTmdbInfo(tmdbId, mediaType);
      if (!info.imdbId || !info.imdbId.startsWith("tt")) {
        console.log(`[PatronMulti V${VERSION}] IMDB ID bulunamad\u0131, iptal ediliyor.`);
        return [];
      }
      console.log(`[PatronMulti V${VERSION}] Aran\u0131yor: ${info.imdbId} - ${info.title}`);
      var allStreams = [];
      var vidlinkStreams = yield tryVidLink(tmdbId, mediaType, season, episode, info.title, info.year);
      allStreams = allStreams.concat(vidlinkStreams);
      var vidsrcProStreams = yield tryVidsrcPro(tmdbId, mediaType, season, episode, info.title, info.year);
      allStreams = allStreams.concat(vidsrcProStreams);
      var multiStreams = yield tryMultiEmbed(tmdbId, mediaType, season, episode, info.title, info.year);
      allStreams = allStreams.concat(multiStreams);
      var vidmodyStreams = yield tryVidmody(info.imdbId, mediaType, season, episode, info.title, info.year);
      allStreams = allStreams.concat(vidmodyStreams);
      console.log(`[PatronMulti V${VERSION}] Toplam ${allStreams.length} stream bulundu`);
      return allStreams;
    } catch (e) {
      console.error(`[PatronMulti V${VERSION}] KR\u0130T\u0130K HATA: ${e.message}`);
      return [];
    }
  });
}

// src/patronMulti/index.js
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[PatronMulti] Request: ${mediaType} ${tmdbId} S${season || "-"}E${episode || "-"}`);
      var streams = yield extractStreams(tmdbId, mediaType, season, episode);
      console.log(`[PatronMulti] Found ${streams.length} stream(s)`);
      return streams;
    } catch (error) {
      console.error(`[PatronMulti] Error: ${error.message}`);
      return [];
    }
  });
}
module.exports = { getStreams };
