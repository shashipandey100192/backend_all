const express = require('express');
const myschimatype = require('../schematypes/globalschematype');


   const myapp = express.Router();

    myapp.get("/",(req,res)=>{
        // res.send("this is welcome");
        res.send("<h1>welcome to expressjs</h1>");
        
    });
    myapp.get("/about",(req,res)=>{
        res.send("welcome");
    });
    myapp.get("/contact",(req,res)=>{
        // res.send("this is page");
        // res.send(req.params);
        res.send(req.path);
        
    });
    myapp.get(/b/,(req,res)=>{
      
        // res.send("sdjfhjsdhf");
        // res.json({name:"kumar",age:20,phone:"541214542"});
        // res.render('<h1>this is page</h1>')
        // res.sendFile("about.html");
        // res.download("abc.html");
        // res.redirect("/xyz");
    });

    myapp.get("/alldata", async(req,res)=>{
        const alldatalist = await myschimatype.find();
        // console.log(alldatalist);
        res.send(alldatalist);
    });

myapp.post("/registor", async(req,res)=>{
    const {fullname,email,pass,dob,purl,gender} = req.body;
    const adduser = new myschimatype({
        fullname,email,pass,dob,purl,gender
    });
    await adduser.save();
});

myapp.delete("/removeuser/:id", async(req,res)=>{
    // const {name} = req.body
    // const deletedata = await myschimatype.deleteMany({name:name});
    const {id} = req.params;
    const deletedata = await myschimatype.deleteOne({_id:id})
    console.log(deletedata);
});





    




    module.exports = myapp