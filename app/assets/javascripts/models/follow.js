Cloudsound.Models.Follow = Backbone.Model.extend({
  urlRoot: "/api/follows",
  following: function () {
    if (!this._following) {
      this._following = new Cloudsound.Collections.Users();
    }

    return this._following;
  },

  parse: function (response) {
    if (response.following) {
      this.following().reset([]);
      this.following().set(response.following, { parse: true});
      delete response.following;
    }
    return response;
  }
});
