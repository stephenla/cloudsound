Cloudsound.Views.TrackItem = Backbone.View.extend({
  template: JST["tracks/track_item"],

  events: {

  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  addWaveSurfer: function () {
    var wavesurfer = Object.create(WaveSurfer);
    wavesurfer.init({
        container: this.$el.find("#track-" + this.model.id)[0],
        waveColor: '#333',
        progressColor: '#f51',
        fillParent: true,
        cursorColor: "transparent",
        hideScrollbar: true
    });
    wavesurfer.load(this.model.get("audio"));
    debugger
    this.$el.find("#button-" + this.model.id).click(function () {
      wavesurfer.playPause();
    });
  },

  render: function () {
    var content = this.template({ track: this.model });
    this.$el.html(content);
    this.addWaveSurfer();
    return this;
  }

});
