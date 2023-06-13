const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query=req.body.cityname;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=ee962bbc9b345c990b5d6bbe7838ed60";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            const temp=weatherData.main.temp;
            const description=weatherData.weather[0].description;
            console.log(description);
            console.log(temp);
            console.log(query)
            // res.send("Temperature in guntur is :"+temp);
            // res.write("Temperature info");
            res.send("<h1>Temperature in " +query +" :"+temp+"<br/>The weather is currently: "+description+"</h1>");

        })
    });
});

app.listen(3000,function(){
    console.log("server trigerred safely");

});
