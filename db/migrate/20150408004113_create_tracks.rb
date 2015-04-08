class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.string :user_id, null: false, index: true
      t.string :playlist_id, index: true

      t.timestamps null: false
    end
  end
end
