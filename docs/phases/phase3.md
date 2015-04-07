# Phase 3: Playlist show, playlist likes. Following users (~ 2 day)

## Rails
### Models
* Following (belongs to followed, belongs to following)
* User (has many liked_tracks, has many comments)
* PlaylistLikes
* Playlist (has many likes, has many tracks)

### Controllers
* API::PlaylistsController (index, create, new, show)

### Views
* user/index.json.jbuilder
* playlists/index.json.jbuilder???

## Backbone
### Models
* User (parses nested `followers` and `following` association)
* Playlist (parses nested `likes` association)

### Collections
* Playlists

### Views
* PlaylistShow (composite view, contains TrackIndexItem subview)
* PlaylistIndex (composite view, contains PlaylistIndexItem subview)
* PlaylistIndexItem
* PlaylistForm
* UserIndex (composite view, contains UserIndexItem subview)
* UserIndexItem

## Gems/Libraries
