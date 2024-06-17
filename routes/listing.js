const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

const listingcontroller = require("../controller/listing.js");

router.route("/")
.get(wrapAsync(listingcontroller.index))//Index Route
.post(upload.single('listing[image]'),validateListing, wrapAsync(listingcontroller.createListing));//Create Route


//New Route
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingcontroller.showListing))//Show Route
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingcontroller.updateListing))//Update Route
.delete(isLoggedIn, isOwner, wrapAsync(listingcontroller.destroyListing));//Delete Route

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingcontroller.renderEditForm)
);

module.exports = router;