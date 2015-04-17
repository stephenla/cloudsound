Cloudsound.Models.Feed = Backbone.Model.extend({
  urlRoot: "/api/feeds",
  feed: function () {
    if (!this._feed) {
      this._feed = new Cloudsound.Collections.Tracks();
    }

    return this._feed;
  },

  parse: function (response) {

    if (response.feed) {
      this.feed().reset([]);
      this.feed().set(response.feed, { parse: true });
      delete response.feed;
    }
    return response;
  }
});
