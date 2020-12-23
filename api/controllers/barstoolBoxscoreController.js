'use strict';

const fetch = require('node-fetch');
var mongoose = require('mongoose'),

Task = mongoose.model('Tasks');


exports.get_nba_games = function(req, res) {

  Task.find({}, function(err, task) {
    if(err){
      res.send(err);
    }else{
      
      //if no games for in the database it will call the getNBAScores function to get the game
      if(task.length != 0){
        
        //If date.now minus createdAt time is more than 15 min (900 seconds) it will fetch the data again and return it
        if(((Date.now() - task[0].updatedAt.getTime()) / 1000) < 15){
          
          res.json(task);

        }else{
          getNBAScores(res,task);
        }

      }else{
        getNBAScores(res,task);
      }
      

      
    }
      
    
  });
};



 function getNBAScores(res,task){

  //fetches game data from Barstool
  fetch('https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json')
     .then(response => {
       return response.json()
     })
     .then(data => {
       // Work with JSON data here
       
       const body = {name: JSON.stringify(data)};


       
      // if there is no game in database it will save it as a new entry, otherwise it will just update game and return it
       if(task.length == 0){
        
        var new_task = new Task(body);
        new_task.save(function(err, task) {
          if (err)
            console.log(err)
          var array = [task];
          res.json(array);
         });

       }else{
         
        Task.findOneAndUpdate({_id: task[0]._id}, body, {new: true}, function(err, task) {
          res.json([task]);
        });
       }

       
    
        
      
      
     })
     .catch(err => {
       // Do something for an error here
       console.log(err);
     })

  
  


  


}


