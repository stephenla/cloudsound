Cloudsound.Views.TrackNew = Backbone.View.extend({
  template: JST["tracks/track_new"],

  events: {
    "submit #new_track": "uploadTrack"
  },

  initialize: function (options) {
    this.currentUser = options.user;
    this.listenTo(this.currentUser, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      currentUser: this.currentUser
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
