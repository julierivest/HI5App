class ChangeStatusToBeStringInProjects < ActiveRecord::Migration[5.1]
  def change
    change_column :projects, :status, :string

  end
end
