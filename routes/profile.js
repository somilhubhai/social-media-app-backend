const express = require("express");
const Profile = require("../model/profile");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// add-bio post request
router.post("/add-profile", async (req, res) => {
  const { bio, instagram, github, linkedin } = req.body;
  try {
    const profile = await Profile.create({
      bio,
      instagram,
      github,
      linkedin
    });
    if (profile) return res.json({ success: true, profile: profile });
  } catch (error) {
    return res.json({ error: error.message });
  }
});
// get profile route

router.get("/get-info" , (req , res) => {

})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/uploads", upload.single("profilePicture"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  console.log("Image uploaded");
});

module.exports = router;
