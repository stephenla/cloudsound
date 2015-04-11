Cloudsound.Views.TrackNew = Backbone.View.extend({
  template: JST["tracks/track_new"],

  events: {
    "submit form": "uploadTrack"
  },

  initialize: function (options) {
    this.currentUser = options.user;
    this.listenTo(this.currentUser, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      currentUser: this.currentUser
    });
    this.$el.html(content);
    this.renderFileUpload();
    return this;
  },

  renderFileUpload: function () {
    that = this;
    this.$('#new_track').fileupload({
      url: '/api/tracks',
      replaceFileInput: false,
      progress: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress').css('display', "block");
        $('#progress .bar').css('width', progress + '%');
      },

      add: function (e, data) {
        $('#create-track').click(function () {
          var types = /(\.|\/)(mp3|aac|ogg|wav)$/i;
          file = data.files[0];
          $(".file-type-error").css("display", "none").empty();
          if (types.test(file.type) || types.test(file.name)) {
            if ($("#track-title").val()) {
              data.submit();
            }
          }
          else {
            $(".file-type-error").css("display", "block").append("Please upload mp3, wav, aac, or ogg file formats");
            $("#track_audio").effect( "shake", 500 );
          }
        });
      },

      done: function (e, data) {
        $("input[type='text']").val("");
        $('#create-track').css("display", "block");
        $('#progress-message').text('Upload finished.');
        Backbone.history.navigate("track/" + data.result.id, { trigger: true });

      },

      fail: function (e, data) {
        $('#progress .bar').css('background', 'red');
        $.each(data.jqXHR.responseJSON, function (key, val){
          $(".errors").addClass("alert alert-danger").text(val);
        });

      }
    });
  },

  uploadTrack: function (event) {
    var $form = $(event.currentTarget);
    var data = $form.serializeJSON();
    $(".errors").css("display", "none");
    $(".errors").find("p:not(.file-type-error)").empty();
    if (!$form.find("#track-title").val()) {
      $(".track-title-wrapper").effect( "shake", 500 );
      $(".title-error").prepend("Title can't be blank");
      $(".errors").css("display", "block");
    }
    if (!$form.find("#track_audio").val()) {
      $(".file-error").append("File can't be blank");
      $("#track_audio").effect( "shake", 500 );
      $(".errors").css("display", "block");
    }
    event.preventDefault();
    // if data
    // debugger
    // this.model.set(data);
    // this.model.save({}, {
    //   error: function (model, resp) {
    //     debugger
    //     $('#progress .bar').css('background', 'red');
    //     $.each(resp.responseJSON, function (key, val){
    //       $(".errors").addClass("alert alert-danger").text(val);
    //     });
    //   },
    // });
    // debugger
    // event.stopPropagation();

    // $form.bind('ajax:complete', function(event, data) {
    //   Backbone.history.navigate("", { trigger: true });
    // });
    // $form.bind('ajax:error', function(event, data) {
    //
    //   $.each(data.responseJSON, function (key, val){
    //     $(".errors").addClass("alert alert-danger").text(val);
    //   });
    // });
  }

});
