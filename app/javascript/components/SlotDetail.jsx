import { Typography } from "@mui/material";
import dayjs from 'dayjs';
import React from "react";

export const SlotDetail = ({slot}) => {
  let start_time = dayjs(slot.start_at).format('LL LT')
  let end_time = dayjs(slot.end_at).format('LL LT')
  let booking = slot.booking

  return (
    <div className="slot slot-detail">
      <Typography variant='h6'>
        {`${start_time} - ${end_time}`}
      </Typography>

      {
        booking ?
        <>
          <Typography variant='h6'>
            { `Booked by: ${booking.student ? booking.student.first_name + " " + booking.student.last_name : "N/A" }`}
          </Typography>
          <Typography variant='h6'>
            { `Student Phone: ${booking.student.phone}`}
          </Typography>
          <Typography variant='h6'>
            { `Rating: ${booking.rating || '-'}`}
          </Typography>
          <Typography variant='h6'>
            { `Note: ${booking.note || '-'}`}
          </Typography>
          <Typography color="white" variant='h6'>
            Click to edit
          </Typography>
        </> :
        <>
          <Typography variant='h6'>
            Not Booked
          </Typography>
        </>
      }
    </div>
  )
};
