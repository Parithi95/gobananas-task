import React from "react";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Error = ({ error }) => {
  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">{error}</Alert>
      </Stack>
    </Container>
  );
};

export default Error;
