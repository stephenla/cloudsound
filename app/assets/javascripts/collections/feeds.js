Cloudsound.Collections.Feeds = Backbone.Collection.extend({
  url: "/api/feeds",
  model: Cloudsound.Models.Feed,

  getOrFetch: function (id) {
    var feeds = this;
    var feed = feeds.get(id);
    if(feed) {
      feed.fetch();
    } else {
      feed = new Cloudsound.Models.Feed({ id: id });
      feed.fetch({
        success: function () {
          feeds.add(feed);
        },
      });
    }

    return feed;
  }

});
