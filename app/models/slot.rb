class Slot < ApplicationRecord
  validate :slot_times_must_be_valid
  validate :must_be_coach

  belongs_to :coach, -> { where(user_type: User::COACH) }, class_name: "User", foreign_key: "coach_id"
  has_one :booking

  private

  def slot_times_must_be_valid
    if self.start_at < Time.now
      errors.add(:start_at, 'must be in the future')
    end

    if self.end_at < self.start_at
      errors.add(:end_at, 'must be after the start time')
    end

    if self.coach.slots.any? { |slot| slot.start_at.between?(self.start_at, self.end_at) || slot.end_at.between?(self.start_at, self.end_at)}
      errors.add(:start_at, 'overlaps with another slot')
    end
  end

  def must_be_coach
    if self.coach.blank?
      errors.add(:coach_id, 'must be an existing coach')
    end
  end
end
