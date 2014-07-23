var express = require("express");
var request = require("request"); // if you get "ReferenceError: request is not defined", look to see you required it

var count = 0
var app = express();
var movieQueue = []


app.set('view engine', 'ejs');

app.get('/', function(req, res){   //staying on same page but sending the values back 
  res.render('site/index');
});

app.get('/search', function(req, res){   //stayiig on same page but sending the values back 
  var query1 = req.query.searchTerm;    //req.query submit all search terms populates it here. The var query is taco. 
  var url = "http://www.omdbapi.com/?s=" + query1;	
  count+=1

  request(url, function(error, response, body){	
  		var data = JSON.parse(body) 
  		res.render("site/results", {ourCount: count, movieList: data.Search});     
  }); 
});

app.get('/addToQueue', function(req, res){
 
  var movieToAdd = req.query.queueValue;
  movieQueue.push(movieToAdd)
  res.render("queue/index", {ourMovieQueue :movieQueue});     


})


app.get('/movies/:id', function(req, res){   
  var filmId = req.params.id;    
  var url = "http://www.omdbapi.com/?i=" + filmId; 
  request(url, function(error, response, body){       
      var data = JSON.parse(body) 
      res.render("movies/index", {details: data || []} );      
  }); 
});  



// app.get('/queue', function(req, res){
//   var queue = grabbing the title from the onclick ....
//   //this will allow you to get to the particular page 
//   var url = "http://www.omdbapi.com/?i=" + filmId; 
//   request(url, function(error, response, body){       
//       var data = JSON.parse(body) 
//       res.render("movies/index", {details: data || []} );      
//   }); 

// });





app.listen(3000); 

//server sitting there waiting for connections, get / post / delete / put requests (api from http server), we tell it to onlly listen to get requests on that specific home page 
