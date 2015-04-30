class AddIndexToLikes < ActiveRecord::Migration
  def change
    add_index :likes, [:track_id, :user_id], unique: true
  end
end
