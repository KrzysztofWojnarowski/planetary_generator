const express = require("express");
const path = require("path");
let app = express();
let distPath = path.join(__dirname,"dist");
let assetsPath = path.join(distPath,"assets");
console.log(assetsPath);
app.use("/assets",express.static(assetsPath));
app.use("/dist",express.static(distPath));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.listen(3000,()=>{
    console.log('server on localhost:3000');
});
