var express     = require('express');
var pg          = require('pg');
var bodyParser  = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//to serve up static resources.(etc. js/message.js)
app.use(express.static("/"));
app.use("/js", express.static(__dirname + '/js'));

var connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletin_board';

app.get("/", function(req, res){
  res.redirect("/messages");
});

app.get("/messages", function(req, res){
  pg.connect(connectionString, function(err, client, done){
    client.query('select * from messages', function(err, result){
      console.log(result.rows);
      res.render('messages',{messages: result.rows});
    });
  });
});

app.post("/messages", function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var title = req.body.title;
    var body = req.body.body;
    console.log("title is "+title);
    client.query(`insert into messages(title, body) values('${req.body.title.replace("'","''")}', '${req.body.body.replace("'","''")}');`);
    if(err){
      console.log("Error adding message!");
    }
    else{
      console.log("Added Message!");
    }
    done();
    pg.end();
    res.redirect('/messages');
  });
});

app.get("/messages/:id", function(req, res){
  console.log("yoo i'm trying to get a specific message");
  pg.connect(connectionString, function(err, client, done){
    console.log(req.params.id);
    client.query(`select * from messages where id='${req.params.id}'`,function(err, result){
      done();
      pg.end();
      if(err){
        console.log(err);
      }
      else{
        res.render("message",{message: result.rows[0]});
      }

    });
  });
});

app.get("/delete/messages/:id", function(req, res){
  pg.connect(connectionString, function(err, client, done){
    client.query(`delete from messages where id='${req.params.id}'`,function(err,result){
      done();
      pg.end();
      res.redirect("/messages");
    });
  });
});

app.post("/update/messages/:id", function(req, res){
  console.log("update page");
  pg.connect(connectionString, function(err, client, done){
    client.query(`update messages set title='${req.body.title.replace("'","''")}', body='${req.body.body.replace("'","''")}' where id='${req.params.id}'`,function(err, result){
      if(err){
        console.log(err);
      }
      res.redirect("/messages/"+req.params.id);
      done();
      pg.end();
    });



  });
});


app.listen(3000, function(){
  console.log("yeet");
});
