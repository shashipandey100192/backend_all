const mongoose = require('mongoose');

const Basictype = new mongoose.Schema({
    name:{},
    phone:{},
    email:{},
    pass:{}
});


const myschimatype = mongoose.model("basicdata",Basictype);
module.exports = myschimatype



