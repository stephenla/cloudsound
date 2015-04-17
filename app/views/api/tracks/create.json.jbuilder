
json.files do
  json.array! [@track] do
      json.id @track.id
      json.name @track.audio_file_name
      json.size @track.audio_file_size
      json.url @track.audio.url
      json.thumbnailUrl @track.avatar.url(:small)
      json.deleteUrl   "/api/tracks"
      json.deleteType "DELETE"
  end

  json.array! [@track] do
      json.name @track.avatar_file_name
      json.size @track.avatar_file_size
      json.url @track.avatar.url
      json.thumbnailUrl @track.avatar.url(:small)
      json.deleteUrl   "/api/tracks"
      json.deleteType "DELETE"
  end
end
