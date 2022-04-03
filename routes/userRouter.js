const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/signup", userController.signup);
router.get("/users", userController.getUsers);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
router.put("/user/:id/reset/password", userController.changePassword);
router.get("/user/:id", userController.findUser);

module.exports = router;
