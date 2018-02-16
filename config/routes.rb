Rails.application.routes.draw do

  get '/api/', to: 'api/photos#latest'
  get '/api/all', to: 'api/photos#all'
  get '/api/random', to: 'api/photos#random'

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
