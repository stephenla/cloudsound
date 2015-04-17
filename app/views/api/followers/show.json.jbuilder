json.extract! @user, :id, :username, :created_at
followers = @user.followers.includes(:followers)
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
