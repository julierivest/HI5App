class ChangeEffortLevelToInt < ActiveRecord::Migration[5.1]
  def change
    remove_column :projects, :estimated_effort, :string
    remove_column :projects, :actual_effort, :string

    add_column :projects, :estimated_effort, :integer
    add_column :projects, :actual_effort, :integer
  end
end
