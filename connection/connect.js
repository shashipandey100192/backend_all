const mongoose = require('mongoose');

    mongoose.connect('mongodb+srv://mernuser:supperpassword@cluster0.cqczybv.mongodb.net/mydatabase').then((res)=>{
        console.log("database connected");
    });