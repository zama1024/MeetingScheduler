import React, {useState} from "react";
import {pastSlots} from "../helpers/utils";
import {SlotDetail} from "./SlotDetail";
import {SlotEdit} from "./SlotEdit";

export const PastSlots = ({slots, setSlots, setErrors}) => {
  const [selectedSlot, setSelectedSlot] = useState(null)

  return (
    <div className="slots">
      {!selectedSlot &&
        pastSlots(slots).map(slot => <div onClick={() => {if(slot.booking) setSelectedSlot(slot)}} key={slot.id}>
          <SlotDetail key={slot.id} slot={slot} />
        </div>)
      }
      {
        selectedSlot && <SlotEdit setErrors={setErrors} setSlots={setSlots} slots={slots} slot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      }
    </div>
  )
};
