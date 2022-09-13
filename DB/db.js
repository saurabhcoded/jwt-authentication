// mongodb+srv://<username>:<password>@cluster.cirkd.mongodb.net/?retryWrites=true&w=majority
const mongoose = require("mongoose");

//connect
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlparser: true,
  })
  .then(() => {
    console.log("connected to mogngoDB");
  })
  .catch((Err) => {
    throw Err;
  });
