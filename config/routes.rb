Rails.application.routes.draw do
  
  root to: 'static_pages#home'

  get '/login'                                 => 'static_pages#login' 
  get '/:username/add-property'                => 'static_pages#add_property'
  get '/:username/listings'                    => 'static_pages#listings'
  get '/property/:id'                          => 'static_pages#property'
  get '/property/:id/edit-property'            => 'static_pages#edit_property'              
  get '/:username/bookings'                    => 'static_pages#bookings'
  get '/:username/reservations'                => 'static_pages#reservations'
  get '/bookings/:id/success'                  => 'static_pages#successful_booking'         

  namespace :api do 

    post '/users'                              => 'users#create'
    post '/sessions'                           => 'sessions#create'
    get '/authenticated'                       => 'sessions#authenticated'
    get  '/sessions/:id'                       => 'sessions#show'
    delete '/sessions'                         => 'sessions#destroy'
    post '/properties'                         => 'properties#create'
    get '/properties/'                         => 'properties#index'
    get '/properties/:id'                      => 'properties#show'
    get '/users/:username/properties'          => 'properties#index_by_user'
    patch '/properties/:id'                    => 'properties#update'
    delete '/properties/:id'                   => 'properties#destroy'

    resources :bookings, only: [:create, :show]

    get '/properties/:id/bookings'             => 'bookings#get_property_bookings'
    get '/users/:username/properties/bookings' => 'bookings#get_user_properties_bookings'
    get '/users/:username/bookings'            => 'bookings#index_by_user'

    resources :charges, only: [:create]
    
    post '/charges/mark_complete'              => 'charges#mark_complete'

  end
end
