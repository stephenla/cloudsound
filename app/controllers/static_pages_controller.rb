class StaticPagesController < ApplicationController
  def index
    if !current_user
      redirect_to new_user_url
    else
      render :index
    end
  end
end
