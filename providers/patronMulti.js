/**
 * patronMulti - Built from src/patronMulti/
 * Generated: 2026-04-19T17:26:32.902Z
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
var VERSION = "2.0.0";
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
function trySmashyStream(tmdbId, mediaType, season, episode, title) {
  return __async(this, null, function* () {
    try {
      console.log(`[PatronMulti V${VERSION}] SmashyStream kontrol ediliyor...`);
      var url = mediaType === "movie" ? `https://player.smashy.stream/movie/${tmdbId}` : `https://player.smashy.stream/tv/${tmdbId}?s=${season}&e=${episode}`;
      var displayTitle = title + (mediaType !== "movie" ? ` - S${season}E${episode}` : "");
      var response = yield fetch(url, {
        headers: {
          "Referer": "https://player.smashy.stream/",
          "User-Agent": "Mozilla/5.0"
        }
      });
      if (!response.ok)
        return [];
      var text = yield response.text();
      var streams = [];
      var m3u8Match = /["'](https:\/\/[^"']+\.m3u8[^"']*)["']/.exec(text);
      if (m3u8Match && m3u8Match[1]) {
        streams.push({
          url: m3u8Match[1].replace(/\\/g, ""),
          name: "SmashyStream",
          title: `${displayTitle} (SmashyStream)`,
          quality: "Auto",
          headers: { "Referer": "https://player.smashy.stream/" }
        });
        console.log(`[PatronMulti V${VERSION}] SmashyStream stream bulundu!`);
      }
      return streams;
    } catch (e) {
      console.log(`[PatronMulti V${VERSION}] SmashyStream atland\u0131: ${e.message}`);
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
        console.log(`[PatronMulti V${VERSION}] Vidmody: \u0130\xE7erik bulundu`);
        return [{
          url: targetUrl,
          name: "Vidmody",
          title: displayTitle,
          quality: "Auto",
          headers: {
            "Referer": "https://vidmody.com/",
            "User-Agent": "Mozilla/5.0"
          }
        }];
      }
      return [];
    } catch (e) {
      console.log(`[PatronMulti V${VERSION}] Vidmody hatas\u0131: ${e.message}`);
      return [];
    }
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
      console.log(`[Vidlink] \u015Eifreleme ba\u015Far\u0131s\u0131z: ${e.message}`);
    }
    return null;
  });
}
function tryVidLink(tmdbId, mediaType, season, episode, title) {
  return __async(this, null, function* () {
    try {
      console.log(`[PatronMulti V${VERSION}] VidLink B-API kontrol ediliyor...`);
      var encryptedId = yield encryptTmdbId(tmdbId);
      if (!encryptedId) {
        console.log(`[PatronMulti V${VERSION}] VidLink \u015Fifreleyici ba\u015Far\u0131s\u0131z, ge\xE7iliyor.`);
        return [];
      }
      var apiUrl = mediaType === "tv" ? `https://vidlink.pro/api/b/tv/${encryptedId}/${season}/${episode}` : `https://vidlink.pro/api/b/movie/${encryptedId}`;
      var displayTitle = title + (mediaType !== "movie" ? ` - S${season}E${episode}` : "");
      var response = yield fetch(apiUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
          "Connection": "keep-alive",
          "Referer": "https://vidlink.pro/",
          "Origin": "https://vidlink.pro",
          "Accept": "application/json,*/*"
        }
      });
      if (!response.ok)
        return [];
      var data = yield response.json();
      var streams = [];
      var headersConf = {
        "Referer": "https://vidlink.pro/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      };
      if (data && data.stream) {
        if (data.stream.qualities) {
          Object.keys(data.stream.qualities).forEach((qualityKey) => {
            var qualityData = data.stream.qualities[qualityKey];
            if (qualityData && qualityData.url) {
              streams.push({
                url: qualityData.url,
                name: `VidLink`,
                title: `${displayTitle} (VidLink - ${qualityKey})`,
                quality: qualityKey,
                headers: headersConf
              });
            }
          });
          console.log(`[PatronMulti V${VERSION}] VidLink streamleri bulundu!`);
        } else if (data.stream.playlist) {
          streams.push({
            url: data.stream.playlist,
            name: "VidLink",
            title: `${displayTitle} (VidLink - Auto)`,
            quality: "Auto",
            headers: headersConf
          });
          console.log(`[PatronMulti V${VERSION}] VidLink stream(playlist) bulundu!`);
        }
      }
      return streams;
    } catch (e) {
      console.log(`[PatronMulti V${VERSION}] VidLink atland\u0131: ${e.message}`);
      return [];
    }
  });
}
function extractStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      var info = yield getTmdbInfo(tmdbId, mediaType);
      if (!info.imdbId || !info.imdbId.startsWith("tt")) {
        return [];
      }
      console.log(`[PatronMulti V${VERSION}] Aran\u0131yor: ${info.imdbId} - ${info.title}`);
      var allStreams = [];
      var smashyStreams = yield trySmashyStream(tmdbId, mediaType, season, episode, info.title);
      allStreams = allStreams.concat(smashyStreams);
      var vidlinkStreams = yield tryVidLink(tmdbId, mediaType, season, episode, info.title);
      allStreams = allStreams.concat(vidlinkStreams);
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
