const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connectDB = require("./public/server/database/connection");

const app = express();

dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 8080;

//log request
app.use(morgan("tiny"));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "public/views"));

//load assets
app.use("/css", express.static(path.resolve(__dirname, "dist/css")));
app.use("/img", express.static(path.resolve(__dirname, "public/asset/img")));
app.use("/js", express.static(path.resolve(__dirname, "public/asset/js")));

//load routers
app.use("/", require("./public/server/routes/router"));

//listengin port
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
