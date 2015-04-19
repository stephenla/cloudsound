Cloudsound.Views.TrackItem = Backbone.View.extend({
  template: JST["tracks/track_item"],

  events: {

  },
  _removeElement: function() {
      this.$el.remove();
  },

  remove: function() {

    this._removeElement();
    this.stopListening();
    this.wavesurfer.play();
    this.wavesurfer.pause();
    return this;
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


    if ($currentTarget.attr("class").indexOf("glyphicon-pause") > -1) {
      this.wavesurfer.pause();
      $currentTarget.removeClass("glyphicon-pause");
      $currentTarget.addClass("glyphicon-play");
      return;
    }

    this.wavesurfer.on('pause', function () {
      // this.wavesurfer.un('pause');
    });

    this.wavesurfer.on('play', function () {
      // this.wavesurfer.un('play');
    });

    // $.each($("button.glyphicon-pause"), function (index, value) {
    //   value.removeClass("glyphicon-pause");
    //   value.addClass("glyphicon-play");
    // });

    $("button.glyphicon-pause").removeClass("glyphicon-pause").addClass("glyphicon-play");

    this.waveTracks.forEach(function (track) {
      if (this.wavesurfer !== track) {
        track.play();
        track.pause();
      }
    }.bind(this));

    this.wavesurfer.play();
    $currentTarget.removeClass("glyphicon-play");
    $currentTarget.addClass("glyphicon-pause");


  },

  addWaveSurfer: function () {



    this.wavesurfer.init({
        container: this.$el.find("#track-" + this.model.id)[0],
        waveColor: '#333',
        progressColor: '#f51',
        fillParent: true,
        cursorColor: "transparent",
        hideScrollbar: true,
        height: 60
    });
    this.wavesurfer.on('loading', function (percent, xhr) {
      $(".wave-bar").show();
      $(".wave-track").css("opacity", 0.5);

    });
    this.wavesurfer.on('ready', function () {
      $(".wave-bar").hide();
      $(".wave-track").css("opacity", 1);
    });
    this.wavesurfer.load(this.model.get("audio"));
    this.$el.find(".wave-track > wave").css("background",this.model.get("avatar_gradient"));

  },

  render: function () {
    var content = this.template({ track: this.model });
    this.$el.html(content);
    this.addWaveSurfer();
    return this;
  }

});
