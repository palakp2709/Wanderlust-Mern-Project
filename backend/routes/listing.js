const express = require("express") ;
const router = express.Router();
const app = express()
const {isLoggedIn} = require("../middleware.js")

const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/expressError.js")
const Listing = require("../models/listing")

const listingController = require("../controller/listing.js")


//more compact way to write a route having same path;
router.route("/")   
.get( wrapAsync(listingController.index))  //Index Route
.post(isLoggedIn , wrapAsync( listingController.createListing))  // Create ROUTE --- login required


router.route("/:id")
.get( wrapAsync(listingController.showlisting))  //Show Route
.put( isLoggedIn ,  wrapAsync(listingController.updateListing)) // Update route  -- login required
.delete( isLoggedIn, wrapAsync(listingController.destroyListing)) // delete route -- login required

router.get("/search/:keyword" , wrapAsync(listingController.searchListing))
module.exports = router ;