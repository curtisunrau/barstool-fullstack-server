var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  Task = require('./api/models/barstoolBoxscoreModel'),
  MLB = require('./api/models/barstoolBoxscoreModel'), //created model loading here
  bodyParser = require('body-parser');
  var cors = require('cors')
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/barstooldb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

var routes = require('./api/routes/barstoolBoxscoreRoutes'); //importing route
routes(app); //register the route




app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});



app.listen(port);

console.log('Barstool Boxscore RESTful API server started on: ' + port);