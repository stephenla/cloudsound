Cloudsound.Views.TrackNew = Backbone.View.extend({
  template: JST["tracks/track_new"],

  events: {
    "submit form": "uploadTrack",
    "change #edit-track-avatar": "readURL"
  },

  initialize: function (options) {
    this.user = options.user;
    this.listenTo(this.user, "sync", this.render);
  },

  readURL: function (input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
            if (!Cloudsound.hasExtension('edit-track-avatar', ['.jpg', '.gif', '.png'])) {
              $(".avatar-errors").fadeIn(500, function () {
                window.setTimeout(function () {
                  $(".avatar-errors").fadeOut(500);
                },8000);
              });
            } else {

              $('.track-avatar').attr('src', e.target.result);
            }
          };
          reader.readAsDataURL(input.files[0]);
      }
  },

  render: function () {
    var content = this.template({
      user: this.user
    });
    this.$el.html(content);
    this.renderFileUpload();

    return this;
  },

  renderFileUpload: function () {
    var that = this;

    this.$('#new-track').fileupload({
      url: '/api/tracks',
      replaceFileInput: false,
      progress: function (e, data) {

        var progress = parseInt(data.loaded / data.total * 100, 10);
        that.$('.meter').css('display', "block");
        that.$('.meter span').css('width', progress + '%');
        that.$('.percent').text(progress + '%');
        if (progress === 100) {
          // $('html').prepend($("<div class='loader'></div>").css("height", $('html').css('height')).append("<div class='fade-screen'></div>"));
          $('.loader').show();
        }
      },

      add: function (e, data) {
        file = data.files[0];
        if (data.files[0]) {

          var reader = new FileReader();
          reader.onload = function (e) {
            if (Cloudsound.hasExtension('edit-track-avatar', ['.jpg', '.gif', '.png'])) {
              $('.track-avatar').attr('src', e.target.result);
            }
          };
          reader.readAsDataURL(data.files[0]);
        }
        if (!Cloudsound.hasExtension('track-audio', ['.mp3', '.aac', '.ogg', '.wav'])) {
          that.$("#track-extra-info").hide("fade",1000);
          $(".file-type-error ").fadeIn(500, function () {
            window.setTimeout(function () {
              $(".file-type-error ").fadeOut(500);
            },8000);
          });

        } else {
          $("#track-title").val($("#track-audio").val().replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, ""));
          that.$("#track-extra-info").show("fade",1000);
          $('#save').click(function () {
            if ($("#track-title").val()) {
              if (document.getElementById('edit-track-avatar').value && !Cloudsound.hasExtension('edit-track-avatar', ['.jpg', '.gif', '.png'])) {
                $(".avatar-errors").fadeIn(500, function () {
                  window.setTimeout(function () {
                    $(".avatar-errors").fadeOut(500);
                  },8000);
                });
                return;
              }
              that.$('.meter').css("visibility", "visible");
              data.submit();
            }
          });


        }
      },

      done: function (e, data) {
        $('.loader').hide();
        // $('.loader').remove()
        $("input[type='text']").val("");
        $('#create-track').css("display", "block");
        $('#progress-message').text('Upload finished.');
        Backbone.history.navigate("/user/" + that.user.id + "/track/" + data.result.files[0].id, { trigger: true });

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
    if (!$form.find("#track-audio").val()) {
      $(".file-error").append("File can't be blank");
      $("#track-audio").effect( "shake", 500 );
      $(".errors").css("display", "block");
    }
    event.preventDefault();
    // if data
    // this.model.set(data);
    // this.model.save({}, {
    //   error: function (model, resp) {
    //     $('#progress .bar').css('background', 'red');
    //     $.each(resp.responseJSON, function (key, val){
    //       $(".errors").addClass("alert alert-danger").text(val);
    //     });
    //   },
    // });
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
