const mongoose = require('mongoose');

const Basictype = new mongoose.Schema({
    fullname:{
        type:String,
        require:true,
    },
    dob:{
        type:String
    },
    email:{
        type:String
    },
    pass:{
        type:String
    },
    gender:{
        type:String
    },
    purl:{
        type:String
    }
});


const myschimatype = mongoose.model("basicdata",Basictype);
module.exports = myschimatype



