class AddAvatarTotrack < ActiveRecord::Migration
  def self.up
    add_attachment :tracks, :avatar
  end

  def self.down
    remove_attachment :tracks, :avatar
  end
end
