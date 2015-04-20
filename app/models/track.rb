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
  default_scope { order(created_at: :desc) }
  validates :title, presence: { message: "title cant be blank"}
  validates :user_id, presence: true

  has_attached_file :audio
  validates_attachment_presence :audio, message: "select a track to upload"
  validates_attachment_content_type :audio, :content_type => [ 'application/mp3','application/x-mp3', 'audio/mpeg', 'audio/mp3', "application/octet-stream"],
  :message => 'Please select a .mp3 file'

  has_attached_file :avatar,
  :styles => { :large => "300x300>", :medium => "200x200>", :small => "120x120>", :thumb => "100x100>", :mini => "40x40>", :micro => "30x30>" },
  :default_url => "https://s3-us-west-2.amazonaws.com/cloudsound-development/assets/images/missing.png?X-Amz-Date=20150417T163927Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=7af2664671066b422f9fb78a9ca55a12603288d40206fd2b34166a54bfb7ffee&X-Amz-Credential=ASIAI55HC3XTFM4PIFYQ/20150417/us-west-2/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=AQoDYXdzEBAagAOukEk9GoF8Lu5XowPsIo72o75Io5cdFiBjj5bBili4ofdFqNihjuLDSV/ntETGRKqIi6N1gGsrQ/v90gMZ5QLp/%2BtURMBkBSCsV2eAfOV/MYHFKIwt2AK5QJJBS70KUw564cWKJ/6vq%2BnKZ8gTjRX55bbhLBMNlj94V4K2RziYFfoR8X877VXMz0MBmSP3X%2BnzC0fK3O96vFnk%2B6UdaEiVjXtSQcuzfAuNXXZ6DLkLAEnqwxjVfVdZNQWK/hs8ee5Zjnn/REiEXo8cfSP5tXJDwDeIQ2pDiYZmjAVX5TrveoIk09Hc4n6FaIxP%2BBGbRFlXcRUkSJ7/pLcjWeBHbdDB%2BOEyw81BNjETR3WecNDtL5AqHRP/pMI0eGC%2BITQ1UqPjIr8h33kyY6BhjzSA2vn%2BapiRRTWrLjb0U6w5v/zZIYsLjkbRRXzEehBJsJ%2BSMa%2BQyeluqHZJEDSOTum1Tpy%2BRIWUIxhNMrl1C0krqO0pMRFybJZcCa4E4NVER55S5DAgkdPCqQU%3D"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/


  belongs_to :user
  has_many :followers, through: :user, source: :followers
  has_many :comments, dependent: :destroy
end
