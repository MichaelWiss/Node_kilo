'use strict';

exports.render = function(req, res) {
	res.render('index', {
		title: 'Hello My World',
		user: JSON.stringify(req.user)
	});
};