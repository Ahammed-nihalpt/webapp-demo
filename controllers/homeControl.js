const { render } = require("ejs");
const Users = require("../models/signUpModel");
let message = "";

const render_control = (req, res) => {
  const session = req.session;
  if (session.userid) {
    if (session.accountType == "admin") {
      res.redirect("/home/admin");
    } else if (session.accountType == "user") {
      res.redirect("/home/user");
    }
  } else {
    res.redirect("/");
  }
};

const admin_home_render = (req, res) => {
  const session = req.session;
  if (session.userid) {
    if (session.accountType == "admin") {
      res.render("admin/adminHome");
    }
  } else {
    res.redirect("/");
  }
};

const admin_view = (req, res) => {
  const session = req.session;
  let searchInput = req.body.search;
  console.log(req.body.search);
  if (session.userid && session.accountType == "admin") {
    if (searchInput) {
      console.log(searchInput);
      const search_result = Users.find({
        first_name: new RegExp(searchInput, "i"),
      })
        .then((result) => {
          console.log(result);
          res.render("admin/adminUserView", { allData: result, message });
          message = "";
        })
        .catch((err) => {
          message = "not found";
        });
    } else {
      const Allusers = Users.find({ account_type: "user" })
        .then((result) => {
          res.render("admin/adminUserView", { allData: result, message });
          message = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } else {
    res.redirect("/");
  }
};

const admin_create_user = (req, res) => {
  const session = req.session;
  if (session.userid && session.accountType == "admin") {
    res.render("admin/adminCreateUser", { message });
  } else {
    res.redirect("/");
  }
};

const admin_create_user_post = (req, res) => {
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
      res.redirect("/home/admin/users/create");
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
            message = "user created successfully";
            res.redirect("/home/admin/users");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        message = "password do not match";
        res.redirect("/home/admin/users/create");
      }
    }
  });
};

const admin_edit_user = (req, res) => {
  const session = req.session;
  if (session.userid && session.accountType == "admin") {
    const finding = Users.find({ _id: req.params.id })
      .then((result) => {
        const data = result;
        res.render("admin/editUser", { data });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/");
  }
};

const edit_post = (req, res) => {
  console.log(req.body);
  const update = Users.findOneAndUpdate(
    { _id: req.params.id },
    {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      dob: req.body.dob,
      gender: req.body.gender,
      phone: req.body.phoneNumber,
      qulification: req.body.qualification,
    }
  )
    .then((result) => {
      console.log(result);
      message = "User data updated";
      res.redirect("/home/admin/users");
    })
    .catch((err) => {
      console.log(err);
    });
};

const delete_user = (req, res) => {
  const det = Users.deleteOne({ _id: req.params.id })
    .then((result) => {
      message = "User deleted";
      res.redirect("/home/admin/users");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_home_render = (req, res) => {
  const session = req.session;
  if (session.userid && session.accountType == "user") {
    let name = session.username;
    res.render("user/userHome", { name });
  } else {
    res.redirect("/");
  }
};

module.exports = {
  render_control,
  admin_home_render,
  admin_view,
  delete_user,
  user_home_render,
  admin_edit_user,
  edit_post,
  admin_create_user,
  admin_create_user_post,
};
