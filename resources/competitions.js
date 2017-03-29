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
            competition.user = user;
            // user.competitions.push(competition);
            // console.log(user.competitions)
            // user.save();
            // res.send(competition);
            competition.save(function (err) {
              if (err) { return res.status(400).send(err) }
              console.log('hellooo')
              user.competitions.push(competition);
              user.save();
              res.send(competition);
            });

            // Competition.create(competition, function(err, competition){
            //     if (err){ return res.status(300) };
            //     console.log("hello ma");
            //     user.competitions.push(competiton);
            //     user.save(function (err) {
            //     if (err){ return res.status(300) };
            //     res.status(200).json(competition);
            //     });
            // });
        });
    });

    app.get('/competitions', function(req, res){
        res.render('competitions');
    });

};
