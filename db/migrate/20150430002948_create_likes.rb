class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :track_id, null: false
      t.integer :user_id, nill: false

      t.timestamps null: false
    end
  end
end
