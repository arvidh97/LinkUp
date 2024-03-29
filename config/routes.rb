Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get 'api/test', to: 'application#test'
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :show, :destroy]
    resources :posts, only: [:create, :show, :index, :update, :destroy] do 
      resources :likes, only: [:create, :destroy]
      resources :comments, only: [:create, :destroy, :update]
    end
end
get '*path', to: "static_pages#frontend_index"
end
