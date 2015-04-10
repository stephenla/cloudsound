Cloudsound.Collections.Tracks = Backbone.Collection.extend({
  comparator: 'ord',
  model: Cloudsound.Models.Track,
  url: 'api/tracks',

  initialize: function (models, options) {
    this.user = options.user;
  },

  getOrFetch: function (id) {
    var tracks = this;
    var track = tracks.get(id);
    if(track) {
      track.fetch();
    } else {
      track = new Cloudsound.Models.Track({ id: id });
      track.fetch({
        success: function () {
          tracks.add(track);
        },
      });
    }

    return track;
  }

});
