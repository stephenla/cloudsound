class StaticPagesController < ApplicationController
  def index
    if !current_user
      redirect_to new_user_url and return
    end
    render :index
  end
end
