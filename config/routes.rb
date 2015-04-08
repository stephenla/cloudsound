Rails.application.routes.draw do

  resource :session, only: [:create, :new, :destroy]
  resources :users, only: [:create, :new]
  namespace :api do
    resources :users, only: [:show], defaults: { format: :json }
    resources :tracks
  end

  root to: "static_pages#index"
end
