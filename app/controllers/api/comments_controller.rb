class Api::CommentsController < ApplicationController

  def show
    @comment = Comment.find(params[:id])
    render "show.json.jbuilder"
  end

end
