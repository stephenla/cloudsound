class ChangeUserIdOnTrackToInteger < ActiveRecord::Migration
  def change
    change_column :tracks, :user_id, 'integer USING CAST(user_id AS integer)'
    change_column :tracks, :playlist_id, 'integer USING CAST(playlist_id AS integer)'
  end
end
