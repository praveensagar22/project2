const express=require("express");
const bodyparser=require("body-parser");
const request=require("request")
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res){
  var crpto=req.body.crpto;
  var fiat=req.body.fiat;

  var baseurl="https://api.nomics.com/v1/currencies/ticker?key=6d353e1f51e95df01b83975b3f3b0fbdf1b96968&ids="+crpto+"&interval=1d,30d&convert="+fiat+"&per-page=100&page=1";


  //console.log(req.body.crpto);
  request(baseurl,function(error,response,body){
    //console.log(response.statusCode);
    //console.log(body)
    var key=JSON.parse(body);
    var value=key[0].price;
    //console.log(value);
    res.send("your" +crpto+ "rate is:"+value+ fiat);
  });

});
app.listen(4000,function(){
  console.log("your server as started at port:4000");

});
