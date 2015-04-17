Cloudsound.Views.TrackShow = Backbone.CompositeView.extend({
  template: JST['tracks/track_show'],
  events: {
    "click .delete-track": "destroyTrack",
    "submit #new-comment-form": "createComment"
  },
  initialize: function (options) {
    this.comments = this.model.comments();
    this.user = options.user;
    this.userTracks = this.user.tracks();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.comments, "add", this.addComment);
    this.listenTo(this.user, "sync", this.render);
    // this.comments.each(this.addComment.bind(this));
    var commentNew = new Cloudsound.Views.CommentNew({ model: this.model });
    this.addSubview(".comment-box", commentNew);

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

  createComment: function (event) {
    event.preventDefault();
    var comments = this.comments;
    var comment = new Cloudsound.Models.Comment();
    $currentTarget = $(event.currentTarget);
    var data = $currentTarget.serializeJSON();
    if (data.content.length < 2) {
      $(".comment-notice").text("Comment must contain more than 1 character.");
      $(".comment-notice").fadeIn(500, function () {
        window.setTimeout(function () {
          $(".comment-notice").fadeOut(500, function () {
            $(".comment-notice").text("");
          });
        }, 5000);
      });
    } else {
      comment.save(data, {
        success: function  (model) {
          comments.add(model);
          $("#new-comment").val("");
        }
      });
    }
  },

  addComment: function (comment) {
    var subview = new Cloudsound.Views.CommentItem({ model: comment });
    subview.$el.show("fade",1000);
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
