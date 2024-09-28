"use client";
import { Grid, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (searchTerm: any) => any;
}

const styles = {
  container: {
    width: "100%",
    border: "2px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "0.5rem",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 8px",
    flex: "1 1 0%",
  },
  searchField: {
    width: "100%",
    "& fieldset": {
      border: "none",
    },
    "& input": { padding: "9px 12px" },
  },
  searchBtn: {
    borderRadius: "8px",
    color: "white",
  },
};

const constants = {
  searchField: "Search by Email, Protocol or Event",
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <Grid container sx={styles.container}>
      <Grid item flexGrow={1}>
        <TextField
          type="text"
          placeholder={constants.searchField}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyUp={onSearch}
          sx={styles.searchField}
        />
      </Grid>
      <Grid item>
        <IconButton aria-label="search" sx={styles.searchBtn}>
          <SearchIcon sx={{ fontSize: "1rem" }} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
