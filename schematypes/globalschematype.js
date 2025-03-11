const mongoose = require('mongoose');

const Basictype = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minLength:[4,"ooooo"]

    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    pass:{
        type:String
    }
});


const myschimatype = mongoose.model("basicdata",Basictype);
module.exports = myschimatype



