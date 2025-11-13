const express = require("express");
const app =express();
const mongoose = require("mongoose");
const path=require("path");
const Listing=require("./models/listing");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "public")));
main().then(()=>{
    console.log("connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.get("/",(req,res)=>{
    res.send("Hii, I am root");
})
// app.get("/testlisting",async(req,res)=>{
//     let sampleListing = new Listing({
//         title:"My new villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute,Goa",
//         country:"India"
//     });
//     await sampleListing.save();
//     console.log(sampleListing);
//     res.send("data successfull");
// })

// Index Route
app.get("/listings",async(req,res)=>{
    let listings=  await Listing.find({});
    res.render("./listings/index.ejs",{listings});
})
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
})
//show Route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});

})

// Create Route
app.post("/listings",async(req,res)=>{
    //let {title,description,image,price,location,country}=req.body;
    let newListing= new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

})

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
})
//update riute
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})
// delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})

app.listen(3000,()=>{
    console.log("server is listening");

});
