class Api::PhotosController < ApplicationController

  def index 
    render json: Photo.order(date: :desc)
  end

end