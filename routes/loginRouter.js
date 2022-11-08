const express = require("express");
const router = express.Router();

const controller = require("../controllers/loginControl");

router.get("/", controller.login_render);
router.post("/", controller.login_post);
router.get("/logout", controller.logout);

module.exports = router;
