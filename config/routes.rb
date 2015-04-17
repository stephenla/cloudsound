Rails.application.routes.draw do

  resource :session, only: [:create, :new, :destroy]
  resources :users, only: [:create, :new]
  post '/session/guest', to: 'sessions#guest'

  namespace :api do
    resources :users, only: [:show, :index, :update], defaults: { format: :json }
    resources :tracks, defaults: { format: :json }
    resources :comments, defaults: { format: :json }
    resources :followings
    resources :feeds, only: [:show], defaults: { format: :json }
    resource :current_users, only: [:show], defaults: { format: :json }
  end

  root to: "static_pages#index"
end
