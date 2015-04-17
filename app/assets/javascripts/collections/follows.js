Cloudsound.Collections.Follows = Backbone.Collection.extend({
  url: "/api/follows",
  model: Cloudsound.Models.Follow,

  getOrFetch: function (id) {
    var follows = this;
    var follow = follows.get(id);
    if(follow) {
      follow.fetch();
    } else {
      follow = new Cloudsound.Models.Follow({ id: id });
      follow.fetch({
        success: function () {
          follows.add(follow);
        },
      });
    }

    return follow;
  }

});
