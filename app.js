const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){


  const query = req.body.cityname;
  const metric = "metric";
  const apikey = "######################";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+ apikey+"&q="+ query+"&units="+metric+"";
  https.get(url , function(response){


    response.on("data",function(data){
         const weatherdata = JSON.parse(data);
         const temp = weatherdata.main.temp;
         const desc = weatherdata.weather[0].description;
         const icon = weatherdata.weather[0].icon;
         const icon_url = "http://openweathermap.org/img/wn/"+icon + "@2x.png" ;
         res.write("<p>The weather in "+query+" is "+ desc + "<p>");
         res.write("<h1>The temp in "+ query +" is  "+ temp + " degrees Celcius</h1>");
         res.write("<img src="+icon_url+">");
         res.send();
    });



  });
});



app.listen(env.project.PORT,3000,function(){
      console.log("Server got started.....");
});
