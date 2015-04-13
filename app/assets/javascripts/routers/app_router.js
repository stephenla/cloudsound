Cloudsound.Routers.Router = Backbone.Router.extend({
  routes: {
    "user/:id/upload": "trackNew",
    "user/:id": "userProfile",
    "user/:id/tracks": "userProfile",
    "user/:id/account": "userAccount",
    "user/:user_id/track/:id": "trackShow",
    "user/:id/following": "userFollowing"
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

  userFollowing: function (id) {
    debugger
    var user = this.users.getOrFetch(id);
    var view = new Cloudsound.Views.UserFollowing({
      model: user
    });
    this._swapView(view);
  },

  userAccount: function (id) {
    var user = this.users.getOrFetch(id);
    var view = new Cloudsound.Views.UserAccount({
      model: user
    });
    this._swapView(view);
  },

  trackNew: function (id) {
    var user = this.users.getOrFetch(id);
    var view = new Cloudsound.Views.TrackNew({
      user: user,
      model: new Cloudsound.Models.Track()
    });
    this._swapView(view);
  },

  trackShow: function (user_id, id) {
    var track = this.tracks.getOrFetch(id);
    var user = this.users.getOrFetch(user_id);
    var view = new Cloudsound.Views.TrackShow({
      model: track,
      user: user
    });
    this._swapView(view);
  },

  _swapView: function (view) {

    if (this.currentView) {

      this.currentView.remove();
    }
    this.$rootEl.html(view.render().$el.show("fade", 1000));
    this.currentView = view;
  }
});
