Cloudsound.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",
  tracks: function () {
    if (!this._tracks) {
      this._tracks = new Cloudsound.Collections.Tracks([], { user: this });
    }

    return this._tracks;
  },

  parse: function (response) {
      debugger
    if (response.tracks) {
      this.tracks().set(response.tracks, { parse: true });
      delete response.tracks;
    }

    return response;
  }

});
