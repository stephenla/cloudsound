Rails.application.routes.draw do

  resource :session, only: [:create, :new, :destroy]
  delete "session/log_out_all" => "sessions#log_out_all", as: :log_out_all
  delete "session/:id/log_out" => "sessions#log_out_remote", as: :log_out_remote

  resources :users, only: [:create, :new]
  post '/session/guest', to: 'sessions#guest'

  namespace :api do
    resources :users, only: [:show, :index, :update], defaults: { format: :json }
    resources :tracks, defaults: { format: :json }
    resources :comments, defaults: { format: :json }
    resources :followings, only: [:show, :create, :destroy]
    resources :feeds, only: [:show], defaults: { format: :json }
    resources :followers, only: [:show], defaults: { format: :json }
    resources :follows, only: [:show], defaults: { format: :json }
    resource :current_users, only: [:show], defaults: { format: :json }
  end

  root to: "static_pages#index"
end
