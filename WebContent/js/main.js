require.config({
	paths: {
		"jquery": "vendor/jquery-1.11.3.min",
		"underscore": "vendor/underscore-min",
		"backbone": "vendor/backbone-min",
		"bootstrap": "vendor/bootstrap-min",
		"text": "vendor/text",
		"templates": "../templates"
	}
});

require(['app'], function(App) {
		new App.initialize();
})	