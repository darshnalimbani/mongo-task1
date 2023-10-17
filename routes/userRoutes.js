const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router
    .get('/all',userController.getAllUsers)
    .get('/:id',userController.getUsers)
    // .post('/login',userController.login)
    .post('/signup',userController.createUser)
    // .post('/login',authController.userLogin)
    // .post('/signup',authController.userCreate)
    // .get('/:id',userController.getInfoById)
    .delete('/:id',userController.deleteUser)
    .put('/:id',userController.updateUser);
    
module.exports = router;