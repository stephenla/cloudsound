# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# 2.times do
#   Track.create! audio: File.new("/Users/stephen/Downloads/Hey Brother (TEEMID   Tessa Rose Jackson Cover).mp3", "r"), title: "brother", user_id: 1
#   Track.create! audio: File.new("/Users/stephen/Downloads/i carmacked bastille.mp3", "r"), title: "carmacked", user_id: 1
#   Track.create! audio: File.new("/Users/stephen/Downloads/Something About Us (Studio Version).mp3", "r"), title: "something", user_id: 1
#   Track.create! audio: File.new("/Users/stephen/Downloads/Gulch.mp3", "r"), title: "gulch", user_id: 1
# end
# 
# 10.times do |num|
#   User.create! username: "user#{num}", password: "password"
# end

100.times do |num|
  Comment.create! user_id: rand(11) + 1, track_id: rand(7) + 273, content: "comment#{num}"
end
