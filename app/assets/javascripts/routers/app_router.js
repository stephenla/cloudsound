Cloudsound.Routers.Router = Backbone.Router.extend({
  routes: {
    "users/:id": "userProfile"
  },
  initialize: function () {
    this.$rootEl = $("#content");
  },

  userProfile: function () {
    var user = new Cloudsound.Models.User();
    var view = new Cloudsound.Views.UserProfile({
      model: user
    });
    this._swapView(view);
  },

  _swapView: function () {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.$rootEl.html(view.render().$el);
  }
});
