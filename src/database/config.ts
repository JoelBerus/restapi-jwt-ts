import mongoose from "mongoose";

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost/test"
    // , {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    // }
  )
  .then(db => console.log("DB is connected!!"))
  .catch(err => console.error(err));
