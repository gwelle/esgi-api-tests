const auth = require('../middlewares/authenticate.middleware')
const { Router } = require("express");
const { UserController } = require("../controllers");
const router = new Router();


router.route("/login").post(UserController.login)
router.route("/users").post(auth.authenticate,UserController.register)
router.route("/users").get(auth.authenticate,UserController.getUsers)
router.route("/users/:id").get(auth.authenticate,UserController.getUserById)
router.route("/users/:id").put(auth.authenticate,UserController.updateUser)
router.route("/users/:id").delete(auth.authenticate,UserController.deleteUser)

module.exports = router;

