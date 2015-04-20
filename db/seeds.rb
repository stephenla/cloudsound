# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#

## Users ##
# User.destroy_all
# Track.destroy_all
# stephen = User.create!(username: "cloudsound", password: "password",
# avatar_gradient: "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})"
# )
#
# guest = User.create!(username: "the_visitor", password: "password",
# avatar_gradient: "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})"
# )
#
# 50.times do |n|
#   user = User.create!(username: Faker::Name.name, password: "password", avatar_gradient: "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})")
#   guest.follow(user)
#   stephen.follow(user)
# end
# 50.times do |n|
#   user = User.create!(username: Faker::Name.name, password: "password", avatar_gradient: "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})")
#   user.follow(guest)
#   user.follow(stephen)
# end


## Tracks ##
1.times do
  Track.create! audio: File.new("/Users/stephen/Downloads/cloudsound/Hey Brother (TEEMID   Tessa Rose Jackson Cover).mp3", "r"),
  title: "brother",
  user_id: 1,
  avatar_gradient: "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})",
  track_gradient: "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})"
  Track.create! audio: File.new("/Users/stephen/Downloads/cloudsound/i carmacked bastille.mp3", "r"),
  title: "carmacked",
  user_id: 1,
  avatar_gradient: "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})",
  track_gradient: "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})"
  Track.create! audio: File.new("/Users/stephen/Downloads/cloudsound/Something About Us (Studio Version).mp3", "r"),
  title: "something", user_id: 1,
  avatar_gradient: "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})",
  track_gradient: "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})"
  Track.create! audio: File.new("/Users/stephen/Downloads/cloudsound/Gulch.mp3", "r"),
  title: "gulch", user_id: 1,
  avatar_gradient: "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})",
  track_gradient: "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})"
end

#
# ## Comments ##
# 150.times do |num|
#   track = Track.all.sample
#   user_id = User.all.sample.id
#   track.comments.create! user_id: user_id, content: Faker::Hacker.say_something_smart
# end
