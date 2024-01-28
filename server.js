const express = require("express");
const path = require("path");

const app = express();
const distPath = path.join(__dirname,"dist");
const assetsPath = path.join(distPath,"assets");

app.use("/",express.static(distPath));
app.listen(3000,()=>{
    console.log('server on http://localhost:3000');
});
