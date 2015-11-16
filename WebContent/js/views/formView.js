define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/form/formTemplate.html'
], function($, _, Backbone, formTemplate) {

	var formView = Backbone.View.extend({

		el: $('.page'),

		events: {
			"click .btn-add": "addSection",
			"click .btn-remove": "removeSection",
			"click .btn-submit": "buildForm",
			"click .btn-cancel": "cancelSection"
		},

		initialize: function() {
			this.logIndex = 0;
		},

		render: function() {
			console.log("This is the form view!");

			this.$el.html(formTemplate);
		},

		addSection: function(e) {
			this.logIndex++;
			var $template = $('#logTemplate'),
				$clone = $template
				.clone()
				.removeClass('hide')
				.removeAttr('id')
				.attr('log-index', this.logIndex)
				.insertBefore($template);

			// Update the name attributes
			$clone
				.find('[name="name"]').attr('name', 'log[' + this.logIndex + '].name').end()
				.find('[name="servers"]').attr('name', 'log[' + this.logIndex + '].servers').end()
				.find('[name="size"]').attr('name', 'log[' + this.logIndex + '].size').end()
				.find('[name="req"]').attr('name', 'log[' + this.logIndex + '].req').end()

			var $btn = $(e.currentTarget);

			$btn
				.removeClass('btn-primary btn-add')
				.addClass('btn-danger btn-remove')
				.html('Remove Log');

			var $cancelBtn = $(e.currentTarget).closest('div').children('span:last');
			console.log($cancelBtn.text())
			if($cancelBtn.text().indexOf('Cancel') >= 0) {
				$cancelBtn.remove();
			}
		},

		removeSection: function(e) {
			console.log("Removing form section!");
			var $row = $(e.currentTarget).closest('div');

			$row.remove();
		},

		cancelSection: function(e) {
			console.log("Cancelling Section");
			var x = $(e.currentTarget).closest('div');
			// this.removeSection(e);
			console.log(x);
		},

		buildForm: function() {
			console.log("This is the form being built to submit!");
		}
	});

	return formView;

});