class Like < ActiveRecord::Base

  validates :user_id, presence: true
  validates :track_id, presence: true
  validates_uniqueness_of :user_id, scope: :track_id

  belongs_to :user
  belongs_to :track

end
