window.Cloudsound = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Cloudsound.Routers.Router();
    Backbone.history.start();
  },

  hasExtension: function (inputID, exts) {
    var fileName = document.getElementById(inputID).value;
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
  }
};
