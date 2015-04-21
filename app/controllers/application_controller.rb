class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user
  helper_method :welcome_image

  def current_user
    @current_user ||= Session.find_by(:session_token => session[:session_token]).try(:user)
  end

  def log_in!(user)
    new_session = user.sessions.create!()
    self.session[:session_token] = new_session.session_token
  end

  def log_out!(user)
    user.reset_session_token!
    self.session[:session_token] = nil
  end

  def logged_in?
    current_user
  end

  def welcome_image
    contents = File.readlines("#{Rails.root}/app/assets/images/wallpaper.txt")
    contents.sample.chomp
  end
end
