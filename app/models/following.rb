class Following < ActiveRecord::Base

  validates :followed_id, :follower_id, presence: true

  belongs_to :followed, class_name: "User"
  belongs_to :follower, class_name: "User"

end
