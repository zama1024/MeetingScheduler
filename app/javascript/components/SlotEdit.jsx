import {Button, Typography} from "@mui/material";
import dayjs from 'dayjs';
import React, {useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { put, BOOKINGS_URL } from "../helpers/api";

export const SlotEdit = ({slot, slots, setSlots, setSelectedSlot, setErrors}) => {
  let start_time = dayjs(slot.start_at).format('LL LT')
  let end_time = dayjs(slot.end_at).format('LL LT')
  let booking = slot.booking
  const [newRating, setNewRating] = useState(booking.rating || 1)
  const [newNote, setNewNote] = useState(booking.note)
  const updateBooking = () => {
    setErrors(null)
    const updateSlots = (booking) => {
      let updatedSlots = slots.map(slot => {
        if(slot.id === booking.slot_id) {
          return {...slot, booking}
        } else {
          return slot
        }
      })

      setSlots(updatedSlots)
      setSelectedSlot(null)
    }

    put(`${BOOKINGS_URL}/${booking.id}`, { note: newNote, rating: newRating }, updateSlots)
  }

  return (
    <div className="slot slot-edit">
      <Typography  onClick={() => setSelectedSlot(null)} variant='overline' sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
        Go Back
      </Typography>
      <Typography variant='h6' marginBottom={2}>
        {`${start_time} - ${end_time}`}
      </Typography>
      <Typography variant='h6'>
        { `Booked by: ${booking.student ? booking.student.first_name + " " + booking.student.last_name : "N/A" }`}
      </Typography>

      {
        booking ?
          <>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rating</InputLabel>
              <Select
                value={newRating}
                label="Rating"
                onChange={(e) => {setNewRating(e.target.value)}}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            <TextField multiline fullWidth margin="normal" label="Note" variant="outlined" defaultValue={newNote} onChange={(e) => setNewNote(e.target.value)}/>
          </> :
          <>
            <Typography variant='h6'>
              Not Booked
            </Typography>
          </>
      }
      <Button fullWidth onClick={updateBooking} size='large' variant="contained">Update</Button>
    </div>
  )
};
