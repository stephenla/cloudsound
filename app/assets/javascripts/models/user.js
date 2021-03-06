Cloudsound.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",
  tracks: function () {
    if (!this._tracks) {
      this._tracks = new Cloudsound.Collections.Tracks();
    }

    return this._tracks;
  },

  // followers: function () {
  //   if (!this._followers) {
  //     this._followers = new Cloudsound.Collections.Users();
  //   }
  //
  //   return this._followers;
  // },


  parse: function (response) {

    if (response.tracks) {
      //add remove false because destroying the track and reloading user profile
      //will trigger the remove event twice, once for this set and once for
      //the model.destroy()
      this.tracks().reset([]);
      this.tracks().set(response.tracks, { parse: true });
      delete response.tracks;
    }

    // if (response.following) {
    //   this.following().reset([]);
    //   this.following().set(response.following, { parse: true});
    //   delete response.following;
    // }
    // if (response.followers) {
    //   this.followers().reset([]);
    //   this.followers().set(response.followers, { parse: true});
    //   delete response.followers;
    // }

    return response;
  }

});
