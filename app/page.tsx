import LogIn from "./components/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Box, Typography } from "@mui/material";

const styles = {
  container: {
    backgroundImage: "url('form.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontWeight: 700,
    fontSize: "16rem",
    opacity: 0.08,
    position: "relative",
    bottom: -80,
    zIndex: -1,
    letterSpacing: "0px",
  },
};

const constants = {
  title: "Metasky",
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/users");
  return (
    <Box sx={styles.container}>
      <div>
        <Typography component="h1" variant="h2" sx={styles.title}>
          {constants.title}
        </Typography>
        <LogIn />
      </div>
    </Box>
  );
}
