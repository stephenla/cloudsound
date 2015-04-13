Cloudsound.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",
  tracks: function () {
    if (!this._tracks) {
      this._tracks = new Cloudsound.Collections.Tracks([], { user: this });
    }

    return this._tracks;
  },
  following: function () {
    if (!this._following) {
      this._following = new Cloudsound.Collections.Users();
    }

    return this._following;
  },

  parse: function (response) {

    if (response.tracks) {
      //add remove false because destroying the track and reloading user profile
      //will trigger the remove event twice, once for this set and once for
      //the model.destroy()
      this.tracks().set(response.tracks, { parse: true});
      delete response.tracks;
    }
    if (response.following) {
      //add remove false because destroying the track and reloading user profile
      //will trigger the remove event twice, once for this set and once for
      //the model.destroy()
      this.following().set(response.following, { parse: true});
      delete response.following;
    }

    return response;
  }

});
