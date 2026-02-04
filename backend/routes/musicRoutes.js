const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const musicController = require("../controllers/musicController");

router
  .get("/tracks", musicController.searchTracks)
  .get("/tracks/info", musicController.getTrackInfo)
  .get("/artists", musicController.searchArtists)
  .get("/albums", musicController.searchAlbums)
  .get("/albums/info", musicController.getAlbumInfo);

module.exports = router;
