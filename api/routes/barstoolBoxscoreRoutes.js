'use strict';
module.exports = function(app) {
  var NBA = require('../controllers/barstoolBoxscoreController');
  var MLB = require('../controllers/barstoolMLBController');

  // todoList Routes
  app.route('/NBA')
    .get(NBA.get_nba_games)
    

  app.route('/MLB')
    .get(MLB.get_MLB_games)
    
};