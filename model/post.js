const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  cap: {
    type: String,
    required: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  img: {
    data: Buffer,
    contentType: String, 
  },
});

const Post = model("post", postSchema);

module.exports = Post;
