import {Button, ButtonGroup, Typography} from "@mui/material";
import React from "react";

export const UserGroup = ({header, users, setCurrentUser, color = "primary"}) => {
  return (
    <div className="users">
      <Typography marginRight={2} variant='h6'>
        {header}
      </Typography>
      <ButtonGroup color={color} size="large" aria-label="Large button group">
        {
          users.map(user =>
            <Button
              key={user.id}
              onClick={() => setCurrentUser(user)}>
                { user.first_name + " " + user.last_name }
            </Button>
          )
        }
      </ButtonGroup>
    </div>
  )
};
