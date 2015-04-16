class AddTrackGradient < ActiveRecord::Migration
  def change
    add_column :tracks, :track_gradient, :string, null: false, default: "linear-gradient(#{rand(0..360)}deg, ##{"%06x" % (rand * 0xffffff)}, ##{"%06x" % (rand * 0xffffff)})"
  end
end
