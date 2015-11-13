define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/form/formTemplate.html'
	], function($, _, Backbone, formTemplate) {

	var formView = Backbone.View.extend({

		el: $('.page'),

		render: function() {
			console.log("This is the form view!");

			this.$el.html(formTemplate);
		}
	});

	return formView;

});