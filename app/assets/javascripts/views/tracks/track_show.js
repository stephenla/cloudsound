Cloudsound.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/track_show'],

  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    if (this.model.get("user")) {
      var content = this.template({
        track: this.model
      });
      this.$el.html(content);
    }
    return this;
  }
});
