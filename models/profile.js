const mongoose = require('mongoose');

const profileSchema = new  mongoose.Schema({
    
    age: {
        type : Number,
        required  : [true,'Age is required'],
    },
    gender: {
        type: String,
        required: [true, 'Gender required'],
    },
    std: {
        type: String,
        required: [true, 'Class is required'],
    },
    photo: {
        type: String,
        // required: [true, 'Photo is required'],
    },
  
},
{
    timestamps: false,
});

module.exports = mongoose.model('Profile',profileSchema);