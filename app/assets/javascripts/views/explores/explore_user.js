Cloudsound.Views.ExploreUser = Backbone.View.extend({
  template: JST["explores/explore_user"],
  className: "explore-user",

  initialize: function () {

    this.listenTo(this.model, "sync", this.render);
  },
  
  events: {
  "click .unfollow" : "unfollowUser",
  "click .follow" : "followUser"
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
    return this;
  }

});
