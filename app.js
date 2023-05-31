
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");  // this is locally exported file for providng current date and day

const app = express();

const items = [];
const workItems = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req,res){


  let day = date.getDate();
  res.render("list", {listTitle : day , newListItems : items});

});


app.post("/", function(req,res){

  const item = req.body.newItem;

  if (req.body.button === "Work"){
      workItems.push(item);
      res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
  console.log(req.body);



});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work list", newListItems:workItems });
});


app.listen(3000, function(req,res){

  console.log("Server started at port 3000.");
});
