const { auth } = require("express-oauth2-jwt-bearer");

const validateAccessToken = auth({
  audience: "http://localhost:8000",
  issuerBaseURL: "https://dev-wdjg5l36.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

module.exports = {
  validateAccessToken,
};
