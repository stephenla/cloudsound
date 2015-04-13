Cloudsound.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST["users/user_profile"],

  initialize: function () {

    this.collection = this.model.tracks();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTrack);
    // this.listenTo(this.collection, "remove", this.removeTrack);
    //strange behaviour without this
    // this.collection.each(this.addTrack.bind(this));
  },

  addTrack: function (track) {

    var subview = new Cloudsound.Views.TrackItem({ model: track });
    this.addSubview(".tracks", subview);
    subview.$el.show("fade", 1000);
  },

  removeTrack: function (track) {
    var subview = _.find(this.subviews(".profile-tracks"), function (subview) {
      return subview.model === track;
    });
    this.removeSubview(".profile-tracks", subview);
    // why do i need to wrap this in a setTimeout
    window.setTimeout(function () {
      $(".notice .msg").text("track deleted.");
      $(".notice .msg").fadeIn(400, function () {
        window.setTimeout(function () {
          $(".notice .msg").fadeOut(400);
        }, 2500);
      });
    }, 500);
  },

  render: function () {

    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
