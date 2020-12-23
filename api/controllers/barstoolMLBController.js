'use strict';

const fetch = require('node-fetch');
var mongoose = require('mongoose'),
MLB = mongoose.model('MLB');




exports.get_MLB_games = function(req, res) {

  MLB.find({}, function(err, game) {
    if(err){
      res.send(err);
    }else{
      
      //if no games for in the database it will call the getNBAScores function to get the game
      if(game.length != 0){
        
        //If date.now minus createdAt time is more than 15 min (900 seconds) it will fetch the data again and return it
        if(((Date.now() - game[0].updatedAt.getTime()) / 1000) < 15){
          
          res.json(game);

        }else{
          getMLBScores(res,game);
        }

      }else{
        getMLBScores(res,game);
      }
      

      
    }
      
    
  });
};



 function getMLBScores(res,game){

  //fetches game data from Barstool
  fetch('https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json')
     .then(response => {
       return response.json()
     })
     .then(data => {
       // Work with JSON data here
       
       const body = {name: JSON.stringify(data)};


       
      // if there is no game in database it will save it as a new entry, otherwise it will just update game and return it
       if(game.length == 0){
        
        var new_game = new MLB(body);
        new_game.save(function(err, game) {
          if (err)
            console.log(err)
          var array = [game];
          res.json(array);
         });

       }else{
         
        MLB.findOneAndUpdate({_id: game[0]._id}, body, {new: true}, function(err, game) {
          res.json([game]);
        });
       }

       
    
        
      
      
     })
     .catch(err => {
       // Do something for an error here
       console.log(err);
     })

  
  


  


}











