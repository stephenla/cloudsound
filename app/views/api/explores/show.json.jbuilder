json.extract! @current_user, :id, :username, :created_at

json.other_users @users do |user|
  json.extract! user, :id, :username, :created_at
  json.followers_count user.followers.length
  if user.avatar.file?
    json.has_avatar true
  else
    json.has_avatar false
  end
  json.avatar user.avatar
  json.avatar_medium user.avatar.url(:medium)
  json.avatar_gradient user.avatar_gradient
end


json.other_tracks @tracks do |track|
  json.extract! track, :id, :title, :user_id, :audio ,:audio_file_name,
  :audio_content_type,
  :audio_file_size,
  :audio_updated_at
  json.avatar_gradient track.avatar_gradient
  json.track_gradient track.track_gradient
  json.time_ago time_ago_in_words(track.created_at).gsub('about','').strip

  track_user = track.user
  json.user do
    json.extract! track_user, :id, :username, :created_at
    json.avatar track_user.avatar.url
    json.avatar_thumb track_user.avatar.url(:thumb)
    json.avatar_medium track_user.avatar.url(:medium)
    json.avatar_mini track_user.avatar.url(:mini)
    json.followers_count track_user.followers.length
  end
end
