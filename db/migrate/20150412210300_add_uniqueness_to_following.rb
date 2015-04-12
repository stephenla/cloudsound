class AddUniquenessToFollowing < ActiveRecord::Migration
  def change
    add_index :followings, [:followed_id, :follower_id], unique: true

  end
end
