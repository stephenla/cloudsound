Rails.application.routes.draw do
  resources :session, only: [:create, :new, :destroy]
  resources :users, only: [:create, :new]

  root to: "static_pages#index"
end
