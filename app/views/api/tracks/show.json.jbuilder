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

json.user do
  json.extract! @track.user, :id, :username, :created_at
  json.avatar @track.user.avatar.url
  json.avatar_thumb @track.user.avatar.url(:thumb)
  json.avatar_medium @track.user.avatar.url(:medium)
  json.avatar_mini @track.user.avatar.url(:mini)
end

if @track.comments
  json.comments @track.comments.each do |comment|
    json.extract! comment, :user_id, :track_id, :content, :created_at, :updated_at
    json.time_ago time_ago_in_words(comment.created_at).gsub('about','').strip
    json.user comment.user.username
  end
end
