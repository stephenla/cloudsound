Cloudsound.Views.UserFollowing = Backbone.CompositeView.extend({
  template: JST['users/user_following'],

  initialize: function () {
    this.followings = this.model.following();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.followings, "add", this.addFollowing);
    // this.followings.each(this.addFollowing.bind(this));
  },

  addFollowing: function (user) {
    var subview = new Cloudsound.Views.UserItemFollowing({ model: user });
    subview.$el.show("fade", 1000);
    this.addSubview(".follow-users", subview);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
