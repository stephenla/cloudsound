Cloudsound.Collections.Tracks = Backbone.Collection.extend({
  comparator: 'ord',
  model: Cloudsound.Models.Track,
  url: 'api/tracks',

  initialize: function (models, options) {
    this.user = options.user;
  }
});
