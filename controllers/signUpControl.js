const Users = require("../models/signUpModel");
// const Usres = require("../models/signUpModal");
var message = "";
const signUp_render = (req, res) => {
  res.render("userSignUP", { message });
  message = "";
};

const signUp_post = (req, res) => {
  let firstname = req.body.firstName;
  let lastname = req.body.lastName;
  let dob = req.body.dob;
  let gender = req.body.gender;
  let email = req.body.email;
  let phone = Number(req.body.phoneNumber);
  let password = req.body.password;
  let con_password = req.body.confirmPassword;
  let qulification = req.body.qualification;
  const checkRegestered = Users.findOne({ email: email }).then((result) => {
    if (result) {
      message = "Email is already registered";
      res.redirect("/signup");
    } else {
      if (password === con_password) {
        const user = new Users({
          first_name: firstname,
          last_name: lastname,
          dob: dob,
          gender: gender,
          email: email,
          phone: phone,
          password: password,
          qulification: qulification,
          account_type: "user",
        });
        user
          .save()
          .then((result) => {
            console.log(result);
            message = "successfully registered";
            res.render("successfull");
            message = "";
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        message = "password do not match";
        res.redirect("/signup");
      }
    }
  });
};

module.exports = {
  signUp_render,
  signUp_post,
};
