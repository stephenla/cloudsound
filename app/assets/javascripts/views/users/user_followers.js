Cloudsound.Views.UserFollowers = Backbone.CompositeView.extend({
  template: JST['users/user_followers'],

  events: {
    "click .unfollow" : "unfollowUser",
    "click .follow" : "followUser"
  },

  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.followers = this.model.followers();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.currentUser, "sync", this.render);
    this.listenTo(this.followers, "add", this.addFollower);
    this.listenTo(this.followers, "remove", this.removeFollower);
    //why do i need this bind
    // this.followers.each(this.addFollower.bind(this));
  },

  addFollower: function (user) {
    var subview = new Cloudsound.Views.UserItemFollower({ model: user });
    subview.$el.show("fade", 1000);
    this.addSubview(".follow-users", subview);
  },

  removeFollower: function (user) {
    var subview = _.find(this.subviews(".follow-users"), function (subview) {
      return subview.model === user;
    });
    this.removeSubview(".follow-users", subview);
  },

  unfollowUser: function (event) {
    event.preventDefault();
    var that = this;
    var relationship = new Cloudsound.Models.Relationship({ id: this.model.get("relationship").relationship_id});
    relationship.fetch({
      success: function(model) {
        model.destroy();
        $(".unfollow").text("Follow").removeClass("unfollow").addClass("follow");
        that.model.fetch();
      }
    });

  },

  followUser: function (event) {
    event.preventDefault();
    var relationship = new Cloudsound.Models.Relationship();
    relationship.save(this.model.get("relationship"),{
      success: function(model) {
        $(".follow").text("Following").removeClass("follow").addClass("unfollow");
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
    if (this.followers.length === 0) {
      this.$('.follow-users').append("<p>" + this.model.get('username') + " has no followers</p>");
    }
    this.addScript();
    return this;
  }
});
