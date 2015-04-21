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
    this.listenTo(this.collection, "remove", this.removeTrack);
    //strange behaviour without this
    // // this.collection.each(this.addTrack.bind(this));
    // this.allTracks = [];		// An array for all the files loaded in the track
    //   playlist = [] 		// An array for the current playlist
    //   temporarySearchPlaylist = [],	// A helper array for when we are searching
    //   i = 0, 				// The number of the current track
    //   shuffle = false,	// Shuffle flag
    //   repeat = 0,			// Repeat flag
    //   lastPlayed = [],	// Array for last played (used when shuffling songs)
    //   timer = 0;			// An interval for the track's current time.
    this.waveTracks = Cloudsound.waveTracks = [];
  },


  addTrack: function (track) {
    var subview = new Cloudsound.Views.TrackItem({
      model: track,
      waveTracks: this.waveTracks
    });
    //can more than one event go to the same event handler?
    subview.wavesurfer.on("finish", function () {
    }.bind(this));
    this.waveTracks.push(subview);


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
    this.$el.html(content);
    this.attachSubviews();
    if (this.collection.length === 0) {
      this.$('.tracks').append("<p>" + this.model.get('username') + " has no tracks</p>");
    }
    return this;
  }

});
