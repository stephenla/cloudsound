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
  },

  getQueryVariable: function (variable) {
    var query = Backbone.history.getFragment().substring(Backbone.history.getFragment().indexOf("?")+1)
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
  }
};
