const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

// Connect to Mongo
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected...");

    app.listen(PORT, () => {
      console.log("App running on: http://localhost:" + PORT);
    });
  })
  .catch((err) => console.log(err));
