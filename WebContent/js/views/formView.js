define([
	'jquery',
	'underscore',
	'backbone',
	'models/formModel',
	'text!templates/form/formTemplate.html'
], function($, _, Backbone, FormModel, FormTemplate) {

	var formView = Backbone.View.extend({

		el: $('.content'),

		events: {
			"click .btn-add": "addSection",
			"click .btn-remove": "removeSection",
			"click .btn-submit": "buildForm"
		},

		initialize: function() {
			this.logIndex = 0;
			this.model = new FormModel();
			console.log(this.model);
		},

		render: function() {
			this.$el.html(FormTemplate);
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
				.css({
					opacity: 0
				})
				.insertBefore($template)
				.animate({
					opacity: 1
				});

			// Update the name attributes
			$clone
				.find('[name="name"]').attr('name', 'log[' + this.logIndex + '].name').end()
				.find('[name="servers"]').attr('name', 'log[' + this.logIndex + '].servers').end()
				.find('[name="paths"]').attr('name', 'log[' + this.logIndex + '].paths').end()
				.find('[name="size"]').attr('name', 'log[' + this.logIndex + '].size').end()
				.find('[name="req"]').attr('name', 'log[' + this.logIndex + '].req').end()
				.find('button.btn-remove').removeClass('hide');

			console.log("Clone", $clone.find('button.btn-add'));

			if (this.logIndex === 1) {
				$btn.addClass('hide');
			} else {
				$btn
					.closest('div').children('span').children('button.btn-add').addClass('hide')
			}
		},

		removeSection: function(e) {
			var self = this;
			var $log = $(e.currentTarget).parents('div').eq(1);

			$log.fadeOut('fast', function() {
				$(this).remove();
				self.manageLogs();
			});
		},

		manageLogs: function() {
			var logCnt = this.$el.find('div.log-info').not('.hide');
			var $form = $('#onb-form');

			if (logCnt.length >= 1) {
				logCnt.last().children('span').children('button').removeClass('hide');
				logCnt.animate('fast');
			} else {
				$form.children('span').children('button').removeClass('hide');
				this.logIndex = 0;
			}

		},

		buildForm: function(e) {
			e.preventDefault();
			var model = this.model;
			var data = {};
			console.log("This is the form being built to submit!");
			var logs = this.$el.find('div.log-info').not('.hide');
			console.log(logs.length);

			// data.vast = 1234;
			// data.vp = 'vicepresident';
			// data.org = 'iaas';
			// data.appname = "application";
			// data.log = [{
			// 	name : 'access',
			// 	servers : 'server01apdvg',
			// 	paths : '/log/srv01/application',
			// 	size : '10GB',
			// 	req : 'test'
			// }]

			// data.vast = this.$el.find('input[name]').val()

			// model.set(data);

			this.$el.find('input[name]').each(function() {
				model.set(this.name, this.value);
            })
			console.log(model);
		}
	});

	return formView;

});