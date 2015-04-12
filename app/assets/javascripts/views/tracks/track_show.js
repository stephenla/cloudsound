Cloudsound.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/track_show'],
  events: {
    "click .delete-track": "deleteTrack"
  },
  initialize: function (options) {
    this.model = options.model;
    this.currentUser = options.currentUser;
    this.currentUserTracks = this.currentUser.tracks();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.currentUser, "sync", this.render);
  },

  deleteTrack: function (event) {
    var that = this;
    event.preventDefault();
    this.model.destroy({
      success: function (model) {
        that.currentUserTracks.remove(model);
        Backbone.history.navigate("user/" +  model.get("user").id, { trigger: true });
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
