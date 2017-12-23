Rails.application.routes.draw do

  devise_for :users, controllers: {
    omniauth_callbacks: "users/omniauth_callbacks",
    registrations: "users/registrations"
  }

  root 'projects#index'
  get 'projects/index'
  get 'users/:id', to: 'users/users#show', as: :profile

  devise_scope :user do
   delete "/users/sign_out" => "devise/sessions#destroy"
  end

  resources :users

  resources :projects

  resources :users do
    resources :projects
  end

  resources :projects do
    resources :comments
  end
end
