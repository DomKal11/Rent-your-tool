const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Tool = require("../models/Tool.model");
const Comment = require("../models/Comment.model");

//  POST /api/comment  -  Creates a new
router.post("/comment/:id", (req, res, next) => {
  const { id } = req.params;
  const { author, comment, rate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  let newComment = new Comment({ author, text: comment, rate, tool: id });

  newComment
    .save()
    .then((savedComment) => {
      Tool.findByIdAndUpdate(
        id,
        {
          $push: { comment: savedComment._id },
        },
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
        .then((response) => res.status(200).json(response));
    })
    .catch((error) => res.json(error));
});

//GET route to delete comment
router.delete("/comment/:toolId/:commentId/delete", (req, res, next) => {
  const { toolId, commentId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(toolId) ||
    !mongoose.Types.ObjectId.isValid(commentId)
  ) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Comment.findByIdAndDelete(commentId)
    .then((response) => {
      Tool.findByIdAndUpdate(
        toolId,
        { $pull: { comment: { $in: [commentId] } } },
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
    })
    .catch((error) => res.json(error));
});

module.exports = router;
