const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  bio: {
    type: String,
    required: true,
    maxlength: 500,
  },
  profilePicture: {
    type: String,
    default: "defaultProfilePicUrl.jpg",
  },
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
  linkedin: { type: String, default: null },
  instagram: { type: String, default: null },
  github: { type: String, default: null },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

profileSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Profile = model("profile", profileSchema);

module.exports = Profile;
