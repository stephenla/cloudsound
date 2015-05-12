# == Schema Information
#
# Table name: tracks
#
#  id                  :integer          not null, primary key
#  title               :string           not null
#  user_id             :integer          not null
#  playlist_id         :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  audio_file_name     :string
#  audio_content_type  :string
#  audio_file_size     :integer
#  audio_updated_at    :datetime
#  avatar_gradient     :string           default("linear-gradient(196deg, #80c2ff, #ae9e9b)"), not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#  track_gradient      :string           default("linear-gradient(102deg, #43b727, #f1269b)"), not null
#  description         :text
#

class Track < ActiveRecord::Base
  # default_scope { order(created_at: :desc) }
  validates :title, presence: { message: "title cant be blank"}
  validates :user_id, presence: true

  has_attached_file :audio
  validates_attachment_presence :audio, message: "select a track to upload"
  validates_attachment_content_type :audio, :content_type => [ 'application/mp3','application/x-mp3', 'audio/mpeg', 'audio/mp3', "application/octet-stream"],
  :message => 'Please select a .mp3 file'

  has_attached_file :avatar,
  :styles => { :large => "300x300>", :medium => "200x200>", :small => "120x120>", :thumb => "100x100>", :mini => "40x40>", :micro => "30x30>" },
  :default_url => "https://s3-us-west-2.amazonaws.com/cloudsound/assets/images/missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/


  belongs_to :user
  has_many :followers, through: :user, source: :followers
  has_many :comments, dependent: :destroy

  before_create :set_gradient

  private
    def set_gradient
      self.avatar_gradient = "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})"
      self.track_gradient = "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})"
    end

end
