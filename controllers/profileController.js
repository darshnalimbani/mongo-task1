const express = require('express');
const Profile = require('../models/profile' );
const catchAsync = require('../error/catchAsync');
const profile = require('../models/profile');
const User = require('../models/user');

exports.addProfile = catchAsync(async(req,res,next) => {
    const {userId, age, gender, std} = req.body;
    const profile = await Profile.create({
        age, gender, std
    });

    const user = await User.findOne({_id:userId})

    user.profile=profile
    await user.save()

    console.log("user",user)

    if(profile)
    {
        res.status(201).json({ status : 'success', data : profile});
    }
    else
        res.status(500).json({ status : 'error', message : 'Failed to create the profile'});


});

//----Update Profile

exports.updateProfile = catchAsync(async(req, res,next) => {

    const isProfileExists = await Profile.findOne({ _id: req.params.id });
    if (!isProfileExists) {
        return res
        .status(404)
        .json({ status: "fail", message: "Profile does not exists!" });
    }
    const profile = await Profile.findByIdAndUpdate(req.params.id,{
        ...req.body});

    if(profile)
    {
        res.status(201).json({ status:'success', data:'profile'});
    }
});

//=== get

exports.getFullProfile = catchAsync(async (req, res) => {
    try {
    //   const profile = await Profile.findById(req.params.id).populate('user');
    const profile = await Profile.find();

      res.status(200).json({ status: "success", data: profile });
    } catch (error) {
      res.status(400).json({ status: "fail", message: error.message });
    }
});