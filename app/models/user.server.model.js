'use strict';

var mongoose = require('mongoose'),
     Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName : String,
	lastName : String,
	email : {
		type: String,
		index: true,
		match: /.+\@.+\..+/
       },
	username : {
        type: String,
        trim: true,
        unique: true,
    },
    role: {
    	type: String,
    	enum: ['Admin', 'Owner', 'User']
    },
	password : {
		type: String,
		validate: [
		  function(password) {
		  	return password.length >= 6;
		  },
		  'Password should be longer'
		  ]
		},
		
	created: {
		type: Date,
		default: Date.now
	},
	website: {
		type: String,
		get: function(url){
			if (!url) {
				return url;
			} else {
				if (url.indexOf('http://') !== 0 && url.indexOf('https://') !==0){
					url = 'http://' + url;
				}
				return url;
			}
		}
	},
});



mongoose.model('User', UserSchema);

UserSchema.set('toJSON', {getter:true});