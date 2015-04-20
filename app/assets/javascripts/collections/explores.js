Cloudsound.Collections.Explores = Backbone.Collection.extend({
  url: "/api/explores",
  model: Cloudsound.Models.Explore,

  getOrFetch: function  (id) {
    var explores = this;
    var explore = explores.get(id);
    if (explore) {
      explore.fetch();
    } else {
      explore = new Cloudsound.Models.Explore({ id: id });
      explore.fetch({
        success: function (model) {
          explores.add(model);
        }
      });
    }
    return explore;
  }
});
