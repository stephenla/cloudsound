Cloudsound.Views.UserFollowers = Backbone.CompositeView.extend({
  template: JST['users/user_followers'],

  initialize: function () {
    this.followers = this.model.followers();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.followers, "add", this.addFollower);
    //why do i need this bind
    this.followers.each(this.addFollower.bind(this));
  },

  addFollower: function (user) {
    var subview = new Cloudsound.Views.UserItemFollower({ model: user });
    this.addSubview(".followers", subview);
    subview.$el.show("fade", 1000);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
