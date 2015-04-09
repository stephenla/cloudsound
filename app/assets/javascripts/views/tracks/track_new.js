Cloudsound.Views.TrackNew = Backbone.View.extend({
  template: JST["tracks/track_new"],
  
  events: {
    "submit #new_track": "uploadTrack"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ track: this.model });
    this.$el.html(content);
    return this;
  },

  uploadTrack: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    debugger
    this.model.save(data, {
      success: function () {
        Backbone.history.navigate("", { trigger: true });
      }
    });
  }

});
