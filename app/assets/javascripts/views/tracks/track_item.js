Cloudsound.Views.TrackItem = Backbone.View.extend({
  template: JST["tracks/track_item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  addWaveSurfer: function () {
    debugger
    var wavesurfer = Object.create(WaveSurfer);
    wavesurfer.init({
        container: this.$el.find("#track-" + this.model.id)[0],
        waveColor: '#ccc',
        progressColor: '#eee',
        fillParent: true
    });
    wavesurfer.load(this.model.get("audio"));
  },

  render: function () {
    var content = this.template({ track: this.model });
    this.$el.html(content);
    debugger
    this.addWaveSurfer();
    return this;
  }

});
