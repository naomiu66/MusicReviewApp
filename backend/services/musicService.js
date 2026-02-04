const provider = require("../providers/lastfmProvider");

module.exports = {
  async getTracks(query) {
    return await provider.searchTracks(query);
  },

  async getTrackInfo(query) {
    return await provider.getTrackInfo(query);
  },

  async getArtists(query) {
    return await provider.searchArtists(query);
  },

  async getAlbums(query) {
    return await provider.searchAlbums(query);
  },

  async getAlbumInfo(query) {
    return await provider.getAlbumInfo(query);
  }
};
