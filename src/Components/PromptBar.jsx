import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import Suggestions from "./Suggestions";

export default function PromptBar({ handleGen }) {
  const [prompt, setPrompt] = useState("");

  return (
    <>
      <Suggestions setPrompt={(prompt) => setPrompt(prompt)} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGen(prompt);
          setPrompt("");
        }}
      >
        <TextField
          variant="filled"
          color="info"
          fullWidth
          multiline
          size="small"
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
            startAdornment:
              prompt === "" ? (
                <InputAdornment
                  position="start"
                  sx={{ alignItems: "flex-end" }}
                >
                  <SmartToyIcon sx={{ color: "GrayText" }} />
                </InputAdornment>
              ) : (
                <InputAdornment
                  position="start"
                  sx={{ alignItems: "flex-end" }}
                >
                  <ClearIcon
                    color="disabled"
                    onClick={() => setPrompt("")}
                    sx={{ cursor: "pointer" }}
                  />
                </InputAdornment>
              ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ alignItems: "center", pb: 2 }}
              >
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
            sx: { pb: 1 },
          }}
        />
      </form>
    </>
  );
}
