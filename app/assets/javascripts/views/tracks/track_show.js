Cloudsound.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/track_show'],
  events: {
    "click .delete-track": "destroyTrack"
  },
  initialize: function (options) {
    this.comments = this.model.comments();
    this.user = options.user;
    this.userTracks = this.user.tracks();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.comments, "add", this.addComment.bind(this));
    this.listenTo(this.user, "sync", this.render);
    // this.comments.each(this.addComment.bind(this));
  },

  destroyTrack: function (event) {
    var that = this;
    event.preventDefault();
    this.model.destroy({
      success: function (model) {
        Backbone.history.navigate("user/" +  model.get("user").id, { trigger: true });
        that.userTracks.remove(model);
        // remove view after model destroyed?
        //why doesnt swapView in navigate remove this view.
        that.remove();
      }
    });
  },

  addComment: function (comment) {
    var subview = new Cloudsound.Views.CommentItem({ model: comment });
    this.addSubview(".track-comments", subview);
  },

  render: function () {
    //only render template after track returns json with user info.
    if (this.model.get("user")) {
      var content = this.template({
        track: this.model,
        user: this.user
      });
      this.$el.html(content);
      this.attachSubviews();
    }
    return this;
  }
});
