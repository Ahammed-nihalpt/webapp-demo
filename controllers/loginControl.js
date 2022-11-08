const Users = require("../models/signUpModel");
let message = "";
const login_render = (req, res) => {
  const session = req.session;
  if (session.userid) {
    if (session.accountType == "admin") {
      res.redirect("/home/admin");
    } else {
      res.redirect("/home/user");
    }
  } else {
    res.render("login", { message });
    message = "";
  }
};

const login_post = (req, res) => {
  const { email, password } = req.body;
  const UserLogin = Users.findOne({ email: email, password: password })
    .then((result) => {
      if (result) {
        var session = req.session;
        session.userid = result.email;
        if (result.account_type == "admin") {
          session.accountType = result.account_type;
          res.redirect("/home/admin");
        } else if (result.account_type == "user") {
          session.accountType = result.account_type;
          session.username = result.first_name + " " + result.last_name;
          res.redirect("/home/user");
        }
      } else {
        message = "Invalid Email or Password";
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const logout = (req, res) => {
  var session = req.session;
  session.destroy();
  console.log("logout");
  res.redirect("/");
};

module.exports = {
  login_render,
  login_post,
  logout,
};
