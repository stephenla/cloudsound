class EditUserGradient < ActiveRecord::Migration
  def change
    change_column :users, :avatar_gradient, :string, default: "linear-gradient(135deg, #70929c, #e6846e)"
  end
end
