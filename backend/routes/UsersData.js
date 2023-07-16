const express = require("express");
const UserModel = require("../models/UserModel");

const router = express.Router();

router.post("/getUserData", async (req, res) => {
  try {
    if (req.body.email) {
      let UserData = await UserModel.find({email : req.body.email});

      res.json({ success: true, status: 400, isAdmin : UserData[0].isAdmin });
    }
    else{
      let Userdata = await UserModel.find({});

      // This user is permanent admin no one can change his status
      Userdata = Userdata.filter(item=>{return item.email !== "sumitsatre03@gmail.com"});

      res.json({ success: true, status: 400, Userdata });
    }
  }
  catch (error) {
    res.json({ success: false, status: 400, message: error.message });
  }
})

router.post("/updateUserAdminStatus", async (req, res) => {
  try {
    await UserModel.findOneAndUpdate(
      { email: req.body.email },
      { $set: { isAdmin: req.body.userStatus } }
    );

    res.json({ success: true, status: 400 });
  } catch (error) {
    res.json({ success: false, status: 400, message: error.message });
  }
});


router.post("/deleteUser", async (req, res) => {
  try {
    let Userdata = await UserModel.deleteOne({ email: req.body.email });

    res.json({ success: true, status: 400, Userdata });
  }
  catch (error) {
    res.json({ success: false, status: 400, message: error.message });
  }
})

module.exports = router;