import { Button, Typography } from "@mui/material";
import dayjs from 'dayjs';
import React from "react";
import {post, BOOKINGS_URL, get, SLOTS_URL} from "../helpers/api";

export const StudentSlot = ({slot, bookable, student, availableSlots, setAvailableSlots, upcomingBookedSlots, setUpcomingBookedSlots}) => {
  let start_time = dayjs(slot.start_at).format('LL LT')
  let end_time = dayjs(slot.end_at).format('LL LT')

  const onBookingSuccess = (booking) => {
    let bookingSlot = availableSlots.find(slot => slot.id === booking.slot_id)

    setAvailableSlots(availableSlots.filter(slot => slot.id !== bookingSlot.id))
    setUpcomingBookedSlots(upcomingBookedSlots.concat([bookingSlot]))
  }

  const createBooking = () => {
    post(BOOKINGS_URL, { slot_id: slot.id, student_id: student.id }, onBookingSuccess, () => {})
  }

  return (
    <div className="slot">
      <Typography variant='h6'>
        {`${start_time} - ${end_time}`}
      </Typography>
      <Typography variant='h6'>
        {`Coach: ${slot.coach.first_name} ${slot.coach.last_name}`}
      </Typography>
      <Typography variant='h6'>
        { `Coach Phone: ${slot.coach.phone}`}
      </Typography>
      {
        bookable && <Button onClick={createBooking} variant="contained">Book</Button>
      }
    </div>
  )
};
