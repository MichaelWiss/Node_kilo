'use strict';

var mongoose = require('mongoose'),
     crypto = require('crypto'),
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
	salt: {
		type: String,
		required: 'Provider is required'
	},
	providerId: String,
	providerData: {},
	created: {
		type: Data,
		default: Date.now
	}
});

UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

User.Schema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

User.Schema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('base64');
};

User

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