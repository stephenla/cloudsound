Cloudsound.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/track_show'],
  events: {
    "click .delete-track": "deleteTrack"
  },
  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, "sync", this.render);
  },

  deleteTrack: function (event) {
    event.preventDefault();
    this.model.destroy({
      success: function (model) {
        debugger
        Backbone.history.navigate("user/" +  model.get("user").id, { trigger: true });
        debugger
      }
    });
  },

  render: function () {
    //only render template after track returns json with user info.
    if (this.model.get("user")) {
      var content = this.template({
        track: this.model
      });
      this.$el.html(content);
    }
    return this;
  }
});
