class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
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
