const mongoose = require("mongoose");

module.exports.createConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};
