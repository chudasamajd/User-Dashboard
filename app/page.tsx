import { Box, Container, Typography } from "@mui/material";
import DataTable from "./components/DataTable";

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default async function Home() {
  return (
    <Box sx={styles.container}>
      <div>
        <Container sx={styles.container}>
          <DataTable />
        </Container>
      </div>
    </Box>
  );
}
