const express = require("express");
const router = express.Router();

const controller = require("../controllers/signUpControl");

router.get("/", controller.signUp_render);
router.post("/", controller.signUp_post);

module.exports = router;
