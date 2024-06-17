const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const usercontroller=require("../controller/user.js");

router.route("/signup")
.get(usercontroller.renderSignupForm)
.post(wrapAsync(usercontroller.Signup));

router.route("/login")
.get(usercontroller.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),usercontroller.login)

router.get("/logout",usercontroller.logout);

module.exports=router;