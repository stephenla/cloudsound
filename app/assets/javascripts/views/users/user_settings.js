Cloudsound.Views.UserSettings = Backbone.View.extend({
  template: JST["users/user_settings"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    window.setTimeout(function () {
      this.$('.notice').hide("fade", 500, function () { this.$('.notice').removeClass("slideLeft"); });
    }.bind(this), 8000);
    return this;
  }

});
