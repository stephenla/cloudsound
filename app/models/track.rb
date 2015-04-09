class Track < ActiveRecord::Base
  validates :title, :user_id, presence: true
  attr_accessor :audio
  has_attached_file :audio
end
