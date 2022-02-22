//jshint eversion:6//

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const { options, post } = require("request");


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
});
app.post("/",function(req,res){
    const FirstName=req.body.fname;
    const LastName=req.body.lname;
    const email=req.body.email;
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FName:FirstName,
                    LName:LastName,
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data)
    const url="https://us14.api.mailchimp.com/3.0/Lists/13a5b12cb3";
    const options={
        method:"post",
        auth:"KARUNTEJA1:9f0aa7a40ce6d6a13694e539f105d24a-us14"
    };

     const request=https.request(url,options,function(response){
         if(response.statusCode==200){
             res.sendFile(__dirname + "/success.html");
         }
         else{
            res.sendFile(__dirname + "/failure.html");
         }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();


});
app.post("/failure",function(req, res){
    res.redirect(__dirname+"/signup.html");
});


app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});
