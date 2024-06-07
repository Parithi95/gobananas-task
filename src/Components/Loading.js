import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({ StyledTableCell, StyledTableRow }) => {
  return (
    <StyledTableRow>
      <StyledTableCell align="center" colSpan={3}>
        <CircularProgress />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default Loading;
