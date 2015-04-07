Rails.application.routes.draw do
  resources :users, only: [:create, :new]

  root to: "static_pages#index"
end
