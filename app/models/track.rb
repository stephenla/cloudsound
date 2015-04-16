class Track < ActiveRecord::Base
  default_scope { order(created_at: :desc) }
  validates :title, presence: { message: "title cant be blank"}
  validates :user_id, presence: true

  has_attached_file :audio
  validates_attachment_presence :audio, message: "select a track to upload"
  validates_attachment_content_type :audio, :content_type => [ 'application/mp3','application/x-mp3', 'audio/mpeg', 'audio/mp3', "application/octet-stream"],
  :message => 'Please select a .mp3 file'

  has_attached_file :avatar,
  :styles => { :medium => "200x200>", :small => "120x120>", :thumb => "100x100>", :mini => "40x40>" },
  :default_url => "/assets/missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/


  belongs_to :user
  has_many :comments, dependent: :destroy
end
