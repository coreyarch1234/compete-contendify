//Express Set
var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var bodyParser = require('body-parser');
//Allows you to use req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// getting-started.js Mongoose
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/compete-contendify');

//Jwt and cookies
var jwt = require('express-jwt');
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//Authentication
app.use(jwt({
    secret: 'shhhhhhared-secret',
    getToken: function fromHeaderOrCookie (req) { //fromHeaderOrQuerystring
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.cookies && req.cookies.token) {
        return req.cookies.token;
      }
      return null;
    }
}).unless({path: ['/', '/login', '/signup']}));

//Require all of user route methods
require("./resources/users")(app);

//Home Route
app.get('/', function(req, res){
    res.render('home');
});

//DEPLOY
app.listen(process.env.PORT || 3000, function(){

});

module.exports = app;
