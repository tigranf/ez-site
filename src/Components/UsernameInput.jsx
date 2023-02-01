import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Paper, Stack, ListItem } from "@mui/material";
import { useLocation } from "react-router-dom";

let unavailableNames = ["admin", "test", "moderator", "user", "tigran"];

const UsernameInput = ({ clearClick, handleUsername }) => {
  const [userName, setUserName] = useState("");
  const [color, setColor] = useState("secondary");

  const location = useLocation();

  useEffect(() => {
    if (
      userName.length > 0 &&
      unavailableNames.some((name) => name === userName) &&
      location.pathname !== "/login"
    ) {
      setColor("error");
    } else if (userName.length > 0) {
      setColor("secondary");
    }
  }, [location.pathname, userName]);

  useEffect(() => {
    if (clearClick) setUserName("");
  }, [clearClick]);

  const handleChange = (e) => {
    setUserName(e.target.value);
    handleUsername(e.target.value);
  };

  return (
    <>
      <TextField
        id="username-input"
        label="Username"
        color={color}
        value={userName}
        onChange={handleChange}
        type="text"
        fullWidth
        autoComplete="off"
        required={true}
      />
      {unavailableNames.some((name) => name === userName) &&
        location.pathname !== "/login" && (
          <Paper elevation={8}>
            <Stack spacing={0.5}>
              <ListItem>
                <Typography variant="caption">
                  This username is not available.
                </Typography>
              </ListItem>
            </Stack>
          </Paper>
        )}
    </>
  );
};

export default UsernameInput;
