class Api::LikesController < ApplicationController

  def create
    @like = Like.new(like_params)
    if @like.save
      render json: @like
    else
      render json: @like.errors.full_messages
    end
  end

  private
    def like_params
      params.require(:like).permit(:user_id, :track_id)
    end
end
