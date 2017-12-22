class RemovePublicFromProjects < ActiveRecord::Migration[5.1]
  def change
    remove_column :projects, :public, :boolean
  end
end
