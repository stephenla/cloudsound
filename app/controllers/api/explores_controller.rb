class Api::ExploresController < ApplicationController
  def show
    @users = User.where.not(id: current_user.id).includes(:followers)
    @tracks = Track.where.not(user_id: current_user.id)
    @current_user = current_user
    render :show
  end

end
