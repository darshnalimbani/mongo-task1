const User = require("../models/user");
const Profile = require("../models/profile");
const catchAsync = require("../error/catchAsync");
const AppError = require("../error/AppError");

exports.getAllUsers = catchAsync(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
});

exports.getUsers = catchAsync(async (req, res) => {
  try {
    const users = await User.findById(req.params.id).populate('profile');
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await User.findOne({ email }).select("+password name email");
  if (user) {
    return next(new AppError("Email is already in use", 401));
  }
  await User.create({
    name: name,
    email: email,
    password: password,
  });
  res.status(200).json({
    status: "success",
    message: "User Created",
  });
});



// Update user

exports.updateUser = catchAsync(async (req, res) => {
  const isUserExists = await User.findOne({ _id: req.params.id });
  if (!isUserExists) {
    return res
      .status(404)
      .json({ status: "fail", message: "User does not exists!" });
  }

  const user = await User.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });
  if (user) {
    res.status(200).json({ status: "success" });
  }
});


// Delete user

exports.deleteUser =  catchAsync(async(req,res,next) => {
    const user = await User.findByIdAndDelete(req.params.id);

  if (user) {
    res.status(200).json({ status: 'success', message: 'User deleted successfully' });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'User not found'
    });
  }
});


// login

// exports.login =  catchAsync(async(req,res,next) => {
//   const { email, password } = req.body;
//     // 1) Check if email and password exist
//     if (!email || !password) {
//         return next(new AppError('Please provide email and password!', 400));
//     }

//      // 2) Check if user exists && password is correct
//      const user = await User.findOne({ email }).select('password name email');
//      console.log("user", user)   
//   const user = await User.findByIdAndDelete(req.params.id);

// if (user) {}
// });
//  get all info
// exports.getInfoById = catchAsync(async(req, res,next) => {

//   const isUserExists = await User.findOne({ _id: req.params.id });
//   if (!isUserExists) {
//       return res
//       .status(404)
//       .json({ status: "fail", message: "User does not exists!" });
//   }
//   const user = await User.findById(req.params.id).populate(Profile);

//   const studentInfo = {
//     name: user.name,
//     email: user.email,
//     profile: user.profile, // This will contain the populated "profile" data
//   };
//   if(user)
//   {
//       res.status(201).json({ status:'success', data: studentInfo});
//   }
// });