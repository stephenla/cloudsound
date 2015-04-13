Cloudsound.Views.UserItemFollowing = Backbone.View.extend({
  template: JST["users/user_item_following"],
  className: "follow-user",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }

});