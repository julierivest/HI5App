Rails.application.routes.draw do

  devise_for :users, controllers: {
    omniauth_callbacks: "users/omniauth_callbacks",
    registrations: "users/registrations"
  }

  devise_scope :user do
    delete "/users/sign_out" => "devise/sessions#destroy"
  end

  resources :users do
    resources :projects
  end

  get '/profile', to: 'users#show', as: :profile

  resources :projects do
    resources :comments
  end

  root 'projects#index'
end
