const https = require("https");

async function getMatchData(req, res, next) {
  const { routingCode, gameId } = req.body;
  const endpoint = `${routingCode}_${gameId}`;
  const options = {
    hostname: "europe.api.riotgames.com",
    port: 443,
    path: `/lol/match/v5/matches/${endpoint}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "PmFApp/1.0",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      Origin: "https://developer.riotgames.co",
      "X-Riot-Token": process.env.RIOT_API_KEY,
    },
  };
  https
    .get(options, (response) => {
      let rawData = "";
      response.on("data", (bytes) => (rawData += bytes));
      response.on("end", () => {
        res.riotApiResponse = {
          data: JSON.parse(rawData),
          statusCode: response.statusCode,
          statusMessage: response.statusMessage,
        };
        next();
      });
    })
    .on("error", (err) => {
      throw err;
    });
}

module.exports = { getMatchData };
