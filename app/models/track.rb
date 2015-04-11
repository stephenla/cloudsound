class Track < ActiveRecord::Base
  validates :title, presence: { message: "title cant be blank"}
  validates :user_id, presence: true

  has_attached_file :audio
  validates_attachment_presence :audio, message: "select a track to upload"
  validates_attachment_content_type :audio, :content_type => [ 'application/mp3','application/x-mp3', 'audio/mpeg', 'audio/mp3', "application/octet-stream"],
  :message => 'Please select a .mp3 file'
  belongs_to :user
end
