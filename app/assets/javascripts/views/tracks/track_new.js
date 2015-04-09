Cloudsound.Views.TrackNew = Backbone.View.extend({
  template: JST["tracks/track_new"],

  events: {
    "submit #new_track": "uploadTrack"
  },

  initialize: function (options) {
    this.user = options.user;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.user, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      track: this.model,
      user: this.user
    });
    this.$el.html(content);
    return this;
  },

  uploadTrack: function (event) {
    $form = $(event.currentTarget);
    $form.bind('ajax:complete', function(event, data) {
      Backbone.history.navigate("", { trigger: true });
    });

    $('#new_track').fileupload({
      url: '/api/tracks',
      sequentialUploads: true,
      progress: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .bar').css('width', progress + '%');
      }
    });
  }

});
