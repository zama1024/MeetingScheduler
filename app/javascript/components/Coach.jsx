import { Button, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import React, {useEffect, useState} from "react";
import { get, post, SLOTS_URL } from "../helpers/api";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Slot } from "./Slot"
import { upcomingSlots, pastSlots } from "../helpers/utils";
import { PastSlots } from "./PastSlots";

export const Coach = ({coach, setErrors}) => {
  const [slots, setSlots] = useState([])
  const [startAt, setStartAt] = useState(dayjs())

  useEffect(() => {
    setErrors(null)
    get(SLOTS_URL, { coach_id: coach.id }, setSlots)
  }, [coach]);

  const createSlot = () => {
    setErrors(null)
    post(
      SLOTS_URL,
      { coach_id: coach.id, start_at: startAt },
      (slot => setSlots([...slots, slot])),
      setErrors,
    )
  }

  return (
    <div className="coach-section">
      <div className='coach-slot-form'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            value={startAt}
            onChange={(newValue) => setStartAt(newValue)}
            label="Start Time"/>
        </LocalizationProvider>
        <Button onClick={createSlot} size='large' variant="contained">Add 2 Hour Slot</Button>
      </div>
      <Typography variant='h3' marginY={2}>
        Upcoming Slots
      </Typography>
      <div className='slots'>
        {
          upcomingSlots(slots).map(slot => <Slot key={slot.id} slot={slot} />)
        }
      </div>
      <Typography variant='h3' marginY={2}>
        Past Slots
      </Typography>
      <PastSlots setErrors={setErrors} setSlots={setSlots} slots={slots} />
    </div>
  )
};
