var User = require('../models/user.js');
var Competition = require('../models/competition.js');
var jwt = require('jsonwebtoken');
module.exports = function(app) {

    app.get('/competitions/new', function (req, res) {
        res.render('competitions-new');
    });

    app.post('/competitions', function(req, res){
        User.findById(req.user._id).exec(function(err, user){
            var competition = new Competition(req.body);
            console.log(competition)
            competition.user = user;
            competition.save(function (err) {
              if (err) { return res.status(400).send(err) }
              console.log('hellooo')
              user.competitions.push(competition);
              user.save();
              res.send(competition);
            });
        });
    });

    //Index of competitions
    app.get('/competitions', function(req, res){
        Competition.find().exec(function(err, competitions){
            res.render('competitions-index', {competitions: competitions});
        });
    });
};
