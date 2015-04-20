Cloudsound.Models.Explore = Backbone.Model.extend({
  urlRoot: "/api/explores",

  otherTracks: function () {
    if (!this._otherTracks) {
      this._otherTracks = new Cloudsound.Collections.Tracks();
    }
    return this._otherTracks;
  },

  otherUsers: function () {
    if (!this._otherUsers) {
      this._otherUsers = new Cloudsound.Collections.Users();
    }
    return this._otherUsers;
  },

  parse: function (response) {
    if (response.other_tracks) {
      this.otherTracks().reset([]);
      this.otherTracks().set(response.other_tracks, { parse: true });
      delete response.other_tracks;
    }
    if (response.other_users) {
      this.otherUsers().reset([]);
      this.otherUsers().set(response.other_users, { parse: true });
      delete response.other_users;
    }
    return response;
  }

});
