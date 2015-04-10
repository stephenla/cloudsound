Cloudsound.Collections.CurrentUsers = Backbone.Collection.extend({

  url: "/api/users",

  model: Cloudsound.Models.CurrentUser

});
