class ChangeEffortToString < ActiveRecord::Migration[5.1]
  def change
    change_column :projects, :estimated_effort, :string
    change_column :projects, :actual_effort, :string
  end
end
