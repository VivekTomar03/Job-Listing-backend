const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
   title: { type: String, },
    image: { type: String,  },
    price: { type: Number, },
    rating:{ type: String,  },
}, {
    versionKey:false
});



const Course= mongoose.model('course', courseSchema);
 module.exports= {
   Course
 }