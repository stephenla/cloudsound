class Api::FeedsController < ApplicationController

  def show
    @user = current_user
    render :show
  end

end
