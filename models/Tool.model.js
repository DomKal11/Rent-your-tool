const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const toolSchema = new Schema(
  {
    name: String,
    price: Number,
    image: String,
    details: String,
    status: String,
    from: Date,
    to: Date,
    county: String,
    location: [{ type: Number}],
    owner: [{ type: Schema.Types.ObjectId, ref: "User" }],
    rentedby: [{ type: Schema.Types.ObjectId, ref: "User" }],
    feedback: [{ type: Schema.Types.ObjectId, ref: "Feedback" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Tool = model("Tool", toolSchema);

module.exports = Tool;