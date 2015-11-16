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
			"click .btn-remove": "removeSection"
		},

		initialize: function() {
			this.logIndex = 0;
			this.nameValidators = {
				validators: {
					notEmpty: {
						message: 'Log name is required'
					}
				}
			};
			this.serversValidators = {
				validators: {
					notEmpty: {
						message: 'Server list where logs live is required'
					},
					isbn: {
						message: 'Servers not valid'
					}
				}
			};
			this.sizeValidators = {
				validators: {
					notEmpty: {
						message: 'Log size is required'
					},
					numeric: {
						message: 'Log size must be a numeric number'
					}
				}
			};
			this.reqValidators = {
				validators: {}
			};
		},

		render: function() {
			console.log("This is the form view!");

			this.$el.html(formTemplate);
		},

		addSection: function() {
			console.log("Adding form section!");
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
				.find('[name="req"]').attr('name', 'log[' + this.logIndex + '].req').end();

			// Add new fields
			// Note that we also pass the validator rules for new field as the third parameter
			// $('#onb-form')
			// 	.formValidation('addField', 'log[' + this.logIndex + '].name', this.nameValidators)
			// 	.formValidation('addField', 'log[' + this.logIndex + '].servers', this.serversValidators)
			// 	.formValidation('addField', 'log[' + this.logIndex + '].size', this.sizeValidators)
			// 	.formValidation('addField', 'log[' + this.logIndex + '].req', this.reqValidators);
		},

		removeSection: function(e) {
			console.log("Removing form section!");
			var $row = $(this.el).closest('.row');

			console.log($(this.el));
			console.log($row);

			// Remove fields
            // $('#bookForm')
            //     .formValidation('removeField', $row.find('[name="log[' + index + '].name"]'))
            //     .formValidation('removeField', $row.find('[name="log[' + index + '].servers"]'))
            //     .formValidation('removeField', $row.find('[name="log[' + index + '].size"]'))
            //     .formValidation('removeField', $row.find('[name="log[' + index + '].req"]'))

			// Remove element containing the fields
			$row.remove();

		}
	});

	return formView;

});