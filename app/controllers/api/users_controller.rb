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

  private
  def user_params
    self.params.require(:user).permit(:username, :password)
  end

end
