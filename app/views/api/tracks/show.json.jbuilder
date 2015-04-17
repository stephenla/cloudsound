comments = @track.comments.includes(:user)

json.extract! @track,
:id,
:title,
:user_id,
:audio,
:audio_file_name,
:audio_content_type,
:audio_file_size,
:audio_updated_at
json.time_ago time_ago_in_words(@track.created_at).gsub('about','').strip


user = @track.user
json.user do
  json.extract! user, :id, :username, :created_at
  json.avatar user.avatar.url
  json.avatar_thumb user.avatar.url(:thumb)
  json.avatar_medium user.avatar.url(:medium)
  json.avatar_mini user.avatar.url(:mini)

  json.followers_count user.followers.length
end


json.comment_count comments.length
# if comments
  json.comments comments.each do |comment|
    json.extract! comment, :user_id, :track_id, :content, :created_at, :updated_at
    json.time_ago time_ago_in_words(comment.created_at).gsub('about','').strip
    json.user comment.user.username
    json.avatar_thumb comment.user.avatar.url(:thumb)
    json.avatar_medium comment.user.avatar.url(:medium)
    json.avatar_mini comment.user.avatar.url(:mini)
    json.avatar_small comment.user.avatar.url(:small)
  end
# end
