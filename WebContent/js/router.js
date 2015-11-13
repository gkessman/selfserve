define([
	'jquery', 
	'underscore', 
	'backbone', 
	'views/formView'
	], function($, _, Backbone, formView) {

	var AppRouter = Backbone.Router.extend({
		routes: {

			// Default
			'*actions': 'defaultAction'
		}
	});

	var initialize = function(){

		var app_router = new AppRouter;

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