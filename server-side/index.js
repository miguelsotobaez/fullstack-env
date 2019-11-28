// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();
// Import Request
let Request = require('request');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/server', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running Server on port " + port);
});

// Creating News Schema
var Schema = mongoose.Schema
var newsSchema = new Schema({
     title: String,
     author: String,
     date: Date,
     story: String
}, {collection: 'news'})

var News = mongoose.model('news', newsSchema);

// Get data from HN
let data = null;
let apiData =  null;
Request.get("https://hn.algolia.com/api/v1/search_by_date?query=nodejs", (error, response, body) => {
     if(error) {
          return console.dir(error);
     }else{
          data = JSON.parse(body);

          db.collection('news').deleteMany({});
          var newData = null;
          for (var i in data.hits) {
               var title = null;
               if(data.hits[i].title == null){
                    title = data.hits[i].story_title;
               }else{
                    title = data.hits[i].title;
               }
               newData = new News({
                    title: title,
                    author: data.hits[i].author,
                    date: data.hits[i].created_at,
                    story: data.hits[i].comment_text
               });
               db.collection('news').insertOne(newData);
          }
          
          
          News.find({}, function (err, docs) {
               apiData = docs;
          });
     }
    
    
});


// Send data for default URL
app.get('/', (req, res) => res.send(apiData));

