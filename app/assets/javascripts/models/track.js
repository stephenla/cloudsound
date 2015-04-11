Cloudsound.Models.Track = Backbone.Model.extend({
  urlRoot: "/api/tracks",



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
