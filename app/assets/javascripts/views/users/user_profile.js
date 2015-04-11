Cloudsound.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST["users/user_profile"],

  initialize: function () {
    debugger
    this.collection = this.model.tracks();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTrack.bind(this));
    this.listenTo(this.collection, "remove", this.removeTrack.bind(this));
    //strange behaviour without this
    this.collection.each(this.addTrack.bind(this));
  },

  addTrack: function (track) {
    var subview = new Cloudsound.Views.TrackItem({ model: track });
    this.addSubview(".profile-tracks", subview);
  },

  removeTrack: function (track) {
    debugger
    var subview = _.find(
    this.subviews(".profile-tracks"), function (subview) {
      return subview.model === track;
    });
    // setTimeout(function() {
    //     $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
    //   }, 1000 );
    // }
    debugger
    this.removeSubview(".profile-tracks", subview);
    $(".notice .msg").text("track deleted.");
    $(".notice .msg").fadeIn(400, function () {
      setTimeout(function () {
        $(".notice .msg").fadeOut(400);
      }, 3000);

    });
    // function callback() {
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
