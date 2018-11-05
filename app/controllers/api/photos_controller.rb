class Api::PhotosController < ApplicationController

  def all 
    render json: Photo.order(date: :desc)
  end

  def show
    render json: Photo.find_by_date(params[:date])
  end

  def latest
    render json: Photo.last
  end

  def random
    render json: Photo.all.sample
  end
end