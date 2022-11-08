const express = require("express");
const router = express.Router();
const controller = require("../controllers/homeControl");
const { route } = require("./loginRouter");

router.get("/", controller.render_control);
router.get("/admin", controller.admin_home_render);
router.get("/user", controller.user_home_render);
router.get("/admin/users", controller.admin_view);
router.post("/admin/users", controller.admin_view);
router.get("/admin/users/create", controller.admin_create_user);
router.post("/admin/users/create", controller.admin_create_user_post);

router.get("/admin/users/edit/:id", controller.admin_edit_user);
router.post("/admin/users/edit/:id", controller.edit_post);
router.get("/admin/users/delete/:id", controller.delete_user);

module.exports = router;
