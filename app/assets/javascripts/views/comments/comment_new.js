Cloudsound.Views.CommentNew = Backbone.View.extend({
  template: JST['comments/comment_new'],
  className: "comment-form-wrapper",
  render: function () {
    var content = this.template({ track: this.model });
    this.$el.html(content);
    return this;
  }

});
