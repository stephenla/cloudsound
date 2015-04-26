# CloudSound
##[Live Link](http://www.cloudsound.io)

## Minimum Viable Product
Soundcloud mini is a clone of Soundcloud built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->
Phase 1
- [x] Create User accounts
- [x] Create sessions (log in)
- [x] Upload tracks

Phase 2
- [x] User profile view
- [x] User account view
- [x] Explore tracks
- [x] Show tracks
- [x] Delete tracks
- [x] Edit tracks
- [x] Play tracks

Phase 3
- [x] Add comments to tracks
- [x] Follow users
- [x] User feeds



## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Create Tracks (~3 days)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create tracks using
an audio upload form. The most important part of this phase will be pushing the
app to Heroku and ensuring that everything works before moving on to phase 2.

[Details][phase-one]

### Phase 2: User Profile page. User edit, delete. Track show, edit, create. (~5 days)
Create the user profile page. The user profile page will show the users bio,
uploaded tracks, likes, playlists, following, and followers.

Create user account page, where user can edit and delete account. Add links to the user's tracks and playlists

Track show page will show short owner bio, track comments, and users who liked
the track.

Implement track show, delete, edit.


[Details][phase-two]

### Phase 3: Comments, following, user Feeds. (~5 days)
Implement adding comments to tracks.

Implement following between users. Add following and unfollowing button to user
profile page. Add following and followed pages to user profile page.

The users feed will be the `''` index route. The feed will be a list of tracks
that the users followings have posted in chronological order. Index page will
also show users likes and playlists.

[Details][phase-three]

## Extra Features (TBD)
Phase 4
- [ ] Create playlists
- [ ] Index playlists
- [ ] Show playlists
- [ ] Delete playlists
- [ ] Edit playlists
- [ ] Add track to playlists

Phase 5
- [ ] Track likes
- [ ] Playlist likes
- [ ] User search
- [ ] Track search

Phase 6
- [ ] Drag n Drop tracks to playlists and likes
- [ ] Infinite scroll feed
- [ ] Make custom urls
- [ ] Customize user profile
- [ ] Add background images for tracks and users[]

### Phase 4: Playlist create, show, edit, delete. Add track to playlist (~5 days)
Create Playlist link and form.

Playlist show page will show short user bio, tracks belonging to the playlist,
and users who liked the playlist. Implement playlist create, show, edit, delete.

Implement adding tracks to playlist.


[Details][phase-four]


### Phase 5: Likes for playlist and tracks. User and track search. (~5 days)
Implement liking tracks and playlists.

Create a `search` route that will render a search form. Search will search both
users and tracks by default, can be filtered to show only users or only tracks.

[Details][phase-five]


### Phase 6: Drag and drop tracks into likes or playlists (~5 days)
Add drag and drop for TrackIndexItems into playlists or likes list. Any view
with TrackIndexItems will have drag and drop.

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
