"use client";
import { Box, Grid, Stack, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Image from "next/image";
import logo from "../../public/NodeOpsLogo.svg";
import { Button } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import footer from "../../public/footer.svg";
import DownloadCSVButton from "./DownloadCSVButton";

const Item = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "0.9rem",
  lineHeight: "150%",
  color: "rgba(255, 255, 255, 0.8)",
}));

const styles = {
  menuContainer: {
    width: "680px",
    backdropFilter: "blur(30px)",
    backgroundColor: "primary.main",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    position: "fixed",
    bottom: "30px",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "1rem",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    padding: "12px 12px",
  },
  fillFormBtn: {
    borderRadius: "0.5rem",
    backgroundColor: "primary.main",
    padding: "10px 12px",
    boxShadow: "none",
    "&:hover": { backgroundColor: "transparent", boxShadow: "none" },
    color: "white",
    backgroundImage: "linear-gradient(to bottom right, #7D76C6, #ACAAE1)",
    filter: "hue-rotate(32deg)",
  },
  continer: {
    backgroundColor: "primary.main",
    borderRadius: "1rem",
    padding: "1rem",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    width: "1200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
  },
  tableContainer: {
    fontSize: "0.9rem",
    color: "rgba(255, 255, 255, 0.36)",
    padding: "0.75rem",
  },
  tableRowMain: {
    maxHeight: "600px",
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
    textTransform: "capitalize",
  },
  nameTypography: {
    fontWeight: 600,
    fontSize: "1.0125rem",
    lineHeight: "150%",
  },
  divider: {
    width: "2px",
    height: "26px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  logo: {
    padding: "0 0 0 10px",
  },
};

const constants = {
  TTEmail: "Email",
  TTProtocol: "Protocol",
  TTEvent: "Event",
  TTCreatedAt: "Created At",
  TFNoRecord: "No record found!",
  fillFormBtn: "Download CSV",
};

const DownloadButton: React.FC = () => {
  const handleDownload = () => {
    fetch("/api/downloadCsv")
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "emails.csv"); // Set filename here
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch((error) => console.error("Download failed:", error));
  };

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-md"
      onClick={handleDownload}
    >
      Download CSV
    </button>
  );
};

export default function DataTable() {
  // const [filteredUsers, setFilteredUsers] = useState<User[]>(data);

  // const handleSearch = (searchTerm: string) => {
  //   if (searchTerm.trim() === "") {
  //     setFilteredUsers(data);
  //   } else {
  //     const filteredUsers = data.filter(
  //       (data) =>
  //         data.email.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
  //         data.protocol.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
  //         data.event.toLowerCase().startsWith(searchTerm.toLowerCase())
  //     );
  //     setFilteredUsers(filteredUsers);
  //   }
  // };

  const [emails, setEmails] = useState<User[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "emails"));
        const fetchedEmails: User[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as User;
          fetchedEmails.push(data);
        });
        setEmails(fetchedEmails);
        setFilteredEmails(fetchedEmails);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearch(searchQuery);
    const filtered = emails.filter(
      (email) =>
        email.email.toLowerCase().includes(searchQuery) ||
        email.protocol.toLowerCase().includes(searchQuery) ||
        email.network.toLowerCase().includes(searchQuery) ||
        email.event.toLowerCase().includes(searchQuery)
    );
    setFilteredEmails(filtered);
  };

  const formatTimestamp = (seconds: number, nanoseconds: number) => {
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    return date.toLocaleString();
  };

  return (
    <>
      <Box sx={styles.continer}>
        <Grid container sx={styles.tableContainer}>
          <Grid item xs={2}>
            {constants.TTProtocol}
          </Grid>
          <Grid item xs={4}>
            {constants.TTEmail}
          </Grid>

          <Grid item xs={2}>
            {constants.TTEvent}
          </Grid>
          <Grid item xs={3}>
            {constants.TTCreatedAt}
          </Grid>
        </Grid>

        <Grid container gap={2} sx={styles.tableRowMain}>
          {filteredEmails.length > 0 ? (
            filteredEmails.map((user, index) => (
              <Grid container sx={styles.tableRowContainer} key={user?.email}>
                <Grid item xs={2}>
                  <Stack>
                    <Typography
                      component="h1"
                      variant="h2"
                      sx={styles.titleTypograpy}
                    >
                      {user.network}
                    </Typography>
                    <Typography
                      component="h1"
                      variant="h2"
                      sx={styles.nameTypography}
                    >
                      {user.protocol}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Item>{user?.email}</Item>
                </Grid>
                <Grid item xs={2}>
                  <Item>{user.event}</Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>
                    {formatTimestamp(
                      user.createdAt.seconds,
                      user.createdAt.nanoseconds
                    )}
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
      <Box sx={styles.menuContainer}>
        <Box sx={styles.innerContainer}>
          <Box sx={styles.logo}>
            <Image src={logo} alt="Logo" width={140} />
          </Box>
          <Box sx={styles.divider}></Box>
          <SearchBar onSearch={handleSearch} />
          <DownloadCSVButton />
        </Box>
      </Box>
      <Image
        alt="Footer"
        src={footer}
        sizes="100%"
        // height={560}
        style={{ position: "fixed", bottom: "-20%", zIndex: "-1" }}
      />
    </>
  );
}
