class Api::PhotosController < ApplicationController

  def all 
    render json: Photo.order(date: :desc)
  end

  def show
    render json: Photo.where(date: params[:date]).first
  end

  def latest
    render json: Photo.order(date: :desc).first
  end

  def random
    render json: Photo.all.sample
  end

end