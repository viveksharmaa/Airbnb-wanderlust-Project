const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const { populate } = require("../models/review.js");

const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Search Route
router.get("/search", async (req, res) => {
    const q = req.query.q?.trim();

    if (!q) {
        return res.redirect("/listings");
    }

    const listing = await Listing.findOne({
        $or: [
            { title: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } },
            { country: { $regex: q, $options: "i" } }
        ]
    });

    if (!listing) {
        req.flash("error", "No matching listing found!");
        return res.redirect("/listings");
    }

    res.redirect(`/listings/${listing._id}`);
});

router
.get("/", wrapAsync(listingController.index))
.post("/", isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createlisting));

router
.get("/:id", wrapAsync(listingController.showlisting))
.put("/:id", isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(listingController.updatelisting))
.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deletelisting));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editlisting));


module.exports = router;