# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  username            :string           not null
#  password_digest     :string           not null
#  session_token       :string           not null
#  counter             :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#  first_name          :string
#  last_name           :string
#  description         :text
#  avatar_gradient     :string           default("linear-gradient(135deg, #70929c, #e6846e)"), not null
#

class User < ActiveRecord::Base
  include Gravtastic
  gravtastic
  attr_reader :password
  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  before_validation :ensure_session_token
  has_many :tracks, dependent: :destroy
  has_many :comments, dependent: :destroy

  has_many :passive_relationships,
           class_name: "Following",
           foreign_key: :followed_id,
           dependent: :destroy

  has_many :active_relationships,
           class_name: "Following",
           foreign_key: :follower_id,
           dependent: :destroy

  has_many :followers, through: :passive_relationships, source: :follower
  has_many :following, through: :active_relationships, source: :followed

  has_many :sessions

  has_attached_file :avatar,
  :styles => { :medium => "200x200>", :thumb => "100x100>", :mini => "40x40>" },
  :default_url => "https://s3-us-west-2.amazonaws.com/cloudsound-development/assets/images/missing.png?X-Amz-Date=20150417T163927Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=7af2664671066b422f9fb78a9ca55a12603288d40206fd2b34166a54bfb7ffee&X-Amz-Credential=ASIAI55HC3XTFM4PIFYQ/20150417/us-west-2/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=AQoDYXdzEBAagAOukEk9GoF8Lu5XowPsIo72o75Io5cdFiBjj5bBili4ofdFqNihjuLDSV/ntETGRKqIi6N1gGsrQ/v90gMZ5QLp/%2BtURMBkBSCsV2eAfOV/MYHFKIwt2AK5QJJBS70KUw564cWKJ/6vq%2BnKZ8gTjRX55bbhLBMNlj94V4K2RziYFfoR8X877VXMz0MBmSP3X%2BnzC0fK3O96vFnk%2B6UdaEiVjXtSQcuzfAuNXXZ6DLkLAEnqwxjVfVdZNQWK/hs8ee5Zjnn/REiEXo8cfSP5tXJDwDeIQ2pDiYZmjAVX5TrveoIk09Hc4n6FaIxP%2BBGbRFlXcRUkSJ7/pLcjWeBHbdDB%2BOEyw81BNjETR3WecNDtL5AqHRP/pMI0eGC%2BITQ1UqPjIr8h33kyY6BhjzSA2vn%2BapiRRTWrLjb0U6w5v/zZIYsLjkbRRXzEehBJsJ%2BSMa%2BQyeluqHZJEDSOTum1Tpy%2BRIWUIxhNMrl1C0krqO0pMRFybJZcCa4E4NVER55S5DAgkdPCqQU%3D"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  def feed
    following_ids = "SELECT followed_id FROM followings WHERE  follower_id = :user_id"
    Track.where("user_id IN (#{following_ids})
                     OR user_id = :user_id", user_id: self.id)
                     .includes(:user).includes(:followers)
  end

  # Follows a user.
  def follow(other_user)
    active_relationships.create(followed_id: other_user.id)
  end

  # Unfollows a user.
  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  # Returns true if the current user is following the other user.
  def following?(other_user)
    following.include?(other_user)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    if user.is_password?(password)
      return user
    end
    nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(@password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
  end

  def is_password?(maybe_password)
    BCrypt::Password.new(self.password_digest).is_password?(maybe_password)
  end
end
