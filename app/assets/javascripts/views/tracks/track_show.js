Cloudsound.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/track_show'],

  initialize: function (options) {
    this.model = options.model;
    this.user = this.model.user();
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
  }
});
