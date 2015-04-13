Cloudsound.Views.UserFollowers = Backbone.CompositeView.extend({
  template: JST['users/user_followers'],

  initialize: function () {
    this.followers = this.model.followers();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.followers, "add", this.addFollower);
  },

  addFollower: function (user) {
    var subview = new Cloudsound.Views.UserItemFollowing({ model: user });
    this.addSubview(".followers", subview);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
