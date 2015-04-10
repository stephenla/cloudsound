Cloudsound.Routers.Router = Backbone.Router.extend({
  routes: {
    "upload": "trackNew",
    "account": "userAccount",
    "user/:id": "userProfile",
    "track/:id": "trackShow"
  },
  initialize: function () {
    this.$rootEl = $("#content");
    this.users = new Cloudsound.Collections.Users();
    this.tracks = new Cloudsound.Collections.Tracks();
  },

  userProfile: function (id) {
    var user = this.users.getOrFetch(id);
    var view = new Cloudsound.Views.UserProfile({
      model: user
    });
    this._swapView(view);
  },

  userAccount: function (id) {
    var currentUser = new Cloudsound.Models.CurrentUser();
    user.fetch();
    var view = new Cloudsound.Views.UserAccount({
      model: currentUser
    });
    this._swapView(view);
  },

  trackNew: function () {
    var currentUser = new Cloudsound.Models.CurrentUser();
    currentUser.fetch();
    var view = new Cloudsound.Views.TrackNew({
      user: currentUser
    });
    this._swapView(view);
  },

  trackShow: function (id) {
    var track = this.tracks.getOrFetch(id);
    var view = new Cloudsound.Views.TrackShow({
      model: track
    });
    this._swapView(view);
  },

  _swapView: function (view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.$rootEl.html(view.render().$el);
  }
});
