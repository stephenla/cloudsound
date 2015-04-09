class Api::CurrentUsersController < ApplicationController
  def show
    @user = current_user
    if @user
      render :show
    else
      render status: 422
    end
  end
end
