const express = require('express');
const { Course } = require('../modal/course');
const CourseRouter = express.Router()

CourseRouter.get("/course" , async(req,res) => {
    try {
      const data = await Course.find()
        res.send(data)
      
    } catch (error) {
        res.send({message:"Something Went happened" , err:error})
    }   
})
CourseRouter.get("/course/:id", async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        
        if (!course) {
            return res.status(404).send({ message: "Course not found" });
        }

        res.send(course);
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error });
    }
});

module.exports = {CourseRouter}