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
- [ ] View user profiles
- [ ] Show tracks
- [ ] Track likes
- [ ] Add comments to tracks

Phase 3
- [ ] Create playlists
- [ ] Show playlists
- [ ] Playlist likes
- [ ] Add track to playlists
- [ ] Follow users

Phase 4
- [ ] User feeds
- [ ] User search
- [ ] Track search

Phase 5
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

### Phase 2: User Profile page. Track show page, track likes. Comments (~2 days)
Create the user profile page. The user profile page will show the users bio,
uploaded tracks, likes, playlists, following, and followers.
Track show page will show short owner bio, track comments, and users who liked
the track. Implement like button for tracks and adding comments.
Comment model, views and subviews. Create Comments

[Details][phase-two]

### Phase 3: Playlist show, playlist likes. Following users (~ 2 day)
Create Playlist link and form. Playlist show page will show short owner bio,
tracks belonging to the playlist, and users who liked the playlist. Implement
adding tracks to playlist and liking playlist.
Allow users to follow other users. Add following and unfollowing button to user
profile page. Add following and followed pages to user profile page.

[Details][phase-three]

### Phase 4: User Feeds (~2 days)
The users feed will be the `''` index route. The feed will be a list of tracks
that the users followings have posted in chronological order. Index page will
also show current users likes and playlists.

Create a `search` route that will render a search form. Search will search both
users and tracks by default, can be filtered to show only users or only tracks.

[Details][phase-four]

### Phase 5: Drag and drop tracks into likes or playlists (~2 days)
Add drag and drop for TrackIndexItems into playlists or likes list. Any view
with TrackIndexItems will have drag and drop.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Infinite scroll feed

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md


### TODO
