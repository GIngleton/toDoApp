var express = require('express'),
    toDoController = require('./controllers/toDoController');

var app = express();


//set up template engine (ejs)
app.set('view engine', 'ejs');


//serve up static files using built in middleware called express.static

//whenever assets route is used, it is going to map it to a file in /public
//app.use('/assets', express.static('./public'))

//instead, this looks for every route in the public folder
app.use(express.static('./public'));


//fire controllers
toDoController(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');
