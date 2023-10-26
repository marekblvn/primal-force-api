const express = require("express");
const {
  addMatch,
  deleteMatch,
  getMatch,
  listMatches,
} = require("../abl/match-abl");
const { requiredScopes } = require("express-oauth2-jwt-bearer");
const router = express.Router();

router.post("/add", requiredScopes("create:match read:match"), addMatch);
router.get("/get", requiredScopes("read:match"), getMatch);
router.get("/list", requiredScopes("read:match"), listMatches);
router.post("/delete", requiredScopes("delete:match"), deleteMatch);

module.exports = router;
