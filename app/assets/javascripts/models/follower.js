Cloudsound.Models.Follower = Backbone.Model.extend({
  urlRoot: "/api/followers",
  followers: function () {
    if (!this._followers) {
      this._followers = new Cloudsound.Collections.Users();
    }

    return this._followers;
  },

  parse: function (response) {
    if (response.followers) {
      this.followers().set(response.followers, { parse: true});
      delete response.followers;
    }
    return response;
  }
});
