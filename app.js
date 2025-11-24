const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");

// EJS Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// DB Connection
main()
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

// Root Route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

const validateListing=(req,res,next)=>{
 let {error}=listingSchema.validate(req.body);
    console.log(result);
    if(error){
        let errMg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,error);
    }else{
        next(err);
    }
}

/* -------------------------------
   LISTING ROUTES
-------------------------------- */

// INDEX ROUTE
app.get("/listings", wrapAsync(async (req, res) => {
  let listings = await Listing.find({});
  res.render("./listings/index.ejs", { listings });
}));

// NEW ROUTE
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

// SHOW ROUTE
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) throw new ExpressError(404, "Listing Not Found");
  res.render("./listings/show.ejs", { listing });
}));

// CREATE ROUTE
app.post("/listings",validateListing, wrapAsync(async (req, res,next) => {
   
  let newListing = new Listing(req.body.listing);

  await newListing.save();
  res.redirect("/listings");
}));

// EDIT ROUTE
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) throw new ExpressError(404, "Listing Not Found");
  res.render("./listings/edit.ejs", { listing });
}));

// UPDATE ROUTE
app.put("/listings/:id", validateListing,wrapAsync(async (req, res) => {
    
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

// DELETE ROUTE
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
}));

/* -------------------------------
   404 PAGE NOT FOUND
-------------------------------- */

app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

/* -------------------------------
   GLOBAL ERROR HANDLER
-------------------------------- */

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("./listings/error.ejs",{message});
  //res.status(statusCode).send(message);
});

/* -------------------------------
   START SERVER
-------------------------------- */

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
