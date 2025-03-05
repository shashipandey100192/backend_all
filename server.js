const express = require('express');
require('dotenv').config();
const myapp = express();
const port = process.env.PORT || 4500;


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
    })





myapp.listen(port,()=>{
    console.log(`backend is running: ${port}`);
})