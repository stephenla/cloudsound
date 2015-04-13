class Api::FollowingsController < ApplicationController

  before_action :logged_in?

  def show
    @relationship = Following.find(params[:id])
  end

  def create
    @user = User.find(params[:followed_id])
    current_user.follow(@user)
    render "api/users/show.json.jbuilder"
  end

  def destroy
    @relationship = Following.find(params[:id])
    @relationship.destroy
    render json: "user unfollowed"
  end
end
