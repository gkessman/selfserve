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
			data.log = [];
			var logArray = [];
			var logs = this.$el.find('div.log-info').not('.hide');

			data.vast = this.$el.find('input[name="vast"]').val();
			data.vp = this.$el.find('input[name="vp"]').val();
			data.org = this.$el.find('input[name="org"]').val();
			data.appname = this.$el.find('input[name="appname"]').val();

			_.each(logs, function(val, i) {
				var idx = $(val).attr('log-index')
				data.log.push({
					name: $(val).find('input[name="log[' + idx + '].name"]').val(),
					servers: $(val).find('input[name="log[' + idx + '].servers"]').val(),
					paths: $(val).find('input[name="log[' + idx + '].paths"]').val(),
					size: $(val).find('input[name="log[' + idx + '].size"]').val(),
					req: $(val).find('textarea[name="log[' + idx + '].req"]').val()
				})
			})

			model.set(data);
			console.log(model);
		}
	});

	return formView;

});