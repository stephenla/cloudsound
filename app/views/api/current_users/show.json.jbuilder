json.extract! @user, :id, :username, :created_at
if @user.tracks
  json.tracks @user.tracks do |track|
    json.extract! track, :id, :title, :user_id, :audio ,:audio_file_name,
    :audio_content_type,
    :audio_file_size,
    :audio_updated_at
  end
end
