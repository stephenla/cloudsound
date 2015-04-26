Cloudsound.Views.ExploreShow = Backbone.CompositeView.extend({
  template: JST['explores/explore_show'],

  initialize: function () {
    this.otherTracks = this.model.otherTracks();
    this.otherUsers = this.model.otherUsers();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.otherUsers, "add", this.addUser);
    this.listenTo(this.otherTracks, "add", this.addTrack);

    // this.waveTracks = Cloudsound.waveTracks = [];
  },

  addTrack: function (track) {
    var subview = new Cloudsound.Views.TrackItem({
      model: track,
      waveTracks: Cloudsound.waveTracks
    });
    Cloudsound.waveTracks.push(subview);


    subview.$el.show("fade", 1000);
    this.addSubview(".explore-tracks", subview);
  },

  addUser: function (user) {
    var subview = new Cloudsound.Views.ExploreUser({
      model: user
    });

    subview.$el.show("fade", 1000);
    this.addSubview(".explore-users", subview);
  },

  addScript: function () {
    $("." + $(".follow-links.list").parent().attr('class')).hover(function () {
      $(this).find('.follow-links.list').show('fade', 100);
    }, function () {
      $(this).find('.follow-links.list').hide('fade', 100);
    });
  },
  render: function () {
    var content = this.template({
      explore: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    this.addScript();
    return this;
  }

});
