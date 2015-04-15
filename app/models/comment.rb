class Comment < ActiveRecord::Base
  default_scope { order(created_at: :asc) }
  validates :track_id, presence: { message: "requires track_id"}
  validates :user_id, presence: { message: "requires user_id"}
  validates :content, presence: { message: "requires content"},
    length: { minimum: 2, maximum: 200 }

  belongs_to :user
  belongs_to :track

end
