const mongoose = require("mongoose");
const { Schema } = mongoose;

const Participant = require("./participants-schema");
const Team = require("./team-schema");

const matchSchema = new Schema(
  {
    metadata: {
      dataVersion: String,
      matchId: { type: String, index: true, unique: true },
      participants: { type: [String], index: true },
    },
    info: {
      gameCreation: { type: BigInt, index: true },
      gameDuration: BigInt,
      gameEndTimestamp: BigInt,
      gameId: { type: BigInt, index: true, unique: true },
      gameMode: String,
      gameName: String,
      gameStartTimestamp: BigInt,
      gameType: { type: String, index: true },
      gameVersion: String,
      mapId: Number,
      participants: [Participant],
      platformId: String,
      queueId: Number,
      teams: [Team],
      tournamentCode: String,
    },
  },
  { timestamps: false }
);

const Match = mongoose.model("match", matchSchema);

module.exports = Match;
