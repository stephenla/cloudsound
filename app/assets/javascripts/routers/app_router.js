Cloudsound.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "userFeed",
    "user/:id/upload": "trackNew",
    "user/:id": "userProfile",
    "user/:id/tracks": "userProfile",
    "user/:id/settings": "userSettings",
    "user/:user_id/track/:id": "trackShow",
    "track/:id/settings": "trackSettings",
    "user/:id/following": "userFollowing",
    "user/:id/followers": "userFollowers",
    "explore": "explore"
  },
  initialize: function () {
    this.$rootEl = $("#content");
    this.users = new Cloudsound.Collections.Users();
    this.tracks = new Cloudsound.Collections.Tracks();
    this.feeds = new Cloudsound.Collections.Feeds();
    this.follows = new Cloudsound.Collections.Follows();
    this.followers = new Cloudsound.Collections.Followers();
    this.explores = new Cloudsound.Collections.Followers();

  },

  explore: function () {
    var explore = new Cloudsound.Models.Explore();
    explore.fetch();
    var view = new Cloudsound.Views.ExploreShow({ model: explore });
    this._swapView(view);
  },

  userFeed: function () {
    var user = this.feeds.getOrFetch(Cloudsound.current_user);
    var view = new Cloudsound.Views.UserFeed({ model: user });
    this._swapView(view);
  },

  trackSettings: function (id) {
    var track = this.tracks.getOrFetch(id);
    var view = new Cloudsound.Views.TrackEdit({ model: track });
    this._swapView(view);
  },

  userProfile: function (id) {
    var user = this.users.getOrFetch(id);
    var view = new Cloudsound.Views.UserProfile({
      model: user
    });
    this._swapView(view);
  },

  userFollowing: function (id) {
    var user = this.follows.getOrFetch(id);
    var view = new Cloudsound.Views.UserFollowing({
      model: user
    });
    this._swapView(view);
  },

  userFollowers: function (id) {
    var user = this.followers.getOrFetch(id);
    var currentUser = this.users.getOrFetch(Cloudsound.current_user);
    var view = new Cloudsound.Views.UserFollowers({
      model: user,
      currentUser: currentUser
    });
    this._swapView(view);
  },

  userSettings: function (id) {
    var user = this.users.getOrFetch(id);
    var view = new Cloudsound.Views.UserSettings({
      model: user
    });
    view.$el.show("fade",500);
    this._swapView(view);
  },

  trackNew: function (id) {
    var user = this.users.getOrFetch(id);
    var view = new Cloudsound.Views.TrackNew({
      user: user,
      model: new Cloudsound.Models.Track()
    });
    view.$el.show("fade",500);
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
    // this.$rootEl.html(view.render().$el.show("fade", 500));
    this.$rootEl.html(view.render().$el);
    this.currentView = view;
  }
});
