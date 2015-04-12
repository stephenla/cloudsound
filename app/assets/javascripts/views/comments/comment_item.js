Cloudsound.Views.CommentItem = Backbone.View.extend({
  template: JST['comments/comment_item'],

  tagName: "li",

  className: "comment-item list-group-item clearfix",

  render: function () {
    var content = this.template({ comment: this.model });
    this.$el.html(content);
    return this;
  }

});
