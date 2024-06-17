class Booking < ApplicationRecord
  belongs_to :student, -> { where(user_type: User::STUDENT) }, class_name: "User", foreign_key: "student_id"
  belongs_to :slot
end
