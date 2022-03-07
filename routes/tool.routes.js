const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Tool = require("../models/Tool.model");
const Comment = require("../models/Comment.model");

const fileUploader = require("../config/cloudinary.config");

//  GET /api/tools -  Retrieves all 
router.get("/tools", (req, res, next) => {
  Tool.find()
    .populate([ 'owner', 'rentedby' ])
    .then((allTools) => res.json(allTools))
    .catch((err) => res.json(err));
});

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});

//  POST /api/tools  -  Creates a new 
router.post("/tools", fileUploader.single("imageUrl"), (req, res, next) => {
  const { name, price, imageUrl, details, status, from, to, county, location, owner, rentedby, feedback } = req.body;

  Tool.create({ name, price, imageUrl, details, status, from, to, county, location, owner, rentedby, feedback })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/tool/:toolId -  Retrieves a specific project by id
router.get("/tool/:toolId", (req, res, next) => {
  const { toolId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(toolId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Project document has `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  Tool.findById(toolId)
  .populate([ 'owner', 'rentedby', "comment" ])
    .then((tool) => res.status(200).json(tool))
    .catch((error) => res.json(error));
});


module.exports = router;
