const http = require("http");
const path = require("path");
const express = require("express");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const router = require("./routes");

const app = express();
app.use(express.urlencoded());
app.use(cookieParser());
app.use(session({ secret: "tdd" }));
app.use(flash());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

//create a server object:
http.createServer(app).listen(8080); //the server object listens on port 8080
