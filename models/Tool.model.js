const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const toolSchema = new Schema(
  {
    name: {
      type: String,
    },
    price: Number,
    image: String,
    details: String,
    status: String,
    date: Date,
    location: String,
    owner: [{ type: Schema.Types.ObjectId, ref: "User" }],
    feedback: [{ type: Schema.Types.ObjectId, ref: "Feedback" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Tool = model("Tool", toolSchema);

module.exports = Tool;