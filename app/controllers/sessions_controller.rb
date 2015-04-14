class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      log_in!(@user)
      redirect_to "/static/index"
    else
      flash.now[:errors] = ["Invalid username/password"]
      render :new
    end
  end

  def new
    @user = User.new
    render :new
  end

  def destroy
    log_out!(current_user) if current_user
    redirect_to new_session_url
  end

  def guest
    @user = User.find_by_credentials(
      "frank_farrell",
      "password"
    )
    if @user
      log_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Unexpected Error."]
      render :new
    end
  end
end
