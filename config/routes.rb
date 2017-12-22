Rails.application.routes.draw do

  devise_for :admins
  devise_for :users, controllers: {
    omniauth_callbacks: "users/omniauth_callbacks",
    registrations: "users/registrations"
  }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'projects#index'
  get 'projects/index'

  resources :users
  resources :users do
    resources :projects
  end

  get 'users/:id', to: 'users/users#show', as: :profile


  resources :projects do
    resources :comments
  end


   resources :projects

  devise_scope :user do
   delete "/users/sign_out" => "devise/sessions#destroy"
  end



end
