Cloudsound.Views.UserFollowers = Backbone.CompositeView.extend({
  template: JST['users/user_followers'],

  events: {
    "click .unfollow" : "unfollowUser",
    "click .follow" : "followUser"
  },

  initialize: function () {
    this.followers = this.model.followers();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.followers, "add", this.addFollower);
    //why do i need this bind
    // this.followers.each(this.addFollower.bind(this));
  },

  addFollower: function (user) {
    
    var subview = new Cloudsound.Views.UserItemFollower({ model: user });
    subview.$el.show("fade", 1000);
    this.addSubview(".follow-users", subview);
  },

  unfollowUser: function (event) {
    event.preventDefault();
    var relationship = new Cloudsound.Models.Relationship({ id: this.model.get("relationship").relationship_id});
    relationship.fetch({
      success: function(model) {
        model.destroy();
        this.model.fetch();
      }.bind(this)
    });

  },

  followUser: function (event) {
    event.preventDefault();
    var relationship = new Cloudsound.Models.Relationship();
    relationship.save(this.model.get("relationship"),{
      success: function(model) {
        this.model.fetch();
      }.bind(this)
    });

  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
