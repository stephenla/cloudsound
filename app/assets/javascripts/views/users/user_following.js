Cloudsound.Views.UserFollowing = Backbone.CompositeView.extend({
  template: JST['users/user_following'],

  events: {
    "click .unfollow" : "unfollowUser",
    "click .follow" : "followUser"
  },

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

  addScript: function () {
    $("." + $(".follow-links.list").parent().attr('class')).hover(function () {
      $(this).find('.follow-links.list').show('fade', 300);
    }, function () {
      $(this).find('.follow-links.list').hide('fade', 300);
    });
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    if (this.followings.length === 0) {
      this.$('.follow-users').append("<p>" + this.model.get('username') + " is not following any users</p>");
    }
    this.addScript();
    return this;
  }
});
