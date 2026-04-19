/**
 * patronMulti - Built from src/patronMulti/
 * Generated: 2026-04-19T16:50:13.796Z
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

// src/patronMulti/http.js
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "*/*",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
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
function tryBypassAPI(tmdbId, mediaType, title) {
  return __async(this, null, function* () {
    try {
      console.log(`[PatronMulti V${VERSION}] Bypass API kontrol ediliyor...`);
      var typeParams = mediaType === "movie" ? "movie" : "tv";
      var apiUrl = `https://api.consumet.org/meta/tmdb/info/${tmdbId}?type=${typeParams}`;
      var response = yield fetch(apiUrl);
      var data = yield response.json();
      if (!data || !data.id)
        return [];
      var streams = [];
      var watchId = mediaType === "movie" ? data.episodeId : null;
      if (!watchId)
        return [];
      var watchUrl = `https://api.consumet.org/meta/tmdb/watch/${watchId}?id=${data.id}`;
      var watchRes = yield fetch(watchUrl);
      var watchData = yield watchRes.json();
      if (watchData && watchData.sources) {
        for (var source of watchData.sources) {
          if (source.url.includes(".m3u8") || source.url.includes(".mp4")) {
            streams.push({
              url: source.url,
              name: "FlixHQ (Bypass)",
              title: `Yabanc\u0131 Sunucu - ${source.quality || "Auto"}`,
              quality: source.quality || "Auto",
              headers: {
                "Referer": "https://flixhq.to/",
                "User-Agent": HEADERS["User-Agent"]
              }
            });
          }
        }
        console.log(`[PatronMulti V${VERSION}] Bypass API'den ${streams.length} stream \xE7\u0131kar\u0131ld\u0131!`);
      }
      return streams;
    } catch (e) {
      console.log(`[PatronMulti V${VERSION}] Bypass API atland\u0131 (Hata veya Sunucu Kapal\u0131): ${e.message}`);
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
        targetUrl = `https://vidmody.com/vs/${imdbId}`;
        displayTitle += year ? ` (${year})` : "";
      } else {
        var sStr = "s" + season;
        var eStr = "e" + (episode < 10 ? "0" + episode : episode);
        targetUrl = `https://vidmody.com/vs/${imdbId}/${sStr}/${eStr}`;
        displayTitle += ` - ${sStr.toUpperCase()}${eStr.toUpperCase()}`;
      }
      var checkRes = yield fetch(targetUrl, { method: "HEAD" });
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
function extractStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      var info = yield getTmdbInfo(tmdbId, mediaType);
      if (!info.imdbId || !info.imdbId.startsWith("tt")) {
        return [];
      }
      console.log(`[PatronMulti V${VERSION}] Aran\u0131yor: ${info.imdbId} - ${info.title}`);
      var allStreams = [];
      var bypassStreams = yield tryBypassAPI(tmdbId, mediaType, info.title);
      allStreams = allStreams.concat(bypassStreams);
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
