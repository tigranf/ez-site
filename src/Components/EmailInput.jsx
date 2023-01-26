import { TextField, Paper, Stack, ListItem, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const EmailInput = ({ clearClick, handleEmail }) => {
  const [email, setEmail] = useState("");
  const [match, setMatch] = useState(false);
  const [color, setColor] = useState("secondary");

  useEffect(() => {
    if (clearClick) setEmail("");
  }, [clearClick]);

  useEffect(() => {
    if (
      email.length > 0 &&
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/.test(
        email
      )
    ) {
      setColor("error");
    } else {
      setColor("secondary");
    }
  }, [email]);

  const handleChange = (e) => {
    handleEmail(e.target.value);
    setEmail(e.target.value);
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/.test(
        e.target.value
      )
    )
      setMatch(true);
    else setMatch(false);
  };

  return (
    <>
      <TextField
        id="email-input"
        label="Email"
        color={color}
        value={email}
        onChange={handleChange}
        type="email"
        required={true}
      />
      {email.length > 0 && !match && (
        <Paper elevation={8}>
          <Stack spacing={0.5}>
            <ListItem>
              <Typography variant="caption">Email is invalid.</Typography>
            </ListItem>
          </Stack>
        </Paper>
      )}
    </>
  );
};

export default EmailInput;
