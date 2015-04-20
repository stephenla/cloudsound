Cloudsound.Views.TrackItem = Backbone.View.extend({
  template: JST["tracks/track_item"],

  events: {

  },
  _removeElement: function() {
      this.$el.remove();
  },

  remove: function() {
    if (this.wavesurfer.getCurrentTime() !== 0) {
      this.wavesurfer.pause();
    }

    this._removeElement();
    this.stopListening();
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

  startTrackProgress: function () {
    var pxPerSec = ($(".seeker-bar").width() / this.wavesurfer.getDuration());
    var width = this.wavesurfer.getCurrentTime() * pxPerSec;
    $(".seeker-progress").attr("style", "width: " + width + "px;");
    var seconds = Math.floor(this.wavesurfer.getCurrentTime()) % 60;
    var minutes = Math.floor(this.wavesurfer.getCurrentTime() / 60);
    $(".current-time").text(minutes + ":" + (seconds < 10 ? "0" + seconds: seconds));


  },

  playTrack: function (event) {
    event.preventDefault();
    $currentTarget = $(event.currentTarget);

    //show global control bar and set global variables
    $("#control-bar").show();
    Cloudsound.currentlyPlaying = this.wavesurfer;
    Cloudsound.currentlyPlayingTarget = $currentTarget;
    //set control bar title
    $(".control-track-title").text(this.model.get("title"));


    //global control avatar
    if (this.model.get("has_avatar")) {
      $(".control-avatar").css('background', this.model.get('avatar_micro'));
    } else {
      $(".control-avatar").css('background', this.model.get('avatar_gradient'));
    }


    //if button pressed is pause, pause the track and swap button
    if ($currentTarget.attr("class").indexOf("glyphicon-pause") > -1) {
      this.wavesurfer.pause();
      $("#play-pause-button").addClass("glyphicon-play");
      $("#play-pause-button").removeClass("glyphicon-pause");
      $currentTarget.removeClass("glyphicon-pause");
      $currentTarget.addClass("glyphicon-play");
      return;
    }

    //remove global seeker interval when track pauses
    this.wavesurfer.on('pause', function () {
      window.clearInterval(this.interval);
      // this.wavesurfer.un('pause');
      // $(".total-time").text("");
    }.bind(this));

    //start global seeker interval when track plays
    this.wavesurfer.on('play', function () {
      if (this.interval) {
        window.clearInterval(this.interval);
      }
      var seconds = Math.floor(this.wavesurfer.getCurrentTime()) % 60;
      var minutes = Math.floor(this.wavesurfer.getCurrentTime() / 60);
      $(".current-time").text(minutes + ":" + (seconds < 10 ? "0" + seconds: seconds));
      seconds = Math.floor(this.wavesurfer.getDuration()) % 60;
      minutes = Math.floor(this.wavesurfer.getDuration() / 60);
      $(".total-time").text(minutes + ":" + (seconds < 10 ? "0" + seconds: seconds));
      this.interval = window.setInterval(this.startTrackProgress.bind(this), 1000);
    }.bind(this));


    //remove pause icon from all the pause icons
    $(".glyphicon-pause").removeClass("glyphicon-pause").addClass("glyphicon-play");

    this.waveTracks.forEach(function (trackItem) {
      if (this.wavesurfer !== trackItem.wavesurfer) {
        if (trackItem.wavesurfer.getCurrentTime() !== 0) {
          trackItem.wavesurfer.pause();
        }
      }
    }.bind(this));

    this.wavesurfer.play();
    $("#play-pause-button").addClass("glyphicon-pause");
    $("#play-pause-button").removeClass("glyphicon-play");
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
