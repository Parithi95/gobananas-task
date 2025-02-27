import React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";

const SearchBar = ({ setSearchData, setPage }) => {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 300,
        my: 2,
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
        }}
        placeholder="Search By Title"
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => {
          setSearchData(e.target.value);
          setPage(0);
        }}
      />
      <IconButton
        type="button"
        sx={{
          p: "10px",
          color: "blue",
          "&:hover": { backgroundColor: "beige" },
        }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
