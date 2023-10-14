import { Metadata } from "next";
import useFetch, { FetchResponse } from "../data/useFetch";
import DataTable from "../components/DataTable";
import { Container } from "@mui/material";
import footer from "../../public/footer.svg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  //   const usersData: Promise<User[]> = getUsers();
  //   const users = await usersData;
  //   const content = (
  //     <section>
  //       <h2>Users</h2>
  //       {users.map((user) => (
  //         <>
  //           <p key={user?.id?.value}>{user?.name?.first}</p>
  //         </>
  //       ))}
  //     </section>
  //   );

  const response: Promise<FetchResponse> = useFetch(
    "https://randomuser.me/api/?seed=test&results=5"
  );
  const data = await response;
  const users: User[] = data?.data;

  const content = users ? (
    <Container maxWidth="xl">
      <h2>Users</h2>
      <DataTable data={users} />

      <Image alt="Footer" src={footer} sizes="100vw" height={450} />
    </Container>
  ) : (
    <p>{data?.error}</p>
  );

  return content;
}
