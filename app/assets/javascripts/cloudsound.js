window.Cloudsound = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Cloudsound.Routers.Router();
    Cloudsound.waveTracks = [];
    Backbone.history.start();
  },

  hasExtension: function (inputID, exts) {
    var fileName = document.getElementById(inputID).value;
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
  },

  getQueryVariable: function (variable) {
    var query = Backbone.history.getFragment().substring(Backbone.history.getFragment().indexOf("?")+1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
  }
};

$(function () {
  $("#next-button").click(function () {

    var current = Cloudsound.currentlyPlaying ;
    if (Cloudsound.waveTracks) {
      Cloudsound.waveTracks.forEach(function (trackItem, index, arr) {
        if (current === trackItem.wavesurfer && arr[index + 1]) {
          $("#play-pause-button").removeClass("glyphicon-play");
          $("#play-pause-button").addClass("glyphicon-pause");
          Cloudsound.currentlyPlayingTarget.removeClass("glyphicon-pause");
          Cloudsound.currentlyPlayingTarget.addClass("glyphicon-play");
          Cloudsound.currentlyPlaying.pause();

          Cloudsound.currentlyPlaying = arr[index + 1].wavesurfer;
          Cloudsound.currentlyPlayingTarget = arr[index + 1].$("button.glyphicon");
          Cloudsound.currentlyPlayingTarget.removeClass("glyphicon-play");
          Cloudsound.currentlyPlayingTarget.addClass("glyphicon-pause");
          Cloudsound.currentlyPlayingTitle = arr[index + 1].model.get("title");
          $(".control-track-title").text(Cloudsound.currentlyPlayingTitle);

          Cloudsound.currentlyPlaying.play();
        }
      });
    }
  });
  $("#previous-button").click(function () {
    var current = Cloudsound.currentlyPlaying ;
    if (Cloudsound.waveTracks) {
      Cloudsound.waveTracks.forEach(function (trackItem, index, arr) {
        if (current === trackItem.wavesurfer && arr[index - 1]) {
          $("#play-pause-button").removeClass("glyphicon-play");
          $("#play-pause-button").addClass("glyphicon-pause");
          Cloudsound.currentlyPlayingTarget.removeClass("glyphicon-pause");
          Cloudsound.currentlyPlayingTarget.addClass("glyphicon-play");
          Cloudsound.currentlyPlaying.pause();

          Cloudsound.currentlyPlaying = arr[index - 1].wavesurfer;
          Cloudsound.currentlyPlayingTarget = arr[index - 1].$("button.glyphicon");
          Cloudsound.currentlyPlayingTarget.removeClass("glyphicon-play");
          Cloudsound.currentlyPlayingTarget.addClass("glyphicon-pause");
          Cloudsound.currentlyPlayingTitle = arr[index - 1].model.get("title");
          $(".control-track-title").text(Cloudsound.currentlyPlayingTitle);
          Cloudsound.currentlyPlaying.play();
        }
      });
    }
  });

  $("#play-pause-button").click(function () {
    if ($("#play-pause-button").attr("class").indexOf("glyphicon-pause") > -1) {
      $("#play-pause-button").removeClass("glyphicon-pause");
      $("#play-pause-button").addClass("glyphicon-play");
      Cloudsound.currentlyPlayingTarget.removeClass("glyphicon-pause");
      Cloudsound.currentlyPlayingTarget.addClass("glyphicon-play");
      Cloudsound.currentlyPlaying.pause();
    } else {
      $("#play-pause-button").addClass("glyphicon-pause");
      $("#play-pause-button").removeClass("glyphicon-play");
      Cloudsound.currentlyPlayingTarget.removeClass("glyphicon-play");
      Cloudsound.currentlyPlayingTarget.addClass("glyphicon-pause");
      $(".control-track-title").text(Cloudsound.currentlyPlayingtitle);
      Cloudsound.currentlyPlaying.play();
    }
  });
});
