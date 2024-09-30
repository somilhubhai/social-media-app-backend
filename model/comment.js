const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  },
  { timestamps : true }
);


const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;