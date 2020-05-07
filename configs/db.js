const mongoose = require("mongoose");

module.exports.createConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};
