const express = require('express');
const router = express.Router();
const userRouter = require('./userRoutes');
const profileRouter = require('./profileRoutes');


router.use('/check', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: "Server is Running",
    });
});

router.use('/user',userRouter);
router.use('/profile',profileRouter);

module.exports = router;