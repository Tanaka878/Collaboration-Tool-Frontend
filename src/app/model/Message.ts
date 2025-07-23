import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    text: String,
    sender: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "messages" }
);

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
