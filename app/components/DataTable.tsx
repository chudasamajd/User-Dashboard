"use client";
import { Box, Grid, Stack, Typography, styled } from "@mui/material";
import { useState } from "react";
import SearchBar from "./SearchBar";

const Item = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "0.9rem",
  lineHeight: "150%",
  color: "rgba(255, 255, 255, 0.8)",
}));

type Props = {
  data: User[];
};

const styles = {
  continer: {
    backgroundColor: "primary.main",
    borderRadius: "1.5rem",
    padding: "1rem",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    width: "1200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tableContainer: {
    fontSize: "0.9rem",
    color: "rgba(255, 255, 255, 0.36)",
    padding: "0.75rem",
  },
  tableRowMain: {
    maxHeight: "430px",
    overflow: "scroll",
  },
  tableRowContainer: {
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "0.75rem",
    backgroundColor: "secondary.main",
    padding: "0.75rem",
    alignItems: "center",
  },
  titleTypograpy: {
    fontWeight: 400,
    color: "rgba(255, 255, 255, 0.48)",
    fontSize: "0.9rem",
    lineHeight: "150%",
  },
  nameTypography: {
    fontWeight: 600,
    fontSize: "1.0125rem",
    lineHeight: "150%",
  },
};

const constants = {
  TTName: "Name",
  TTLocation: "Location",
  TTEmail: "Email",
  TTPhone: "Phone",
  TTRegistered: "Registered",
  TFYearsAgo: "years ago",
  TFNoRecord: "No record found!",
};

export default function DataTable({ data }: Props) {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(data);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(data);
    } else {
      const filteredUsers = data.filter(
        (data) =>
          data.name.first.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
          data.name.last.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredUsers(filteredUsers);
    }
  };
  return (
    <Box sx={styles.continer}>
      <SearchBar onSearch={handleSearch} />
      <Grid container sx={styles.tableContainer}>
        <Grid item xs={2}>
          {constants.TTName}
        </Grid>
        <Grid item xs={3}>
          {constants.TTLocation}
        </Grid>
        <Grid item xs={3}>
          {constants.TTEmail}
        </Grid>
        <Grid item xs={2}>
          {constants.TTPhone}
        </Grid>
        <Grid item xs={2}>
          {constants.TTRegistered}
        </Grid>
      </Grid>

      <Grid container gap={2} sx={styles.tableRowMain}>
        {filteredUsers?.length > 0 ? (
          filteredUsers?.map((user) => (
            <Grid container sx={styles.tableRowContainer} key={user?.id?.value}>
              <Grid item xs={2}>
                <Stack>
                  <Typography
                    component="h1"
                    variant="h2"
                    sx={styles.titleTypograpy}
                  >
                    {user?.name?.title}
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h2"
                    sx={styles.nameTypography}
                  >{`${user?.name?.first} ${user?.name?.last}`}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Item>
                  {user?.location?.state}, {user?.location?.country}
                </Item>
              </Grid>
              <Grid item xs={3}>
                <Item>{user?.email}</Item>
              </Grid>
              <Grid item xs={2}>
                <Item>{user?.phone}</Item>
              </Grid>
              <Grid item xs={2}>
                <Item>
                  {user?.registered?.age} {constants.TFYearsAgo}
                </Item>
              </Grid>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Item textAlign="center">{constants.TFNoRecord}</Item>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
