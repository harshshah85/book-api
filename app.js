var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

var db;
if(process.env.ENV == "Test")
  db = mongoose.connect('mongodb://127.0.0.1:27017/bookAPI_Test');
else {
   db = mongoose.connect('mongodb://127.0.0.1:27017/bookAPI');
}

var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);

app.get('/', function(req, res){
  res.send('Welcome to some Book API!');
});

app.listen(port, function(){
  console.log('Running on port: ' + port);
})

module.exports = app;
