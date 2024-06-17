Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources 'bookings', only: [:create, :update]
      resources 'slots', only: [:create, :index]
      resources 'users', only: [:index]
    end
  end
  root 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end