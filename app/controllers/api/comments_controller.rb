class Api::CommentsController < ApplicationController

  def show
    @comment = Comment.find(params[:id])
    render "show.json.jbuilder"
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render json: @comment
    else
      render @comment.errors.full_messages, status: 422
    end
  end

  private
  def comment_params
    self.params.require(:comment).permit(:track_id, :user_id, :content)
  end
end
