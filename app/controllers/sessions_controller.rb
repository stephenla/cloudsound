class SessionsController < ApplicationController
  before_action :require_login, only: [:new, :create]

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      log_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid username/password"]
      render "static_pages/welcome"
    end
  end

  def new
    @user = User.new
    render :new
  end

  def destroy
    user_session = current_user.sessions.find_by(session_token: session[:session_token])
    session[:session_token] = nil
    if user_session
      user_session.destroy
      redirect_to root_url
    else
      redirect_to root_url
    end
  end

  def guest
    @user = User.find(2)
    if @user
      log_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Unexpected Error"]
      render "static_pages/welcome"
    end
  end

  def log_out_all
    current_user.sessions.each do |session|
      session.destroy unless session.session_token == session[:session_token]
    end
    redirect_to :back
  end

  def log_out_remote
    user_session = current_user.sessions.find(params[:id])
    if user_session
      user_session.destroy
    else
      flash[:error] = "No session"
    end
    redirect_to :back
  end

  private
    def require_login
      if logged_in?
        redirect_to new_session_url
      end
    end
end
