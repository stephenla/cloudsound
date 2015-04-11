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

    // $form.bind('ajax:complete', function(event, data) {
    //   Backbone.history.navigate("", { trigger: true });
    // });
    // $form.bind('ajax:error', function(event, data) {
    // debugger
    //   $.each(data.responseJSON, function (key, val){
    //     $(".errors").addClass("alert alert-danger").text(val);
    //   });
    // });
  }

});
