following = @user.following.includes(:followers)
followers = @user.followers.includes(:followers)
tracks = @user.tracks


json.extract! @user, :id, :username, :created_at
json.follower_count followers.length
json.track_count tracks.length

# if tracks
  json.tracks tracks do |track|
    json.extract! track, :id, :title, :user_id, :audio ,:audio_file_name,
    :audio_content_type,
    :audio_file_size,
    :audio_updated_at
    json.time_ago time_ago_in_words(track.created_at).gsub('about','').strip
    json.user do
      json.extract! @user, :id, :username, :created_at
      json.avatar @user.avatar.url
      json.avatar_thumb @user.avatar.url(:thumb)
      json.avatar_medium @user.avatar.url(:medium)
      json.avatar_mini @user.avatar.url(:mini)
      json.followers_count @user.followers.length
    end
  end
# end

if @user.feed
  json.feed @user.feed do |track|
    json.extract! track, :id, :title, :user_id, :audio ,:audio_file_name,
    :audio_content_type,
    :audio_file_size,
    :audio_updated_at
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
end


json.following following do |user|
  json.extract! user, :username, :id
  json.followers_count user.followers.length
end
json.followers followers do |user|
  json.extract! user, :username, :id
  json.followers_count user.followers.length
end


if @current_user != @user
  json.relationship do
    if @user.passive_relationships.where(follower_id: current_user.id).empty?
      json.is_following false
      json.follower_id current_user.id
      json.followed_id @user.id
    else
      json.is_following true
      json.relationship_id @user.passive_relationships.where(follower_id: current_user.id).first.id
    end
  end
end


if @user.avatar.file?
  json.has_avatar true
else
  json.has_avatar false
end
json.avatar @user.avatar
json.avatar_thumb @user.avatar.url(:thumb)
json.avatar_medium @user.avatar.url(:medium)
json.avatar_mini @user.avatar.url(:mini)
json.avatar_gradient @user.avatar_gradient
