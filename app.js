const exp = require("constants");
const express = require("express");
const https = require("https");

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(port, function(){
    console.log("Server is started " + port);   
});

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req,res){
    let id = Number(req.body.pokemon);
    let url = "https://pokeapi.co/api/v2/pokemon/1" + id;
    let pokeImg = "https://pokeres.bastionbot.org/images/pokemon/" + id +".png";

        https.get(url, function(response){

            var responseData = "";
            response.on("data",function(dataChunk){
                responseData += dataChunk;
            });
            response.on("end", function(){
                var pokeinfo = JSON.parse(responseData);
                var pokemonName = pokeinfo.name;
                var pokeType= pokeinfo.types[0].type.name;
               
            res.write("<h1>Name of the pokemon you search is " + pokemonName + "<h1>");
            res.write("<img src=" + pokeImg + ">");
            res.write("<h3> The main type of the pokemon: " +pokeType);
            res.send();
            });
        });
});
