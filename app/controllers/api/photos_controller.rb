class Api::PhotosController < ApplicationController

  def all 
    render json: Photo.order(date: :desc)
  end

  def latest
    render json: Photo.order(date: :desc).first
  end

  def random
    render json: Photo.all.sample
  end

end