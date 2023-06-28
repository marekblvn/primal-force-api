const Match = require("../model/match-schema");

const countMatches = (filter) => Match.countDocuments(filter);
const createMatch = (match) => Match.create(match);
const deleteMatchById = (id) => Match.deleteOne({ _id: id });
const getMatchById = (id) => Match.findById(id);
const getMatchByMatchId = (matchId) =>
  Match.findOne({ "metadata.matchId": matchId });
const findMatches = (pageIndex, pageSize, filter) => {
  return Match.aggregate([
    {
      $match: filter,
    },
    {
      $project: {
        "info.gameCreation": 1,
        "info.gameDuration": 1,
        "info.participants.summonerName": 1,
        "info.participants.championName": 1,
        "info.participants.teamId": 1,
        "info.teams": 1,
      },
    },
    {
      $skip: pageSize * pageIndex,
    },
    {
      $limit: pageSize,
    },
    {
      $sort: {
        "info.gameCreation": -1,
      },
    },
  ]);
};

module.exports = {
  countMatches,
  createMatch,
  deleteMatchById,
  getMatchById,
  getMatchByMatchId,
  findMatches,
};
