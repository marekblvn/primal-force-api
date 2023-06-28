const mongoose = require("mongoose");
const { Schema } = mongoose;

const Ban = new Schema(
  {
    championId: Number,
    pickTurn: Number,
  },
  { _id: false, timestamps: false }
);

const Objective = new Schema(
  {
    first: Boolean,
    kills: Number,
  },
  { _id: false, timestamps: false }
);

const teamSchema = new Schema(
  {
    bans: [Ban],
    objectives: {
      baron: Objective,
      champion: Objective,
      dragon: Objective,
      inhibitor: Objective,
      riftHerald: Objective,
      tower: Objective,
    },
    teamId: Number,
    win: Boolean,
  },
  { _id: false, timestamps: false }
);

module.exports = teamSchema;
