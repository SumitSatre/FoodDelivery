const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const jwt = require("jsonwebtoken");

const userModel = require("../models/UserModel.js");

/* Bcrypt turns a simple password into fixed-length characters called a hash. Before hashing a password,
 bcrypt applies a salt — a unique random string that makes the hash unpredictable */
const bcrypt = require("bcryptjs");

// This api is created for the SignUp procedure of the user
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }).withMessage("Incorrect Password"),
    body("name").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ success: false, status: 400, errors: errors.array() });
      return;
    }

    try {
      // This is used if user already exist in database he cannot create an new account
    let checkEmail = await userModel.find({email : req.body.email});

    if(checkEmail.length > 0){
      return res.json({ success: false, status: 400, message: "User Already Exist!!" });
    }

    // Here bcrypt used first generated salt and that is added in hash
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);

    
      // first we create the user -- the end of sign up 
      await userModel.create({
        name : req.body.name,
        password : securePassword,
        email : req.body.email,
        location : req.body.location,
        isAdmin : false
      });
      res.status(201).json({ success: true });
    } catch (error) {
      res.json({ success: false, status: 400, message: error.message });
    }
  }
);

// This api is created for the login procedure of the user

router.post("/loginuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }).withMessage("Incorrect Password")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ success: false, status: 400, errors: errors.array() });
      return;
    }

    let email = req.body.email;

    // console.log(req.body);

    try {
      let userData = await userModel.findOne({email});

      if (!userData) {
        return res.json({ success: false, status: 400, message: "Please!! Enter Correct Email" });
      }

      // This is used to compare password hash with simple password returns true if same else false 
      const pwdCompare = await bcrypt.compare( req.body.password , userData.password);

      if (!(pwdCompare)) {
        return res.json({ success: false, status: 400, message: "Please!! Enter Correct Password" });
      }

      // Auth Token using json web token (jwt) --> created and passed to frontend 

      const data = {
        user : {
          id : userData._id
        }
      }
      
      // It generates a JWT token by signing the data with a secret key.
      const authToken = jwt.sign(data , process.env.JWtSecret);

      return res.status(201).json({ success: true , authToken : authToken});
    }
    catch (error) {
      res.json({ success: false, status: 400, message: error.message });
    }
  }
);


module.exports = router;


/* 
req.body.email --> In this frontend using POST request send email to the body which accessed by backend
*/

/*
JWT Token :
    token is generated in the backend when user logged in and then this token is passed to the frontend 
    then frontend store this token is stored in the local Storage it is used to verify user logged in or 
    not when user logOut this token get removed and Starting screen is showed to the user
*/