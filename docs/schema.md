# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | integer   | not null, foreign key (references folowing user)
followed_id | integer   | not null, foreign key (references followed user)

## tracks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references user)
playlist_id | integer   | not null, foreign key (references playlist)
title       | string    | not null

## playlists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null

## track_likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | string    | not null
track_id    | string    | not null

## playlist_likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | string    | not null
track_id    | string    | not null
