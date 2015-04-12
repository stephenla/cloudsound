json.extract! @track,
:id,
:title,
:user_id,
:audio,
:audio_file_name,
:audio_content_type,
:audio_file_size,
:audio_updated_at

json.user @track.user, :id, :username, :created_at

if @track.comments
  json.comments @track.comments.each do |comment|
    json.extract! comment, :user_id, :track_id, :content
    json.user comment.user.username
  end
end
