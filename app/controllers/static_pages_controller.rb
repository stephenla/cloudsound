class StaticPagesController < ApplicationController
  def index

    if current_user
      @user = current_user
      render :index
    else
      render :welcome
    end
  end

  def about
    render :about
  end
end
