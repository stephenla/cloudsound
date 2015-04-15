window.Cloudsound = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Cloudsound.Routers.Router();
    Backbone.history.start();
  }
};
