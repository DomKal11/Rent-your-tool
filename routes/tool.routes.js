const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Tool = require("../models/Tool.model");

//  GET /api/tools -  Retrieves all 
router.get("/tools", (req, res, next) => {
  Tool.find()
    .populate("owner")
    .then((allTools) => res.json(allTools))
    .catch((err) => res.json(err));
});

//  POST /api/tools  -  Creates a new 
router.post("/tools", (req, res, next) => {
  const { name, price, image, details, status, date, county, location, owner, feedback } = req.body;

  Tool.create({ name, price, image, details, status, date, county, location, owner, feedback })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});


module.exports = router;
