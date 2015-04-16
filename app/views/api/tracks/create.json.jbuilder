
json.files do

  json.array! do
    json.name @track.audio_file_name
    json.size @track.audio_file_size
    json.url @track.audio.url
    json.thumbnailUrl @track.avatar.url(:small)
    json.deleteUrl   "/api/tracks"
    json.deleteType "DELETE"
  end

end
