const API_URL = process.env.LASTFM_API_URL;
const API_KEY = process.env.LASTFM_API_KEY;

const sendRequest = async (params) => {
  const response = await fetch(`${API_URL}/?${params}`);
  if (!response.ok) {
    console.error("Failed to fetch data from Last Fm API", response.status);
  }
  const data = await response.json();
  return data;
};

module.exports = {
  async searchAlbums(query) {
    const params = new URLSearchParams({
      method: "album.search",
      format: "json",
      api_key: API_KEY,
      album: query.album,
      page: query.page,
      limit: query.limit,
    });
    const response = await sendRequest(params);
    return response;
  },

  async searchTracks(query) {
    const params = new URLSearchParams({
      method: "track.search",
      format: "json",
      api_key: API_KEY,
      track: query.track,
      page: query.page,
      limit: query.limit,
      artist: query.artist ?? "",
    });
    const response = await sendRequest(params);
    return response;
  },

  async getTrackInfo(query) {
    const params = new URLSearchParams({
      method: "track.getInfo",
      format: "json",
      api_key: API_KEY,
      mbid: query.mbid,
      track: query.track,
      artist: query.artist,
      autocorrect: 1,
    });
    const response = await sendRequest(params);
    return response;
  },

  async getAlbumInfo(query) {
    const params = new URLSearchParams({
      method: "album.getInfo",
      format: "json",
      api_key: API_KEY,
      mbid: query.mbid,
      album: query.track,
      artist: query.artist,
      autocorrect: 1,
    });
    const response = await sendRequest(params);
    return response;
  },

  async searchArtists(query) {
    const params = new URLSearchParams({
      method: "artist.search",
      format: "json",
      api_key: API_KEY,
      artist: query.artist,
      page: query.page,
      limit: query.limit,
    });
    const response = await sendRequest(params);
    return response;
  },
};
