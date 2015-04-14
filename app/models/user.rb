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

  has_attached_file :avatar, :default_url => "/images/missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  def feed
    following_ids = "SELECT followed_id FROM followings WHERE  follower_id = :user_id"
    Track.where("user_id IN (#{following_ids})
                     OR user_id = :user_id", user_id: self.id)
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
