# Phase 2: User Profile page. Track show page, track likes. Comments (~2 days)

## Rails
### Models
* User (has many liked_tracks, has many comments)
* TrackLikes
* Track (has many likes, has many comments)
* Comment (belongs to user, belongs to track)

### Controllers
* API::TracksController (index, create, new, show)
* API::CommentsController (index, create, new, show)

### Views
* user/show.json.jbuilder
* tracks/index.json.jbuilder???

## Backbone
### Models
* User (parses nested `tracks` association)
* Track (parses nested `likes`, `comments`  association)
* Comment

### Collections
* Tracks

### Views
* UserShow (composite view, contains TrackIndex subview)
* TrackShow (composite view, contains CommentIndexItem subview)
* TrackIndex (composite view, contains TrackIndexItem subview)
* TrackIndexItem
* TrackForm

## Gems/Libraries
