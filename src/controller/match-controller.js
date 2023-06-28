const express = require("express");
const {
  addMatch,
  deleteMatch,
  getMatch,
  listMatches,
} = require("../abl/match-abl");
const router = express.Router();

router.post("/add", addMatch);
router.get("/get", getMatch);
router.get("/list", listMatches);
router.post("/delete", deleteMatch);

module.exports = router;
