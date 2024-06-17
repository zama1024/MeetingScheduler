import dayjs from 'dayjs';
export const STUDENT_TYPE = "student"
export const COACH_TYPE = "coach"

export const upcomingSlots = (slots) => {
  return slots.filter(slot => dayjs().isBefore(dayjs(slot.start_at)))
}

export const pastSlots = (slots) => {
  return slots.filter(slot => dayjs().isAfter(dayjs(slot.start_at)))
}

export const upcomingUnbookedSlots = (slots) => {
  return slots.filter(slot => !slot.booking && dayjs().isBefore(dayjs(slot.start_at)))
}

export const upcomingBookedSlotsForStudent = (slots, student) => {
  return slots.filter(slot => slot.booking?.student_id === student.id && dayjs().isBefore(dayjs(slot.start_at)))
}

export const pastBookedSlotsForStudent = (slots, student) => {
  return slots.filter(slot => slot.booking?.student_id === student.id && dayjs().isAfter(dayjs(slot.start_at)))
}