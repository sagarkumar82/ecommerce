const express = require("express");
const {
  register,
  user,
  login,
  filtersBylogin,
  getSingleUser,
  logout,
  deleteUser,
  updateUser
} = require("../controller/authController");

const router = express.Router();

// user-register-route
router.post("/register", register);
router.get("/all-user", user);
router.post("/login", login);
router.get("/get-user-by-id/:id", getSingleUser);
router.post("/logout", logout);
router.post("/delete-user", deleteUser);
router.put("/update-user/:id", updateUser);


module.exports = router;
