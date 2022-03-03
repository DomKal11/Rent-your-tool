const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const feedbackSchema = new Schema(
  {
    name: [{ type: Schema.Types.ObjectId, ref: "User" }],
    rate: Number,
    text: String,
    tool: [{ type: Schema.Types.ObjectId, ref: "Tool" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Feedback = model("Feedback", feedbackSchema);