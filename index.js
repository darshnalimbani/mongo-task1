const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// monogodb connection
mongoose.connect('mongodb://127.0.0.1:27017/user')
    .then( () => console.log('Connected to the database...') )
    .catch( err => console.error('error in connecting ...',err))
  
    app.use('/', require('./routes'));

    const PORT = 8000;
    
    app.listen(PORT, () => {
        console.log('Application is Listening on Port', PORT);
    });
module.exports = app;