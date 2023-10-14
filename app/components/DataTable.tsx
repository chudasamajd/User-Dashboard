"use client";
import * as React from "react";
import Table from "@mui/joy/Table";

type Props = {
  data: User[];
};

export default function DataTable({ data }: Props) {
  return (
    <Table sx={{ "& thead th:nth-child(1)": { width: "40%" } }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Registered</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((user) => (
          <tr key={user?.id?.value}>
            <td>{Object.values(user?.name).join(" ")}</td>
            <td>
              {user?.location?.state}, {user?.location?.country}
            </td>
            <td>{user?.email}</td>
            <td>{user?.phone}</td>
            <td>{user?.registered?.age} years ago</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
