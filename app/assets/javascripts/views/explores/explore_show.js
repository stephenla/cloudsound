Cloudsound.Views.ExploreShow = Backbone.CompositeView.extend({
  template: JST['explores/show'],

  initialize: function () {
    this.otherTracks = this.model.otherTracks();
    this.otherUsers = this.model.otherUsers();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.otherUsers, "sync", this.addUser);
    this.listenTo(this.otherTracks, "sync", this.addTrack);

    this.waveTracks = Cloudsound.waveTracks = [];
  },

  addTrack: function (track) {
    var subview = new Cloudsound.Views.TrackItem({
      model: track,
      waveTracks: this.waveTracks
    });
    this.waveTracks.push(subview);


    subview.$el.show("fade", 1000);
    this.addSubview(".feed", subview);
  },

  addUser: function (user) {
    var subview = new Cloudsound.Views.TrackItem({
      model: user,
      waveTracks: this.waveTracks
    });
    this.waveTracks.push(subview);


    subview.$el.show("fade", 1000);
    this.addSubview(".feed", subview);
  },


  render: function () {
    var content = this.template({
      explore: this.model
    });
    this.$el.html(content);
    return this;
  }

});
