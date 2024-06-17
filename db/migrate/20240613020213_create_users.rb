class CreateUsers < ActiveRecord::Migration[7.0]
  def up
    create_enum :user_type, ['coach', 'student']

    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.enum :user_type, enum_type: :user_type, null: false
      t.string :phone, null: false

      t.timestamps
    end
  end

  def down
    drop_table :users

    execute "DROP TYPE user_type;"
  end
end
