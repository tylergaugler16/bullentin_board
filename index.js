var express     = require('express');
var pg          = require('pg');
var bodyParser  = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/ttp_tyler';

app.get("/", function(req, res){
  redirect("/messages");
});

app.get("/messages", function(req, res){
  console.log("trying to go to messges");
  pg.connect(connectionString, function(err, client, done){
    client.query('select * from messages', function(err, result){
      res.render('messages',{messages: result.rows});
    });
  });
});



app.listen(3000, function(){
  console.log("yeet");
});
