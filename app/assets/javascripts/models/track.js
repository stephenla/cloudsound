Cloudsound.Models.Track = Backbone.Model.extend({
  urlRoot: "/api/tracks",

  user: function () {
    if (this._user) {
      return this._user;
    }
    this._user = new Cloudsound.Models.User(this.get("user_id"));
    return this._user;
  },

  // comments: function () {
  //   if (this._comments) {
  //     return this._comments;
  //   }
  //   this._comments = new Cloudsound.Collections.Comments();
  //   return this._comments;
  // },
  //
  parse: function (response) {
    if (response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }
    
    return response;
  }
});
