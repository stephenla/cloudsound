# Phase 2: User Profile page. Track show page, track likes. Comments (~2 days)

## Rails
### Models
* User
* Track

### Controllers
* API::TracksController (index, create, show, update, destroy)
* API::UsersController (show, update, destroy)

### Views
* user/show.json.jbuilder
* tracks/index.json.jbuilder
* tracks/show.json.jbuilder

## Backbone
### Models
* User (parses nested `tracks` association)
* Track (parses nested `likes` and `comments`  association)

### Collections
* Tracks

### Views
* UserShow (composite view, contains TrackIndex subview)
* UserAccount (composite view, contains TrackIndex and PlaylistIndex subview)
* TrackIndex (composite view, contains TrackIndexItem subview)
* TrackIndexItem
* TrackShow (composite view, contains CommentIndexItem subview)
* TrackForm

## Gems/Libraries
* remoti for ajax file uploads
