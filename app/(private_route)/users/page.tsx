import { Metadata } from "next";
import useFetch, { FetchResponse } from "../../data/useFetch";
import DataTable from "../../components/DataTable";
import { Box, Container } from "@mui/material";
import footer from "../../../public/footer.svg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Users",
};

const styles = {
  container: { p: "80px 0px" },
  errBox: { p: 4, backgroundColor: "#3a1d1d" },
};

export default async function UsersPage() {
  const response: Promise<FetchResponse> = useFetch(
    process?.env?.NEXT_PUBLIC_USER_DATA_URL || ""
  );
  const data = await response;
  const users: User[] = data?.data;

  const content = users ? (
    <>
      <Container sx={styles.container}>
        <DataTable data={users} />
      </Container>
      <Image
        alt="Footer"
        src={footer}
        sizes="100vw"
        height={460}
        style={{ position: "fixed", bottom: "-20%", zIndex: "-1" }}
      />
    </>
  ) : (
    <Box sx={styles.errBox}>{data?.error}</Box>
  );

  return content;
}
