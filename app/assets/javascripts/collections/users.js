Cloudsound.Collections.Users = Backbone.Collection.extend({

  url: "/api/users",

  model: Cloudsound.Models.User,

  getOrFetch: function (id) {
    var users = this;
    var user = users.get(id);
    if(user) {
      user.fetch();
    } else {
      user = new Cloudsound.Models.User({ id: id });
      user.fetch({
        success: function () {
          users.add(user);
        },
      });
    }

    return user;
  }
});
