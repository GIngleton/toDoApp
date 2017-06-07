//this is where the code goes to control toDoList
//manipulates data, handles routes, etc.

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //use native mongoose promises

//Connect to the database
mongoose.connect('mongodb://test:test@ds111622.mlab.com:11622/enigma_to_do');

//Create a schema - similar to a blueprint
var toDoSchema = new mongoose.Schema({
  item: String   //expects an item that is a string
});

var ToDo = mongoose.model('ToDo', toDoSchema); //creates ToDo model type based on toDoSchema Schema


//var data = [{item: 'get soap'}, {item: 'feed cat'}, {item: "get oil change"}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/toDo', function(req, res){
    //get data from mongodb and pass it to the view
    ToDo.find({}, function(err, data){
      if(err) throw err;
      res.render('toDo', {toDos: data});
      //specifies which model or collection to get data from (ToDo model)
    });

  });

  app.post('/toDo', urlencodedParser, function(req, res){
    //get data from the view and add it to mongodb
    var newToDo = ToDo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/toDo/:item', function(req, res){
    //delete the requested item from mongodb
    ToDo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });
};
