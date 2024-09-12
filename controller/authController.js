const UserRegister = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//register new user here
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "email is required",
      });
    }
    const isExisting = await UserRegister.findOne({ email });

    if (isExisting) {
      return res.status(400).json({
        message: "email already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const userEntry = new UserRegister({
      name,
      email,
      password: hashpassword,
    });

    const saveUser = await userEntry.save();

    res.status(200).json({
      message: "User registered successfuly",
      data: saveUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internel server error",
      error: error,
    });
  }
};

// get all user
exports.user = async (req, res) => {
  try {
    const record = await UserRegister.find().select("-password ");

    if (!record || record.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No record found",
      });
    }

    res.status(200).json({
      status: "OK",
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//user-login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: {
          email: "please provide email",
        },
      });
    }

    if (!password) {
      return res.status(400).json({
        message: {
          password: "please provide password",
        },
      });
    }

    const user = await UserRegister.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: {
          email: "invalid email",
        },
      });
    }

    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      return res.status(400).json({
        message: {
          password: "invalid password",
        },
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
      is_login: true,
    };

    const token = jwt.sign(payload, "fjhfhgfhegdfgsdajf", { expiresIn: "30d" });
    (user.token = token), (user.isLogin = true);

    await user.save();

    res.status(200).json({
      message: "login successfuly",
      isLogin: user.isLogin,
      token: user.token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internel server error",
      error: error.message,
    });
  }
};

// filter data  data by condition
exports.filtersBylogin = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name) {
      return res.status(400).json({
        error: "name is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        error: "email is required",
      });
    }
    const user = await UserRegister.find({ name, email });

    if (!user || user.length === 0) {
      return res.status(400).json({
        error: "No data found",
      });
    }
    res.status(200).json({
      status: "OK",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internel server error",
    });
  }
};

// get data of user by id

exports.getSingleUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        error: "Invalid id",
      });
    }

    const user = await UserRegister.findById(id).select("-password");

    if (!user) {
      res.status(400).json({
        error: "Invalid id",
      });
    }
    res.status(200).json({
      status: "OK",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internel server error",
      message: error,
    });
  }
};

// logout user
exports.logout = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({
        error: "Id is required",
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: "invalid id",
      });
    }
    const user = await UserRegister.findById(id);
    if (!user) {
      return res.status(400).json({
        error: "invalid id",
      });
    }

    (user.token = null), (user.isLogin = false);

    await user.save();

    res.status(200).json({
      isLogin: user.isLogin,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internel server error",
    });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        error: "Id is required",
      });
    }
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: "Invalid id",
      });
    }

    const deletedUser = await UserRegister.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(400).json({
        error: "No data found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "Deleted successfuly",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internel server error",
    });
  }
};

//update user profile
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid Id",
      });
    }
    const user = await UserRegister.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "Invalid Id",
      });
    }
    const { email, password, name } = req.body;

    // Check if the email is already in use by another user
    const isExistingEmail = await UserRegister.findOne({
      email,
      _id: { $ne: id },
    });
    if (isExistingEmail) {
      return res.status(400).json({
        message: "Email is already in use!",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const updatedhashed = await bcrypt.hash(password, salt);
    const updateUser = await UserRegister.findByIdAndUpdate(
      id,
      { email, password: updatedhashed, name },
      { new: true }
    );

    res.status(200).json({
      message: "User updated",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internel server error",
      error: error,
    });
  }
};
