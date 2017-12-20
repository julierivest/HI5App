class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.text :description
      t.boolean :public
      t.integer :estimated_effort
      t.integer :actual_effort
      t.integer :status
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
