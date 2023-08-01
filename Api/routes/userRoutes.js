const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.json({
        status: "error",
        message: "Please filled the all required field",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      // res.status(400);
      return res.json({
        status: "error",
        message:
          "User already exits with this email address try different address!",
      });
    }

    let user = await User.create({
      username,
      email,
      phone,
      password,
    });

    if (user) {
      return res.json({
        status: "sucess",
        message: "User sucessfully created",
      });
    }

    // console.log(username, email, phone, password);
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//Update the user

router.put("/update", async (req, res) => {
  try {
    let { username, phone, email, password, _id } = req.body;

    const updateData = {
      username,
      phone,
      email,
      password,
      _id,
    };
    console.log("update-", updateData);
    User.findByIdAndUpdate(_id, updateData)
      .then(async () => {
        let updatedUser = await User.findById(_id);
        return res.status(201).json(updatedUser);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  } catch (error) {
    console.log("erro", error);
    return res.status(404).json({
      error,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    await User.findByIdAndDelete(_id);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: "error",
        message: "User not found! Create Account",
      });
    }

    if (user.password != password) {
      return res.json({
        status: "error",
        message: "Passwoard not match! Enter correct Passwoard",
      });
    }

    res.status(200).json({
      status: "sucess",
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      password: user.password,
    });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
