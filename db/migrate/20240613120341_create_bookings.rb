class CreateBookings < ActiveRecord::Migration[7.0]
  def up
    create_table :bookings do |t|
      t.integer :slot_id
      t.integer :student_id
      t.integer :rating
      t.text :note

      t.timestamps
    end

    add_foreign_key :bookings, :slots
    add_foreign_key :bookings, :users, column: :student_id
  end

  def down
    remove_foreign_key :bookings, column: :student_id
    remove_foreign_key :bookings, :slots

    drop_table :bookings
  end
end
