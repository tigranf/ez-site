import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Paper, Stack, ListItem } from "@mui/material";

let unavailableNames = ["admin", "test", "moderator", "user", "tigran"];

const UsernameInput = ({ clearClick, handleUsername, handleInvalid }) => {
    const [userName, setUserName] = useState("");
    const [color, setColor] = useState("secondary");

    useEffect(() => {
        if (unavailableNames.some((name) => name === userName)) {
            setColor("error");
            handleInvalid(true);
        }
        else {
            setColor("secondary");
            handleInvalid(false);
        }
    }, [handleInvalid, userName]);

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
            {unavailableNames.some((name) => name === userName) && (
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
