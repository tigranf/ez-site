import { Box, Paper, Skeleton } from "@mui/material";
import React from "react";

const GenSkeleton = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        py: 4,
        px: 3,
      }}
    >
      <Skeleton variant="text" width="35%" height={80} />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
        }}
      >
        <Skeleton variant="text" width="25%" height={40} />
        <Skeleton variant="text" width="25%" height={40} />
        <Skeleton variant="text" width="25%" height={40} />
      </Box>
      <Skeleton variant="text" width="39%" height={80} />
      <Skeleton variant="text" width="65%" height={40} sx={{ mb: 4 }} />
      <Skeleton variant="text" width="35%" height={80} />
      <Skeleton variant="text" width="55%" height={40} sx={{ mb: 4 }} />
      <Skeleton variant="text" width="25%" height={80} />
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Skeleton variant="text" width="45%" height={40} />
        <Skeleton variant="text" width="25%" height={40} />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
        }}
      >
        <Skeleton variant="text" width="40%" height={40} />
        <Skeleton variant="text" width="28%" height={40} />
      </Box>
      <Skeleton variant="text" width="29%" height={80} />
      <Skeleton variant="text" width="98%" height={40} />
      <Skeleton variant="text" width="92%" height={40} />
      <Skeleton variant="text" width="35%" height={80} />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
        }}
      >
        <Skeleton variant="text" width="25%" height={40} />
        <Skeleton variant="text" width="25%" height={40} />
        <Skeleton variant="text" width="25%" height={40} />
      </Box>
      <Skeleton variant="text" width="39%" height={80} />
      <Skeleton variant="text" width="65%" height={40} sx={{ mb: 4 }} />
      <Skeleton variant="text" width="35%" height={80} />
      <Skeleton variant="text" width="55%" height={40} sx={{ mb: 4 }} />
      <Skeleton variant="text" width="25%" height={80} />
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Skeleton variant="text" width="45%" height={40} />
        <Skeleton variant="text" width="25%" height={40} />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
        }}
      >
        <Skeleton variant="text" width="40%" height={40} />
        <Skeleton variant="text" width="28%" height={40} />
      </Box>
      <Skeleton variant="text" width="29%" height={80} />
      <Skeleton variant="text" width="98%" height={40} />
      <Skeleton variant="text" width="92%" height={40} />
    </Paper>
  );
};

export default GenSkeleton;
