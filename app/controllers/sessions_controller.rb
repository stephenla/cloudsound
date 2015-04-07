class SessionsController < ApplicationController
  def create
    @user = find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      log_in!(@user)
      fail
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def new
    render :new
  end

  def destroy
    log_out!(current_user)
    redirect_to new_session_url
  end
end
