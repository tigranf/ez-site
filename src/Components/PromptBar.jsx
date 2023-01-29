import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import Suggestions from "./Suggestions";

export default function PromptBar({ handleGen }) {
  const [prompt, setPrompt] = useState("");

  return (
    <>
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
                <Tooltip title="Clear">
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
                </Tooltip>
              ),
            endAdornment: (
              <Tooltip title="Generate response">
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
              </Tooltip>
            ),
            sx: { pb: 1 },
          }}
        />
      </form>
      <Suggestions setPrompt={(prompt) => setPrompt(prompt)} />
    </>
  );
}
