class Api::FollowersController < ApplicationController

  def show
    @user = User.find(params[:id])
    @current_user = current_user
    render :show
  end
end
