const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
   username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyname:{ type: String, required: true },
}, {
    versionKey:false
});



const Company= mongoose.model('company', companySchema);
 module.exports= {
   Company
 }