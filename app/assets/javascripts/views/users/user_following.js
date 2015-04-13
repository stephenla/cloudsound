Cloudsound.Views.UserFollowing = Backbone.CompositeView.extend({
  template: JST['users/following'],



  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }
});
