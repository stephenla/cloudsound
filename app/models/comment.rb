# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  track_id   :integer          not null
#  user_id    :integer          not null
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ActiveRecord::Base
  default_scope { order(created_at: :asc) }
  validates :track_id, presence: { message: "requires track_id"}
  validates :user_id, presence: { message: "requires user_id"}
  validates :content, presence: { message: "requires content"},
    length: { minimum: 2, maximum: 200 }

  belongs_to :user
  belongs_to :track

end
