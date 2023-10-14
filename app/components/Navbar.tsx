import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <h1>Metasky</h1>
      <Link href="/users">Users</Link>
    </nav>
  );
}

export default Navbar;
