const express = require("express");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/Database",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("successfully connected");
    }
  }
);
app.use(
  sessions({
    secret: "acbdYE",
    saveUninitialized: true,
    resave: false,
  })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));

app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

const SignUpRoute = require("./routes/signUpRouter");
app.use("/signup", SignUpRoute);

const LoginRoute = require("./routes/loginRouter");
const HomeRoute = require("./routes/homeRouter");
app.get("/", (req, res) => {
  const session = req.session;
  console.log(session.userid);
  if (session.userid) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});

app.use("/home", HomeRoute);
app.use("/login", LoginRoute);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
