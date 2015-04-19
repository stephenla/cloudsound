# == Schema Information
#
# Table name: followings
#
#  id          :integer          not null, primary key
#  follower_id :integer          not null
#  followed_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Following < ActiveRecord::Base

  validates :followed_id, :follower_id, presence: true

  belongs_to :followed, class_name: "User"
  belongs_to :follower, class_name: "User"

end
