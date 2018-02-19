Rails.application.routes.draw do

  get '/api/photos/all', to: 'api/photos#all'
  get '/api/photos/latest', to: 'api/photos#latest'
  get '/api/photos/random', to: 'api/photos#random'
  get '/api/photos/:date', to: 'api/photos#show'

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
