const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    ctc:{ type: String, required: true },
    opening:{ type: Number, required: true },
    comID:{ type: String, required: true },
    skill:{type: Array, required: true},
    applications: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    
}, {
    timestamps: true ,
    versionKey:false
});

const JOB= mongoose.model('Job', jobSchema);
module.exports = {
    JOB
}