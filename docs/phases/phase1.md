# Phase 1: User Authentication, Create Tracks (~1 day)

## Rails
### Models
* User (has many tracks)
* Track (belongs to user)

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* API::TracksController (index, create, show)

### Views
* users/new.html.erb
* session/new.html.erb

## Backbone
### Models
* Track

### Collections

### Views
* TrackNew
* TrackForm

## Gems/Libraries
* Filepicker
