import { Paper, Typography } from "@mui/material";
import React from "react";

const Generation = ({ selectedGen, generations }) => {
  let data = generations.find((gen) => gen.id === selectedGen);

  return (
    <Paper>
      <Typography variant="h4" gutterBottom>{data.title}</Typography>
      <Typography paragraph>{JSON.stringify(data.genObject)}</Typography>
    </Paper>
  );
};

export default Generation;
