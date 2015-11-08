'use strict';

module.exports = {
	db: 'mongodb://localhost/mean-book',
	sessionSecret: 'developmentSessionSecret',
	facebook: {
		clientID:'758112767652821',
		clientSecret:'810abb69905181ab14a9bf2c2f93ffa8',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	}
};