const mongoose = require("mongoose");
const DB_URI = `mongodb+srv://api:${process.env.MONGODB_PASSWORD}@primal-force-app.dg2cg0k.mongodb.net/primal-force-api?retryWrites=true&w=majority`;

module.exports = async () => {
  try {
    await mongoose.connect(DB_URI);
  } catch (e) {
    console.log("Could not connect to database");
  }
  console.log("Connected to database");
};
