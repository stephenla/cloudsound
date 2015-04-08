Rails.application.routes.draw do
  namespace :api do
  get 'tracks/index'
  end

  namespace :api do
  get 'tracks/create'
  end

  namespace :api do
  get 'tracks/destroy'
  end

  namespace :api do
  get 'tracks/update'
  end

  namespace :api do
  get 'tracks/show'
  end

  namespace :api do
  get 'tracks/edit'
  end

  resource :session, only: [:create, :new, :destroy]
  resources :users, only: [:create, :new]
  namespace :api do
    resource :user, only: [:show], defaults: { format: :json }
  end

  root to: "static_pages#index"
end
