Cloudsound.Views.UserFeed = Backbone.CompositeView.extend({
  template: JST['users/user_feed'],

  initialize: function () {
    this.feed = this.model.feed();
    this.listenTo(this.feed, "add", this.addTrack);
    this.listenTo(this.model, "sync", this.render);
    this.waveTracks = [];
  },

  addTrack: function (track) {
    var subview = new Cloudsound.Views.TrackItem({
      model: track,
      waveTracks: this.waveTracks
    });
    this.waveTracks.push(subview.wavesurfer);


    subview.$el.show("fade", 1000);
    this.addSubview(".feed", subview);
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
