const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Tool = require("../models/Tool.model");

const fileUploader = require("../config/cloudinary.config");

//  GET /api/tools -  Retrieves all tools
router.get("/tools", (req, res, next) => {
  Tool.find()
    .populate(["owner", "rentedby"])
    .then((allTools) => res.status(200).json(allTools))
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

//  POST /api/tools  -  Creates a new tool
router.post("/tools", fileUploader.single("imageUrl"), (req, res, next) => {
  const {
    name,
    price,
    imageUrl,
    details,
    status,
    from,
    to,
    city,
    location,
    owner,
    rentedby,
    feedback,
  } = req.body;

  Tool.create({
    name,
    price,
    imageUrl,
    details,
    status,
    from,
    to,
    city,
    location,
    owner,
    rentedby,
    feedback,
  })
    .then((response) => res.status(200).json(response))
    .catch((err) => res.json(err));
});

//  GET /api/tool/:toolId -  Retrieves a specific tool by id
router.get("/tool/:toolId", (req, res, next) => {
  const { toolId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(toolId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Tool.findById(toolId)
    .populate(["owner", "rentedby", "comment"])
    .populate({
      path: "comment",
      populate: {
        path: "author",
        model: "User",
      },
    })
    .then((tool) => res.status(200).json(tool))
    .catch((error) => res.json(error));
});

// PATCH  /api/tool/:toolId/edit  -  Updates a specific tool by id
router.patch("/tool/:toolId/edit", (req, res, next) => {
  const { toolId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(toolId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Tool.findByIdAndUpdate(toolId, req.body, { new: true })
    .then((updatedProject) => res.status(200).json(updatedProject))
    .catch((error) => res.json(error));
});

// PATCH route for changing status (available/rented)
router.patch("/tool/:toolId/:status", (req, res, next) => {
  const { toolId, status } = req.params;

  if (!mongoose.Types.ObjectId.isValid(toolId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  if (status === "available") {
    Tool.findByIdAndUpdate(
      toolId,
      { status: status, $set: { rentedby: [] } },
      { new: true }
    )
      .populate(["owner", "rentedby", "comment"])
      .populate({
        path: "comment",
        populate: {
          path: "author",
          model: "User",
        },
      })
      .then((response) => res.status(200).json(response))
      .catch((error) => res.json(error));
  } else {
    Tool.findByIdAndUpdate(toolId, { status: status }, { new: true })
      .populate(["owner", "rentedby", "comment"])
      .populate({
        path: "comment",
        populate: {
          path: "author",
          model: "User",
        },
      })
      .then((response) => res.status(200).json(response))
      .catch((error) => res.json(error));
  }
});

//PATCH route for changing rentedBy to actual user
router.patch("/tool/:toolId/:userId/rent", (req, res, next) => {
  const { toolId, userId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(toolId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Tool.findByIdAndUpdate(toolId, { rentedby: userId }, { new: true })
    .populate(["owner", "rentedby", "comment"])
    .populate({
      path: "comment",
      populate: {
        path: "author",
        model: "User",
      },
    })
    .then((response) => res.status(200).json(response))
    .catch((error) => res.json(error));
});

//GET route to delete tool
router.delete("/tool/:toolId/delete", (req, res, next) => {
  const { toolId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(toolId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Tool.findByIdAndDelete(toolId).then((response) => {
    Tool.find()
      .populate(["owner", "rentedby"])
      .then((allTools) => res.status(200).json(allTools))
      .catch((err) => res.json(err));
  });
});

module.exports = router;
