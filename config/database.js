// const dotenv = require("dotenv");
// dotenv.config();



// module.exports.connect = () => {
//     const mongoose = require("mongoose");
//     //const db="mongodb+srv://Optimistic31:Optimistic31@cluster0.5rz1n.mongodb.net/?retryWrites=true&w=majority";
//     mongoose
//       .connect(process.env.DB)
//       .then(() => {
//         console.log("connected");
//       })
//       .catch((error) => console.log(error));
//   };

const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};