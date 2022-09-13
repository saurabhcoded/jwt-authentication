const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
  hashingPassword,
} = require("../validation");

//register route
router.post("/register", async (req, res) => {
  //   Validate data before saving
  const validated = await registerValidation(req.body);
  if (!validated.error) {
    try {
      //Check if user already registered
      const emailCheck = await User.findOne({ email: req.body.email });
      if (emailCheck)
        return res
          .status(403)
          .send({ message: "User Already Registered", status: "error" });

      //hash the password
      const hashedPassword = await hashingPassword(req.body.password);

      const user = new User({
        name: validated.value.name,
        email: validated.value.email,
        password: hashedPassword,
      });
      const savedUser = await user.save(user);
      //Jsonweb token authorization
      const Json_Token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.status(200).send({
        jwt: Json_Token,
        user: { id: user._id, name: user.name, email: user.email },
        message: "new user saved succcessfuly",
        status: "success",
      });
    } catch (error) {
      res.status(404).send({ message: "Server Error", status: "error" });
    }
  } else {
    res.status(404).send({
      message: validated.error.message,
      status: "error",
    });
  }
});
//Login route
router.post("/login", async (req, res) => {
  const validated = loginValidation(req.body);
  if (!validated.error) {
    try {
      //Check if email already exist
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(302).send({
          message: "email or password is incorrect",
          status: "error",
        });

      //Check if password is valid
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (validPass) {
        //Jsonweb token authorization
        const Json_Token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        return res.status(200).send({
          jwt: Json_Token,
          user: { id: user._id, name: user.name, email: user.email },
          message: "Logged in SuccessFully",
          status: "success",
        });
      } else {
        res
          .status(390)
          .send({ message: "Password or email is invalid", status: "error" });
      }
    } catch (err) {
      res.status(404).send({ message: "Server Error", status: "error" });
    }
  } else {
    res.status(404).send({
      message: validated.error.message,
      status: "error",
    });
  }
});

module.exports = router;
