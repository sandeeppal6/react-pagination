const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const posts = require("./routes/Posts");

const app = express();
const PORT = 5000;

mongoose.connect(
  "mongodb://localhost/blog",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("connected to mongodb");
    }
  }
);

app.use(cors());
app.use(bodyParser.json());
app.use("/", posts);

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
