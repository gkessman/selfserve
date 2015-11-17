define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/form/formTemplate.html'
], function($, _, Backbone, formTemplate) {

	var formView = Backbone.View.extend({

		el: $('.content'),

		events: {
			"click .btn-add": "addSection",
			"click .btn-remove": "removeSection",
			"click .btn-cancel": "removeSection",
			"click .btn-submit": "buildForm"
		},

		initialize: function() {
			this.logIndex = 0;
		},

		render: function() {
			this.$el.html(formTemplate);
		},

		addSection: function(e) {
			this.logIndex++;
			var $btn = $(e.currentTarget);
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
				.find('[name="req"]').attr('name', 'log[' + this.logIndex + '].req').end();

			if (this.logIndex === 1) {
				$btn.addClass('hide');
			} else {
				$btn
					.closest('div').children('span').children('button.btn-cancel').addClass('hide')
					.closest('div').children('span').children('button.btn-add').addClass('hide')
					.closest('div').children('span').children('button.btn-remove').removeClass('hide');
			}

			this.manageLogs();

		},

		removeSection: function(e) {
			var $log = $(e.currentTarget).closest('div');

			$log.remove();

			this.manageLogs();
		},

		manageLogs: function() {
			var logCnt = this.$el.find('div.log-info').not('.hide');
			var $form = $('#onb-form');

			if (logCnt.length >= 1) {
				logCnt.last().children('span').children('button').removeClass('hide');
				logCnt.last().children('span').children('button.btn-remove').addClass('hide');
			} else {
				$form.children('span').children('button').removeClass('hide');
				this.logIndex = 0;
			}

		},

		buildForm: function() {
			console.log("This is the form being built to submit!");
		}
	});

	return formView;

});