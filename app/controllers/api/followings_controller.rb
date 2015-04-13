class Api::FollowingsController < ApplicationController

  before_action :logged_in_user

  def create
    @user = User.find(params[:followed_id])
    current_user.follow(@user)
    render "users/show.json.jbuilder"
  end

  def destroy
    @user = User.find(params[:followed_id])
    current_user.unfollow(@user)
    render "users/show.json.jbuilder"
  end
end
