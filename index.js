const express = require("express");

const { checkForAuthCookie } = require("./middlewares/authentication");

const app = express();

const PORT = 3000;

const mongoose = require("mongoose");

const cors = require("cors");

const path = require("path");

const userRouter = require("./routes/user");

const profileRouter = require("./routes/profile");

const cookieParser = require("cookie-parser");

// const postRouter = require("./routes/post");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthCookie("token"));

// Routes
app.use("/user", userRouter);
app.get("/chat", (req, res) => {
  return res.render("chat");
});
// app.use("/post", postRouter);
app.use("/profile", profileRouter);

// Database connectivity
mongoose
  .connect("mongodb://127.0.0.1:27017/social-media-app")
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));

// view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.join("./public" , "public")));

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
