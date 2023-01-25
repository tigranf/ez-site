import { TextField, Paper, Stack, ListItem, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const ConfirmInput = ({ password, clearClick }) => {
    const [confirm, setConfirm] = useState("");
    const [match, setMatch] = useState(false);
    const [color, setColor] = useState("secondary");

    useEffect(() => {
        if (confirm.length > 0 && confirm !== password) {
            setColor("error");
        }
        else {
            setColor("secondary");
        }
    }, [confirm, password]);

    useEffect(() => {
        if (clearClick) setConfirm("");
    }, [clearClick]);

    const handleChange = (e) => {
        setConfirm(e.target.value);
        if (e.target.value === password) setMatch(true);
        else setMatch(false);
    };
    const handleCopyPaste = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <TextField
                id="confirm-input"
                label="Confirm Password"
                color={color}
                value={confirm}
                onChange={handleChange}
                onCut={handleCopyPaste}
                onCopy={handleCopyPaste}
                onPaste={handleCopyPaste}
                type="password"
                required={true}
            />
            {confirm.length > 0 && !match && (
                <Paper elevation={8}>
                    <Stack spacing={0.5}>
                        <ListItem>
                            <Typography variant="caption">Passwords must match.</Typography>
                        </ListItem>
                    </Stack>
                </Paper>
            )}
        </>
    );
};

export default ConfirmInput;
