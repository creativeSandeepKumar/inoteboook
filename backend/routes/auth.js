// Routing for create user, login user, getuser details
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");


const JWT_SECRET = "Harryisagood$oy";

// Route:1 - create a user using : post "/api/auth/createuser". No Login required
// logic - set router as post with api enpoint createuser then set name, email, password as body and check validation
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid name").isEmail(),
    body("password", "Password must be at least 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // start async function -
    // if validation false then success false and return a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // if validation good then check whether user with this email already exists - if exists then return a bad request
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: "Sorry a user with this email already exist",
          });
      }
      // use  bcrypt, hash and salt on user password as secpass
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create a user - using name, email, password
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // assign users in data object with their id

      const data = {
        user: {
          id: user.id,
        },
      };

      // assign jwt with users data and jwt_secret as authtoken
      const authtoken = jwt.sign(data, JWT_SECRET);
      // if success true then send authoken as res json else return a bad requests
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// Route: 2 - authenticate a user using post "/api/auth/login". No login required
// set post req and login api endpoint as router
router.post(
  "/login",
  [
    // set email and name as body and check their validation
    // async function
    // initially set success false
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blanked").exists(),
  ],
  async (req, res) => {
    let success = false;
    // if validation error then return a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // define named email and password from req body
    const { email, password } = req.body;
    // find user with email
    // if user email not found return a bad request
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      // deaclare passwordCompare to comapre password and user password with bcrypt
      const passwordCompare = await bcrypt.compare(password, user.password);

      // if not password compared then success false and return a bad request
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }
      // deaclare data obj to store user with id
      const data = {
        user: {
          id: user.id,
        },
      };
      // declare authtoken to assign jwt on data and jwt_secret
      // success set true and success and authtoken as res json
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
      // catch error as internal server error
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// Route: 3 - Get loggedIn user details using: post "/api/auth/getuser" login required
//  router set post req as getuser api endpoint with fetchuser middleware to verify token with jwt and jwt_secret
// async function -
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    // set userId as req to user with id
    // declare user to finde user with their id and with password
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
    // send user as response
    // catch internal server error
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
