define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var FormModel = Backbone.Model.extend({

    schema: {
      vast: '',
      vp: '',
      org: '',
      appname: '',
      log: [{
        name: '',
        servers: '',
        paths: '',
        size: '',
        req: ''
      }]
    }

  });

  return FormModel;

});