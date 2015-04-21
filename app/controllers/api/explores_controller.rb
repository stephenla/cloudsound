class Api::ExploresController < ApplicationController
  def show
    @users = User.where.not(id: current_user.id).includes(:followers).limit(50).order('random()')
    @tracks = Track.where.not(user_id: current_user.id).limit(10).order('random()')
    @current_user = current_user
    render :show
  end

end
