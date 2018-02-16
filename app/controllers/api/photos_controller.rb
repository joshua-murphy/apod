class Api::PhotosController < ApplicationController

  def index 
    render json: Photo.all
  end

end