# Phase 5: Drag and drop tracks into likes or playlists (~2 days)

## Rails
### Models
* Playlist (has many tracks)
* Tracks (belongs to playlist)
* TrackLike (belongs to track, belongs to user)

### Controllers
* Api::PlaylistsController (edit)
* Api::TracksController (edit)

### Views

## Backbone
### Models
* Playlist
* Track (parses nested `liked_tracks` association)
* TrackLike

### Collections
* Playlists
* Tracks
* TrackLikes

### Views
* PlaylistIndex (composite view, contains PlaylistIndexItem subview)
* PlaylistIndexItem
* TrackIndex (composite view, contains TrackIndexItem subview)
* TrackIndexItem

## Gems/Libraries
* JQuery UI
