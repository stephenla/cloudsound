Cloudsound.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/track_show'],
  events: {
    "click .delete-track": "destroyTrack"
  },
  initialize: function (options) {
    this.model = options.model;
    this.user = options.user;
    this.userTracks = this.user.tracks();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.user, "sync", this.render);
  },

  destroyTrack: function (event) {
    var that = this;
    event.preventDefault();
    this.model.destroy({
      success: function (model) {
        // that.userTracks.remove(model);

        // remove view after model destroyed?
        Backbone.history.navigate("user/" +  model.get("user").id, { trigger: true });

        that.userTracks.remove(model);

        //why doesnt swapView in navigate remove this view.
        that.remove();

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
