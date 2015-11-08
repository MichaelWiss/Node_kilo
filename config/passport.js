'use strict';


var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {
	var User = mongoose.model('User');

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

// Use Passport's 'deserializeUser' method to load the user document
	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, '-password -salt', function(err, user) {
			done(err, user);
		});
	});

	// Load Passport's strategies configuration files
   require('./strategies/local.js')();
   require('./strategies/facebook.js')();
};
