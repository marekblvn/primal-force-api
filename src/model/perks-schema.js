const mongoose = require("mongoose");
const { Schema } = mongoose;

const PerkStyleSelection = new Schema(
  {
    perk: Number,
    var1: Number,
    var2: Number,
    var3: Number,
  },
  { _id: false, timestamps: false }
);

const PerkStyle = new Schema(
  {
    description: String,
    selections: [PerkStyleSelection],
    style: Number,
  },
  { _id: false, timestamps: false }
);

const perksSchema = new Schema(
  {
    statPerks: {
      defense: Number,
      flex: Number,
      offense: Number,
    },
    styles: [PerkStyle],
  },
  { _id: false, timestamps: false }
);

module.exports = perksSchema;
