Cloudsound.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/tracks_show'],

  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.collection = this.currentUser.tracks();
    this.listenTo(this.currentUser, "sync", this.render);
    this.listenTo(this.collection, "add", this.render);
  },

  render: function () {
    var content = this.template({ currentUser: this.currentUser});
    this.$el.html(content);
    return this;
  }
});
