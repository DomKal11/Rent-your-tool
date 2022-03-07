const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const toolSchema = new Schema(
  {
    name: String,
    price: Number,
    imageUrl: String,
    details: String,
    status: {type: String, default: "available"},
    from: Date,
    to: Date,
    city: String,
    location: [{ type: Number}],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    rentedby: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Tool = model("Tool", toolSchema);

module.exports = Tool;