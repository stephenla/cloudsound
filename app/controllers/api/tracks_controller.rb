class Api::TracksController < ApplicationController
  def index

  end

  def create
    @track = Track.new(track_params)
    if @track.save
      render :show
    else
      render json: @track.errors, status: 422
    end
  end

  def destroy
  end

  def update
  end
  def new
    @track = Track.new
    render :new

  end

  def show
    @track = Track.find(params[:id])
    if @track
      render :show
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def edit
  end
  private
    def track_params
      self.params.require(:track).permit(:title, :user_id, :playlist_id, :audio)
    end
end
