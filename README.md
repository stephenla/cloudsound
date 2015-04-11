# Soundcloud Mini

<!-- [Heroku link][heroku] -->

<!-- [heroku]: -->

## Minimum Viable Product
Soundcloud mini is a clone of Soundcloud built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->
Phase 1
- [ ] Create User accounts
- [ ] Create sessions (log in)
- [ ] Upload tracks

Phase 2
- [ ] User profile view
- [ ] User account view
- [ ] Index tracks
- [ ] Show tracks
- [ ] Delete tracks
- [ ] Edit tracks
- [ ] Play tracks

Phase 3
- [ ] Create playlists
- [ ] Index playlists
- [ ] Show playlists
- [ ] Delete playlists
- [ ] Edit playlists
- [ ] Add track to playlists

Phase 4
- [ ] Add comments to tracks
- [ ] Follow users
- [ ] User feeds
- [ ] See other users feeds?

Phase 5
- [ ] Track likes
- [ ] Playlist likes
- [ ] User search
- [ ] Track search
- [ ] Drag n Drop tracks to playlists and likes

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Create Tracks (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create tracks using
an audio upload form. The most important part of this phase will be pushing the
app to Heroku and ensuring that everything works before moving on to phase 2.

[Details][phase-one]

### Phase 2: User Profile page. User edit, delete. Track show, edit, create. (~3 days)
Create the user profile page. The user profile page will show the users bio,
uploaded tracks, likes, playlists, following, and followers.

Create user account page, where user can edit and delete account. Add links to the user's tracks and playlists

Track show page will show short owner bio, track comments, and users who liked
the track.

Implement track show, delete, edit.


[Details][phase-two]

### Phase 3: Playlist create, show, edit, delete. Add track to playlist (~2 day)
Create Playlist link and form.

Playlist show page will show short user bio, tracks belonging to the playlist,
and users who liked the playlist. Implement playlist create, show, edit, delete.

Implement adding tracks to playlist.


[Details][phase-three]

### Phase 4: Comments, following, user Feeds. (~3 days)
Implement adding comments to tracks.

Implement following between users. Add following and unfollowing button to user
profile page. Add following and followed pages to user profile page.

The users feed will be the `''` index route. The feed will be a list of tracks
that the users followings have posted in chronological order. Index page will
also show users likes and playlists.



[Details][phase-four]

### Phase 5: Likes for playlist and tracks. User and track search. (~2 days)
Implement liking tracks and playlists.

Create a `search` route that will render a search form. Search will search both
users and tracks by default, can be filtered to show only users or only tracks.

[Details][phase-five]


### Phase 6: Drag and drop tracks into likes or playlists (~2 days)
Add drag and drop for TrackIndexItems into playlists or likes list. Any view
with TrackIndexItems will have drag and drop.



### Bonus Features (TBD)
- [ ] Infinite scroll feed
- [ ] Make custom urls
- [ ] Customize user profile
- [ ] Add background images for tracks and users[]

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md


### TODO
