Cloudsound.Views.ExploreUser = Backbone.View.extend({
  template: JST["explores/explore_user"],
  className: "explore-user",

  initialize: function () {

    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }

});
