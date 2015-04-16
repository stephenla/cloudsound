Cloudsound.Views.TrackItem = Backbone.View.extend({
  template: JST["tracks/track_item"],

  events: {

  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.events["click #track-" + this.model.id] = "playTrack";
  },

  playTrack: function (event) {
    event.preventDefault();
    $currentTarget = $(event.currentTarget);
    $(".wavetrack.active").each(function () {

    });
    $currentTarget.addClass("active");
    this.wavesurfer.playPause();

  },

  addWaveSurfer: function () {
    this.wavesurfer = Object.create(WaveSurfer);
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
