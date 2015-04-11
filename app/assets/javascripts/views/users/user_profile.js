Cloudsound.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST["users/user_profile"],

  initialize: function () {
    this.collection = this.model.tracks();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTrack.bind(this));
    //strange behaviour without this
    this.collection.each(this.addTrack.bind(this));
  },

  addTrack: function (track) {
    var subview = new Cloudsound.Views.TrackItem({ model: track });
    this.addSubview(".profile-tracks", subview);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    debugger
    return this;
  }

});
