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
    update_params = user_params
    @user = User.find(params[:id])
    if params[:delete_avatar] == "1"
      @user.avatar = nil
    end
    if (update_params[:username] == @user.username)
      update_params.delete(:username)
    end
    if @user.update(update_params)
      flash[:notice] = ["User information updated."]
      redirect_to "/#user/#{@user.id}/settings?updated=true"
    else
      render @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    self.params.require(:user).permit(:username, :password, :avatar, :first_name, :last_name, :description)
  end

end
