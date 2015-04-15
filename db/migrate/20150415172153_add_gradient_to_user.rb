class AddGradientToUser < ActiveRecord::Migration
  def change
    add_column :users, :avatar_gradient, :string, default: "linear-gradient(135deg, #70929c, #e6846e)"
  end
end
