Cloudsound.Views.UserItemFollower = Backbone.View.extend({
  template: JST["users/user_item_following"],
  className: "following-user col-xs-6 col-sm-4 col-md-3 col-lg-2",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }

});
