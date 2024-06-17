import { Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import { get, SLOTS_URL } from "../helpers/api";
import { upcomingUnbookedSlots, upcomingBookedSlotsForStudent, pastBookedSlotsForStudent } from "../helpers/utils";
import { StudentSlot } from "./StudentSlot";

export const Student = ({student, setErrors}) => {
  const [availableSlots, setAvailableSlots] = useState([])
  const [upcomingBookedSlots, setUpcomingBookedSlots] = useState([])
  const [pastBookedSlots, setPastBookedSlots] = useState([])

  const setSlots = (allSlots) => {
    setAvailableSlots(upcomingUnbookedSlots(allSlots))
    setUpcomingBookedSlots(upcomingBookedSlotsForStudent(allSlots, student))
    setPastBookedSlots(pastBookedSlotsForStudent(allSlots, student))
  }

  useEffect(() => {
    setErrors(null)
    get(SLOTS_URL, {}, setSlots)
  }, [student]);


  return (
    <div className="student-section">
      <Typography variant='h3' marginY={2}>
        Available Slots
      </Typography>
      <div className='slots'>
        {
          availableSlots.map(slot =>
            <StudentSlot key={slot.id}
                         student={student}
                         slot={slot}
                         bookable={true}
                         availableSlots={availableSlots}
                         setAvailableSlots={setAvailableSlots}
                         upcomingBookedSlots={upcomingBookedSlots}
                         setUpcomingBookedSlots={setUpcomingBookedSlots}
            />)
        }
      </div>
      <Typography variant='h3' marginY={2}>
        Upcoming Booked Slots
      </Typography>
      <div className='slots'>
        {
          upcomingBookedSlots.map(slot => <StudentSlot key={slot.id} slot={slot} />)
        }
      </div>
      <Typography variant='h3' marginY={2}>
        Past Booked Slots
      </Typography>
      <div className='slots'>
        {
          pastBookedSlots.map(slot => <StudentSlot key={slot.id} slot={slot} />)
        }
      </div>
    </div>
  )
};
