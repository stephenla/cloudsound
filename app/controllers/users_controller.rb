class UsersController < ApplicationController
  def create
    @user = User.new(user_params.merge({
      avatar_gradient: "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})"
    }))
    if @user.save
      log_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render "static_pages/welcome"
    end
  end

  def new
    @user = User.new
    render :new
  end

  private
  def user_params
    self.params.require(:user).permit(:username, :password, :avatar)
  end

  def logged_in_user
    unless logged_in?
      flash[:danger] = "Please log in."
      redirect_to login_url
    end
  end

end
