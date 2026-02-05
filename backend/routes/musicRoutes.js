const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const musicController = require("../controllers/musicController");
const disabledRoute = require("../middleware/disabledRoute");

router
  .get("/tracks", auth.authenticateToken, musicController.searchTracks)
  .get("/tracks/info", auth.authenticateToken, musicController.getTrackInfo)
  .get("/artists", auth.authenticateToken, musicController.searchArtists)
  .get("/albums", disabledRoute, musicController.searchAlbums)
  .get("/albums/info", disabledRoute, musicController.getAlbumInfo);

module.exports = router;
