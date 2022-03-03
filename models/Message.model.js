const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const messageSchema = new Schema(
  {
    sender: [{ type: Schema.Types.ObjectId, ref: "User" }],
    recipient: [{ type: Schema.Types.ObjectId, ref: "User" }],
    message: String,
    tool: [{ type: Schema.Types.ObjectId, ref: "Tool" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;