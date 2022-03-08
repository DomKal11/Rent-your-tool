const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Tool = require("../models/Tool.model");
const Comment = require("../models/Comment.model");

const fileUploader = require("../config/cloudinary.config");

//  GET /api/tools -  Retrieves all
router.get("/tools", (req, res, next) => {
  Tool.find()
    .populate(["owner", "rentedby"])
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

//  POST /api/comment  -  Creates a new
router.post("/comment/:id", (req, res, next) => {
  const { id } = req.params;
  const { author, comment, rate } = req.body;

  console.log("Comment:", id, author, comment, rate);
  let newComment = new Comment({ author, text: comment, rate, tool: id });

  newComment
    .save()
    .then((savedComment) => {
      Tool.findByIdAndUpdate(id, {
        $push: { comment: savedComment._id },
      }, {new: true})
        .populate(["owner", "rentedby", "comment"])
        .populate({
          path: "comment",
          populate: {
            path: "author",
            model: "User",
          },
        })
        .then((response) => res.json(response));
    })
    .catch((err) => {
      console.log(`Error while creating comment: ${err}`);
      next(err);
    });
});

//POST route for changing status (available/rent)
router.post("/tool/:toolId/:status", (req, res, next) => {
  const { toolId, status } = req.params;

  Tool.findByIdAndUpdate(toolId, { status: status }, {new: true})
    .populate(["owner", "rentedby", "comment"])
    .populate({
      path: "comment",
      populate: {
        path: "author",
        model: "User",
      },
    })
    .then((response) => res.json(response));
});

//POST route for changing rentedBy to actual user
router.post("/tool/:toolId/:userId/rent", (req, res, next) => {
  const { toolId, userId } = req.params;

  Tool.findByIdAndUpdate(toolId, { rentedby: userId }, {new: true})
    .populate(["owner", "rentedby", "comment"])
    .populate({
      path: "comment",
      populate: {
        path: "author",
        model: "User",
      },
    })
    .then((response) => res.json(response));
});

//GET route to delete comment
router.get("/comment/:commentId/delete", (req, res, next) => {
  const { commentId } = req.params;

  Comment.findByIdAndDelete(commentId).then(() => console.log("deleted"));
});

module.exports = router;
