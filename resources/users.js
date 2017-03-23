
module.exports = function(app) {
    //Signup View
    app.get('/signup', function(req, res){
      res.render('signup');
    });

    //Signup Create UserSchema
    app.post('signup', function(req, res){
        var user = new User();
        user.save(function(err){
            if (err){return res.status(300)};
            var token = jwt.sign({ _id: user._id}, 'shhhhhhared-secret');
            res.send({ token: token });
        });
    });

    //Login View
    app.get('/login', function(req, res){
          res.render('login');
    });

    //Login
    app.post('/login', function(req, res){
        User.findOne({email: req.body.email}, function(err, user){
            if (err){ return res.status(300) };
            if (!user) {
                res.send({ success: false, message: 'Authentication failed. User not found.' });
            }
            else{
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        // Create token if the password matched and no error was thrown
                        var token = jwt.sign(user, 'shhhhhhared-secret', {
                            expiresIn: 10080 // in seconds
                        });
                        res.send({ token: token })
                    }
                    else {
                        res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                    };
                });
            };
        });
    });
};
