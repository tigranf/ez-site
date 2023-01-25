import { TextField, Paper, Stack, ListItem, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const PasswordInput = ({ handlePassword, clearClick }) => {
    const [password, setPassword] = useState("");
    const [color, setColor] = useState("secondary");
    let conditions = [];

    useEffect(() => {
        if (clearClick) setPassword("");
    }, [clearClick]);


    useEffect(() => {
        if (
            password.length > 0 &&
            (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password))
        ) {
            setColor("error");
        }
        else {
            setColor("secondary");
        }
    }, [password]);

    const handleChange = (e) => {
        let newPassword = e.target.value;
        handlePassword(newPassword);
        setPassword(newPassword);
    };
    const handleCopyPaste = (e) => {
        e.preventDefault();
    };

    const lengthCondition = (
        <ListItem key={1}>
            <Typography variant="caption">
                Password must be at least 8 characters long.
            </Typography>
        </ListItem>
    );
    const numCondition = (
        <ListItem key={2}>
            <Typography variant="caption">Password must contain a number.</Typography>
        </ListItem>
    );
    const caseCondition = (
        <ListItem key={3}>
            <Typography variant="caption">
                Password must contain an uppercase letter
            </Typography>
        </ListItem>
    );
    if (password.length < 8) {
        conditions = [...conditions, lengthCondition];
    }
    if (!/\d/.test(password)) {
        conditions = [...conditions, numCondition];
    }
    if (!/[A-Z]/.test(password)) {
        conditions = [...conditions, caseCondition];
    }

    return (
        <>
            <TextField
                id="password-input"
                label="Password"
                color={color}
                value={password}
                onChange={handleChange}
                onCut={handleCopyPaste}
                onCopy={handleCopyPaste}
                onPaste={handleCopyPaste}
                type="password"
                required={true}
            />
            {password.length > 0 &&
                <Paper elevation={8}>
                    <Stack spacing={0.5}>
                        {conditions}
                    </Stack>
                </Paper>
            }
        </>
    );
};

export default PasswordInput;
