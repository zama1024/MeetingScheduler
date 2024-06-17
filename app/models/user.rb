class User < ApplicationRecord
  USER_TYPES = [
    COACH = 'coach'.freeze,
    STUDENT = 'student'.freeze,
  ]

  validates :first_name, :last_name, :phone, presence: true
  validates :user_type, presence: true, inclusion: { in: USER_TYPES }

  has_many :slots, foreign_key: "coach_id"
end
