Cloudsound.Views.TrackEdit = Backbone.View.extend({
  template: JST['tracks/track_edit'],

  events: {
    "submit form": "editTrack"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  editTrack: function (event) {

    event.preventDefault();
    var that = this;
    var data = $(event.currentTarget).serializeJSON();
    this.model.save(data, {
      success: function () {
        $(".notice").remove();
        $('body').prepend($("<div class='notice alert slideLeft'>Track information updated</div>"));
        window.setTimeout(function () {
          $(".notice").remove();
        }, 10000);
      }
    });
  },

  render: function () {
    var content = this.template({ track: this.model });
    this.$el.html(content);
    return this;
  }

});
