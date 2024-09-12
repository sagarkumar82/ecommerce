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
router.post("/filter", filtersBylogin);
router.get("/get-user-by-id/:id", getSingleUser);
router.post("/logout", logout);
router.post("/delete-user", deleteUser);
router.put("/update-user/:id", updateUser);
router.get("/test" , (req,res)=>{
  return res.status(200).json({
    message:"working url here"
  })
})

module.exports = router;
