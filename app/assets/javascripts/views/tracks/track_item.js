Cloudsound.Views.TrackItem = Backbone.View.extend({
  template: JST["tracks/track_item"],

  events: {

  },

  initialize: function (options) {
    if (options.waveTracks) {
      this.waveTracks = options.waveTracks;

    }
    this.listenTo(this.model, "sync", this.render);

    this.events["click #button-" + this.model.id] = "playTrack";
    this.wavesurfer = Object.create(WaveSurfer);

  },

  playTrack: function (event) {

    event.preventDefault();
    $currentTarget = $(event.currentTarget);
    this.waveTracks.forEach(function (track) {
      track.play();
      track.pause();
    });
    $currentTarget.addClass("active");
    this.wavesurfer.playPause();

  },

  addWaveSurfer: function () {


    this.wavesurfer.init({
        container: this.$el.find("#track-" + this.model.id)[0],
        waveColor: '#333',
        progressColor: '#f51',
        fillParent: true,
        cursorColor: "transparent",
        hideScrollbar: true
    });
    this.wavesurfer.load(this.model.get("audio"));


  },

  render: function () {
    var content = this.template({ track: this.model });
    this.$el.html(content);
    this.addWaveSurfer();
    return this;
  }

});
