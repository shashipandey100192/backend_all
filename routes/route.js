const express = require('express');
const bcrypt = require('bcrypt');
const myschimatype = require('../schematypes/globalschematype');
const jwt = require("jsonwebtoken");


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
    // myapp.get(/b/,(req,res)=>{
      
    //     // res.send("sdjfhjsdhf");
    //     // res.json({name:"kumar",age:20,phone:"541214542"});
    //     // res.render('<h1>this is page</h1>')
    //     // res.sendFile("about.html");
    //     // res.download("abc.html");
    //     res.redirect("/xyz");
    // });

    const verifyToken = (req, res, next) => {
        const token = req.headers["authorization"];
    
        if (!token) {
            return res.status(403).json({ message: "Token is required" });
        }
    
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            req.user = decoded;
            next();
        });
    };

    


    myapp.get("/alldata", async(req,res)=>{
        const alldatalist = await myschimatype.find();
        res.send(alldatalist);
    });

myapp.post("/registor", async(req,res)=>{
    const {fullname,email,pass,dob,purl,gender} = req.body;
    const hashedPassword = await bcrypt.hash(pass, 10);
    const adduser = new myschimatype({
        fullname,email,pass:hashedPassword,dob,purl,gender
    });
    await adduser.save();
    res.status(200).json({message:"data successfully registor",statuscode:584});

});


myapp.delete("/removeuser/:id", async(req,res)=>{
    const {id} = req.params;
    const deletedata = await myschimatype.findByIdAndDelete({_id:id})
    console.log(deletedata);
    res.status(256).json(deletedata);
});


myapp.patch("/edituser/:id", async(req,res)=>{
    const {id} = req.params;
    const change = await myschimatype.findByIdAndUpdate(id, req.body, { new: true })
    res.status(258).json({mydata:change,msg:"successfully update",status:547});
});


myapp.get("/singlereocrd/:id", async(req,res)=>{
        const {id} = req.params;
    const sinle = await myschimatype.findById({_id:id});
    res.status(278).json(sinle);

});

// myapp.post("/loginpage", async(req,res)=>{
//    const {email,pass} = req.body;
//    const logindata = await myschimatype.findOne({email:email});
    
//    if(!logindata)
//     {
//         res.json({msg:"email not found",status:460});
//     }
//     else
//     {
//         const isMatch = await bcrypt.compare(pass, logindata.pass);
//         if(logindata.email===email && isMatch===true)
//         {
//             res.json({msg:"successfully login",status:240});
//         }
//         else
//         {
//             res.json({msg:"email and password not match",status:466});
//         }

//     }


//     // if(logindata.email==="" || logindata.pass==="")
//     // {
//     //     res.json({logindata:logindata,msg:"email id and password required",status:450});
//     // }
//     // else
//     // {
            
//     //         if(logindata.pass!==pass)
//     //             {
//     //                 res.json({msg:"increact pass",status:461});
//     //             }
//     //         if(logindata.email===email && logindata.pass===pass){
//     //             res.json({msg:"successfully login",status:240});
//     //         }

//     // }


// })

const SECRET_KEY = "dgdgdsdjkfsdhfshdfjkiofdhfgnfgh";
myapp.post("/loginpage", async (req, res) => {
    try {
        const { email, pass } = req.body;
        const logindata = await myschimatype.findOne({ email: email });

        if (!logindata) {
            return res.json({ msg: "Email not found", status: 460 });
        }

        const isMatch = await bcrypt.compare(pass, logindata.pass);
        if (isMatch) {
            // Generate JWT token
            const token = jwt.sign(
                { id: logindata._id, email: logindata.email }, 
                SECRET_KEY, 
                { expiresIn: "5m" }
            );

            return res.json({ msg: "Successfully logged in", status: 240, token });
        } else {
            return res.json({ msg: "Email and password do not match", status: 466 });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ msg: "Server error", status: 500 });
    }
});




    




    module.exports = myapp