Cloudsound.Models.CurrentUser = Backbone.Model.extend({
  urlRoot: "/api/current_users",
  tracks: function () {
    if (!this._tracks) {
      this._tracks = new Cloudsound.Collections.Tracks([], { user: this });
    }

    return this._tracks;
  },

  parse: function (response) {
    if (response.tracks) {
      this.tracks().set(response.tracks, { parse: true });
      delete response.tracks;
    }

    return response;
  }
});
