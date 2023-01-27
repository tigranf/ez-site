import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export default function PromptBar({ handleGen }) {
  const [prompt, setPrompt] = useState("");

  return (
    <form onSubmit={e => {
        e.preventDefault();
        handleGen(prompt);
        setPrompt('');
    }}>
        <TextField
          variant="filled"
          fullWidth
          autoCorrect="off"
          autoComplete="off"
          autoFocus={true}
          placeholder="Describe your website..."
          value={prompt}
          onChange={(e) => {
            if (prompt.length <= 127) {
              setPrompt(e.target.value);
            } else setPrompt(prompt.slice(0, -1));
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="info"
                  size="large"
                  sx={{ borderRadius: 1 }}
                  type="submit"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <SmartToyIcon sx={{ color: "GrayText" }} />
              </InputAdornment>
            ),
          }}
        />
    </form>
  );
}
