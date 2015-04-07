class StaticPagesController < ApplicationController
  def index
    # if !current_user
    #   redirect_to new_user_url
    # end
    redirect_to new_user_url and return
    render :index
  end
end
