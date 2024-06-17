import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get, USERS_URL } from "../helpers/api";
import {COACH_TYPE, STUDENT_TYPE} from "../helpers/utils";
import {ButtonGroup, Button, Typography} from "@mui/material";
import { UserGroup } from "./UserGroup";
import { Coach } from "./Coach";
import { Student } from "./Student";
import Divider from '@mui/material/Divider';

export default () => {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [errors, setErrors] = useState(null)
  let className = "home"

  useEffect(() => {
    setErrors(null)
    get(USERS_URL, {}, setUsers)
  }, []);

  if (currentUser?.user_type == COACH_TYPE) {
    className += ' coach'
  } else if (currentUser?.user_type == STUDENT_TYPE) {
    className += ' student'
  }

  return (
    <div className={className}>
      <div className="user-select">
        <div>
          <UserGroup header="Students" users={users.filter(user => user.user_type === STUDENT_TYPE)} setCurrentUser={setCurrentUser}/>
          <UserGroup color="secondary" header="Coaches" users={users.filter(user => user.user_type === COACH_TYPE)} setCurrentUser={setCurrentUser} />
        </div>
        {currentUser &&
          <div>
            <div>
              <Typography variant='h3'>
                {`${currentUser.user_type.toUpperCase()} VIEW`}
              </Typography>
            </div>
            <div>
              <Typography variant="h6">
                {`Current User: ${currentUser.first_name + " " + currentUser.last_name}`}
              </Typography>
            </div>
          </div>
        }
      </div>
      <Divider style={{borderColor: "cadetblue", marginTop: '1%'}}/>
      {errors &&
        <Typography color="red" variant="h6">
          {`Errors: ${errors.join(',')}`}
        </Typography>
      }
      {
        currentUser?.user_type === COACH_TYPE &&
        <Coach setErrors={setErrors} coach={currentUser}/>
      }
      {
        currentUser?.user_type === STUDENT_TYPE &&
        <Student setErrors={setErrors} student={currentUser}/>
      }
    </div>
  )
};