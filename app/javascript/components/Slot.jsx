import { Typography } from "@mui/material";
import dayjs from 'dayjs';
import React from "react";

export const Slot = ({slot}) => {
  let start_time = dayjs(slot.start_at).format('LL LT')
  let end_time = dayjs(slot.end_at).format('LL LT')
  let booking = slot.booking

  return (
      <div className="slot">
        <Typography variant='h6'>
          {`${start_time} - ${end_time}`}
        </Typography>
        {
          booking ?
            <>
              <Typography variant='h6'>
                { `Booked by: ${booking.student.first_name + " " + booking.student.last_name}`}
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
            </> :
            <>
              <Typography variant='h6'>
                { `Booked by: Unbooked`}
              </Typography>
            </>
        }
      </div>
  )
};
