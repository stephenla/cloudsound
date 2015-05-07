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
    this.listenTo(this.collection, "remove", this.removeTrack);
    //strange behaviour without this
    // // this.collection.each(this.addTrack.bind(this));
  },


  addTrack: function (track) {
    var subview = new Cloudsound.Views.TrackItem({
      model: track,
      waveTracks: Cloudsound.waveTracks
    });
    //can more than one event go to the same event handler?
    subview.wavesurfer.on("finish", function () {
    }.bind(this));
    Cloudsound.waveTracks.push(subview);


    subview.$el.show("fade", 1000);
    this.addSubview(".tracks", subview);

  },

  removeTrack: function (track) {
    var subview = _.find(this.subviews(".profile-tracks"), function (subview) {
      return subview.model === track;
    });
    this.removeSubview(".profile-tracks", subview);
  },

  unfollowUser: function (event) {
    event.preventDefault();
    var relationship = new Cloudsound.Models.Relationship({ id: this.model.get("relationship").relationship_id});
    relationship.fetch({
      success: function(model) {
        model.destroy();
        $(".unfollow").text("Follow").removeClass("unfollow").addClass("follow");
        this.model.fetch();
      }.bind(this)
    });

  },

  followUser: function (event) {
    event.preventDefault();
    var relationship = new Cloudsound.Models.Relationship();
    relationship.save(this.model.get("relationship"),{
      success: function(model) {
        $(".follow").text("Following").removeClass("follow").addClass("unfollow");
        this.model.fetch();
      }.bind(this)
    });

  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    if (this.collection.length === 0) {
      this.$('.tracks').append("<p>" + this.model.get('username') + " has no tracks</p>");
    }
    return this;
  }

});
