define([
	'jquery', 
	'underscore', 
	'backbone', 
	'views/formView'
	], function($, _, Backbone, formView) {

	var AppRouter = Backbone.Router.extend({
		routes: {

			'': 'onboard',
			'dashboard': 'dashboard',
			'admin': 'admin',
			'onboard': 'onboard',
			// Default
			'*actions': 'defaultAction'
		}
	});

	var initialize = function(){

		var app_router = new AppRouter;

		app_router.on('route:onboard', function(actions) {
			var form = new formView();
			form.render();
		});

		app_router.on('route:defaultAction', function(actions) {
			var form = new formView();
			form.render();
		});

		Backbone.history.start();
	};

	return {
		initialize: initialize
	};

});