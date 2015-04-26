# Phase 3: Comments, following, user Feeds (~2 days)

## Rails
### Models
* Following (belongs to followed, belongs to following)
* Tracks (has many followed tracks through followings)
* User (has many tracks)

### Controllers
* Api::TracksController (feed, search)
* Api::UsersController (search)

### Views
* tracks/feed.json.jbuilder
* tracks/search.json.jbuilder
* users/search.json.jbuilder

## Backbone
### Models
* User (parses nested `followers` and `following` association)
* User
* Track

### Collections
* User
* Track

### Views
* SearchIndex (composite view, contains TrackIndex and UserIndex subview)
* TrackIndex (composite view, contains TrackIndexItem subview)
* TrackIndexItem
* UserIndex (composite view, contains UserIndexItem subview)
* UserIndexItem

## Gems/Libraries
