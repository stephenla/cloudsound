json.extract! @user, :id, :username, :created_at
if @user.tracks
  json.tracks @user.tracks do |track|
    json.extract! track, :id, :title, :user_id, :audio ,:audio_file_name,
    :audio_content_type,
    :audio_file_size,
    :audio_updated_at
  end
end
if @user.following
  json.following @user.following do |user|
    json.extract! user, :username
    json.followers_count user.followers.count
  end
end
if @user.followers
  json.followers @user.followers do |user|
    json.extract! user, :username
    json.followers_count user.followers.count
  end
end

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
