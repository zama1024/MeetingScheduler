class CreateSlots < ActiveRecord::Migration[7.0]
  def up
    create_table :slots do |t|
      t.integer :coach_id, null: false
      t.datetime :start_at, null: false
      t.datetime :end_at, null:false

      t.timestamps
    end

    add_foreign_key :slots, :users, column: :coach_id
  end

  def down
    remove_foreign_key :slots, column: :coach_id

    drop_table :users
  end
end
