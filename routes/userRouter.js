const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { authRequest } = require("../Middleware/authMiddleware");

router.post("/signup", userController.signup); // done 
router.post("/login", userController.login); // done 
router.get('/logout', userController.logout) // done 

router.use(authRequest)
router.get("/users", userController.getUsers); // done
router.put("/user", userController.updateUser); // done
router.put("/user/reset/password", userController.changePassword); // done
router.delete("/user", userController.deleteUser); // done
router.get("/user", userController.findUser); // done

module.exports = router;
