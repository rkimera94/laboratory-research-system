const mongoose = require("mongoose");

//connecting to the online server
//mongoose.connect();
//mongodb+srv://rkimera94:<password>@cluster0.f8q5u.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose
  .connect(process.env.MONGO_DB_URL, {
    dbName: process.env.DB_USER,
    user: process.env.MONGO_DB_NAME,
    pass: process.env.MONGO_DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected.......");
  })
  .catch((err) => console.log(err));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
/**
 * initialize mangoDB
 *
 * */

// local connection
/*
mongoose
  .connect("mongodb://localhost:27017/tutorial_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected.......");
  });
  */
