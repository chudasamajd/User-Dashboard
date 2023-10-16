"use client";
import { Grid, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const styles = {
  container: {
    width: "400px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "40px",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 8px",
  },
  searchField: {
    width: "100%",
    "& fieldset": {
      border: "none",
    },
    "& input": { padding: "12px 12px" },
  },
  searchBtn: {
    color: "white",
    backgroundImage: "linear-gradient(to bottom right, #7D76C6, #ACAAE1)",
    filter: "hue-rotate(32deg)",
  },
};

const constants = {
  searchField: "Search by First or Last name",
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

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
          onKeyUp={handleSearch}
          sx={styles.searchField}
        />
      </Grid>
      <Grid item>
        <IconButton
          aria-label="search"
          sx={styles.searchBtn}
          onClick={handleSearch}
        >
          <SearchIcon sx={{ fontSize: "1rem" }} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
