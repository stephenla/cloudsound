Rails.application.routes.draw do
  resource :session, only: [:create, :new, :destroy]
  resources :users, only: [:create, :new]
  namespace :api do
    resource :user, only: [:show], defaults: { format: :json }
  end

  root to: "static_pages#index"
end
