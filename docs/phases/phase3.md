# Phase 3: Playlist show, playlist likes. Following users (~ 2 day)

## Rails
### Models
* Playlist (has many tracks)
* Track (belongs to playlist)

### Controllers
* API::PlaylistsController (index, create, show, update, destroy)
* API::TracksController (show)

### Views
* playlists/index.json.jbuilder
* playlists/show.json.jbuilder
* track/show.json.jbuilder

## Backbone
### Models
* Playlist (parses nested `tracks` and `likes` association)
* Track

### Collections
* Playlists

### Views
* PlaylistIndex (composite view, contains PlaylistIndexItem subview)
* PlaylistIndexItem
* PlaylistShow (composite view, contains TrackIndexItem subview)
* PlaylistForm

## Gems/Libraries
