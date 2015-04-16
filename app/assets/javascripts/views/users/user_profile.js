Cloudsound.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST["users/user_profile"],

  events: {
    "click .unfollow" : "unfollowUser",
    "click .follow" : "followUser"
  },

  initialize: function () {

    this.collection = this.model.tracks();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTrack);
    // this.addWaveSurfer();
    // this.listenTo(this.collection, "remove", this.removeTrack);
    //strange behaviour without this
    // this.collection.each(this.addTrack.bind(this));
  },

  addTrack: function (track) {
    var subview = new Cloudsound.Views.TrackItem({ model: track });
    subview.$el.show("fade", 1000);
    debugger
    this.addSubview(".tracks", subview);

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

  addWaveSurfer: function () {

  },

  unfollowUser: function (event) {
    event.preventDefault();
    var relationship = new Cloudsound.Models.Relationship({ id: this.model.get("relationship").relationship_id});
    relationship.fetch({
      success: function(model) {
        model.destroy();
        this.model.fetch();
      }.bind(this)
    });

  },

  followUser: function (event) {
    event.preventDefault();
    var relationship = new Cloudsound.Models.Relationship();
    relationship.save(this.model.get("relationship"),{
      success: function(model) {
        this.model.fetch();
      }.bind(this)
    });

  },

  render: function () {
    var content = this.template({ user: this.model });
    debugger
    this.$el.html(content);
    this.attachSubviews();
    debugger
    return this;
  }

});
