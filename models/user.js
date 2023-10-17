const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new  mongoose.Schema({
    name: {
        type : String,
        required  : [true,'Name is required'],
        maxLength : [15,'Name should be of 15 charachter only.'],
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
},
    {
    timestamps: false,
  });

  userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.isNew) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });
  
  userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
module.exports = mongoose.model('User',userSchema);