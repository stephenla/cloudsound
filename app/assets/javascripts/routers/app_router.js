Cloudsound.Routers.Router = Backbone.Router.extend({
  routes: {
    "upload": "uploadTrack",
    "user/:id": "userProfile",
    "user/:id/account": "userAccount"
  },
  initialize: function () {
    this.$rootEl = $("#content");
    this.users = new Cloudsound.Collections.Users();
  },

  userProfile: function (id) {
    var user = this.users.getOrFetch(id);
    var view = new Cloudsound.Views.UserProfile({
      model: user
    });
    this._swapView(view);
  },

  userAccount: function (id) {
    var user = new Cloudsound.Models.User({ id: id });
    user.fetch();
    var view = new Cloudsound.Views.UserAccount({
      model: user
    });
    this._swapView(view);
  },

  uploadTrack: function () {
    var track = new Cloudsound.Models.Track();
    var view = new Cloudsound.Views.TrackNew({ model: track });
    this._swapView(view);
  },

  _swapView: function (view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.$rootEl.html(view.render().$el);
  }
});
