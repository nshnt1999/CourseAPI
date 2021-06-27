const express = require("express");
const router = express.Router();
const Course = require("../models/Courses");

//Get all posts
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.json({ message: err });
  }
});

//submit a new post
router.post("/", async (req, res) => {
  const course = new Course({
    author:req.body.author,
    profile:req.body.profile,
    image:req.body.image,
    desc:req.body.desc,
    duration:req.body.duration,
    name:req.body.name,
    type:req.body.type,
    back:req.body.back,
    videos:req.body.videos
  });
  try {
    const savedCourse = await course.save();
    res.json(savedCourse);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});


//specific get
router.get("/:courseId", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    res.json(course);
  } catch (err) {
    res.json({ message: err });
  }
});

//update a product rating
// router.patch("/:postId/rating", async (req, res) => {
//   try{
//     const updatedProduct = await Product.updateOne(
//       { _id: req.params.postId },
//       { $set: { rating: req.body.rating, total_rating: req.body.total_rating } }
//     );
//     res.json(updatedProduct);
//   }
//   catch(err)
//   {
//     res.json({message: err});
//   }
// })

module.exports = router;
