Cloudsound.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/track_show'],
  events: {
    "click .delete-track": "destroyTrack",
    "submit #new-comment-form": "createComment",
    "click .like-track": "likeTrack",
    "click .unlike-track": "unlikeTrack"
  },

  likeTrack: function () {
    event.preventDefault();
    var like = new Cloudsound.Model.Like();

  },

  unlikeTrack: function () {

  },

  _removeElement: function() {
      this.$el.remove();
  },

  remove: function() {
    // if (this.wavesurfer.getCurrentTime() !== 0) {
    //   this.wavesurfer.pause();
    // }
    // $("#next-button").toggleClass("disabled");
    // $("#previous-button").toggleClass("disabled");

    this._removeElement();
    this.stopListening();
    return this;
  },


  initialize: function (options) {
    this.comments = this.model.comments();
    this.user = options.user;
    this.userTracks = this.user.tracks();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.comments, "add", this.addComment);
    this.listenTo(this.user, "sync", this.render);
    // this.comments.each(this.addComment.bind(this));
    this.events["click #button-" + this.model.id] = "playTrack";

    var commentNew = new Cloudsound.Views.CommentNew({ model: this.model });
    this.addSubview(".comment-box", commentNew);
    $("#next-button").toggleClass("disabled");
    $("#previous-button").toggleClass("disabled");

  },

  addWaveSurfer: function () {
    this.wavesurfer = Object.create(WaveSurfer);
    this.wavesurfer.init({
        container: this.$el.find("#track-" + this.model.id)[0],
        waveColor: '#333',
        progressColor: '#f51',
        fillParent: true,
        cursorColor: "transparent",
        hideScrollbar: true,
        height: 380
    });
    this.wavesurfer.load(this.model.get("audio"));
    this.$el.find(".wave-track").css("background",this.model.get("avatar_gradient"));

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

    $("#control-bar").show();
    Cloudsound.currentlyPlaying = this.wavesurfer;
    Cloudsound.currentlyPlayingTarget = $currentTarget;

    Cloudsound.waveTracks.forEach(function (trackItem) {
      if (trackItem.wavesurfer.getCurrentTime() !== 0) {
        trackItem.wavesurfer.pause();
      }
    }.bind(this));



    $(".control-track-title").text(this.model.get("title"));
    // $("#next-button")

    if (this.model.get("has_avatar")) {
      $(".control-avatar").css('background', this.model.get('avatar_micro'));
    } else {
      $(".control-avatar").css('background', this.model.get('avatar_gradient'));
    }

    if ($currentTarget.attr("class").indexOf("glyphicon-pause") > -1) {
      if (this.wavesurfer.getCurrentTime() !== 0) {
        this.wavesurfer.pause();
        $("#play-pause-button").addClass("glyphicon-play");
        $("#play-pause-button").removeClass("glyphicon-pause");
        $currentTarget.removeClass("glyphicon-pause");
        $currentTarget.addClass("glyphicon-play");
        return;
      }
    }


    this.wavesurfer.on('pause', function () {
      window.clearInterval(this.interval);
      // this.wavesurfer.un('pause');
      // $(".total-time").text("");
    }.bind(this));

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




    $currentTarget.removeClass("glyphicon-play");
    $currentTarget.addClass("glyphicon-pause");
    $("#play-pause-button").addClass("glyphicon-pause");
    $("#play-pause-button").removeClass("glyphicon-play");
    this.wavesurfer.play();


  },


  destroyTrack: function (event) {
    var that = this;
    event.preventDefault();
    this.model.destroy({
      success: function (model) {
        Backbone.history.navigate("user/" +  model.get("user").id, { trigger: true });
        // remove view after model destroyed?
        //why doesnt swapView in navigate remove this view.
        window.setTimeout(function () {
          $(".notice").addClass("slideLeft");
          window.setTimeout(function () {
            $(".notice").hide("fade", 500, function () { $(".notice").removeClass("slideLeft"); });

          }, 8000);
        }, 100);
      }
    });
  },

  createComment: function (event) {
    event.preventDefault();
    var comments = this.comments;
    var comment = new Cloudsound.Models.Comment();
    $currentTarget = $(event.currentTarget);
    var data = $currentTarget.serializeJSON();
    if (data.content.length < 2) {
      $(".comment-notice").text("Comment must contain more than 1 character.");
      $(".comment-notice").fadeIn(500, function () {
        window.setTimeout(function () {
          $(".comment-notice").fadeOut(500, function () {
            $(".comment-notice").text("");
          });
        }, 5000);
      });
    } else {
      comment.save(data, {
        success: function  (model) {
          comments.add(model);
          $("#new-comment").val("");
        }
      });
    }
  },

  addComment: function (comment) {
    var subview = new Cloudsound.Views.CommentItem({ model: comment });
    subview.$el.show("fade",1000);
    this.addSubview(".track-comments", subview);
  },

  render: function () {
    //only render template after track returns json with user info.
    if (this.model.get("user")) {
      var content = this.template({
        track: this.model,
        user: this.user
      });
      this.$el.html(content);
      this.attachSubviews();
      this.addWaveSurfer();
    }

    return this;
  }
});
