class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])
    @current_user = current_user
    if @user
      render :show
    else
      render @user.errors.full_messages, status: 422
    end
  end

  def update

    @user = User.find(params[:id])
    if params[:delete_avatar] == "1"
      @user.avatar = nil
    end
    if @user.update(user_params)
      redirect_to "/#user/#{@user.id}/settings"
    else
      render @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    self.params.require(:user).permit(:username, :password, :avatar)
  end

end
