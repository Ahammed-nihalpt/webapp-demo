// const { validate } = require("../../models/signUpModel");

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  var flag = 0;
  flag = validateInputs();
  if (flag == 1) {
    event.preventDefault();
  }
});

function onlyLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function validateInputs() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const dob = document.getElementById("birthdayDate").value;
  const emailAddress = document.getElementById("emailAddress").value;
  const phoneNumber = Number(document.getElementById("phoneNumber").value);
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;
  if (
    firstName.length == 0 ||
    lastName.length == 0 ||
    emailAddress.length == 0 ||
    phoneNumber.toString().length == 0 ||
    password.length == 0 ||
    confirm_password.length == 0
  ) {
    alert("Enter data in all fields");
    return 1;
  } else {
    const age = calage(dob);
    if (!onlyLetters(firstName.trim())) {
      alert("First name should only contain LETTERS");
      return 1;
    } else if (!onlyLetters(lastName.trim())) {
      alert("Last name should only contain LETTERS");
      return 1;
    } else if (age < 12 || age > 100) {
      alert("invalid date of birth");
      return 1;
    } else if (phoneNumber.toString().length != 10 || isNaN(phoneNumber)) {
      alert("enter valid phone number");
      return 1;
    } else if (password.length < 8) {
      alert("Password length must be atleast 8 characters");
      return 1;
    } else if (password.length > 15) {
      alert("Password length must not exceed 15 characters");
      return 1;
    } else {
      return 0;
    }
  }
}

function calage(dob) {
  var dobcal = new Date(dob);
  var month_diff = Date.now() - dobcal.getTime();
  var age_dt = new Date(month_diff);
  var year = age_dt.getUTCFullYear();
  var age = Math.abs(year - 1970);
  return age;
}
