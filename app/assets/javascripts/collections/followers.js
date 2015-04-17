Cloudsound.Collections.Followers = Backbone.Collection.extend({
  url: "/api/followers",
  model: Cloudsound.Models.Follower,

  getOrFetch: function (id) {
    var followers = this;
    var follower = followers.get(id);
    if(follower) {
      follower.fetch();
    } else {
      follower = new Cloudsound.Models.Follower({ id: id });
      follower.fetch({
        success: function () {
          followers.add(follower);
        },
      });
    }

    return follower;
  }

});
