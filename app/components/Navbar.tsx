"use client";
import { logOut } from "../redux/features/authSlice";
import {
  setLoginAccount,
  removeLoginAccount,
} from "../redux/features/validAccountSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { signOut } from "next-auth/react";
import Box from "@mui/material/Box";
import Image from "next/image";
import logo from "../../public/metaskylogo.svg";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useLoginAccounts from "../data/useLoginAccounts";
import { useState } from "react";

const styles = {
  container: {
    width: "400px",
    backdropFilter: "blur(30px)",
    backgroundColor: "secondary.main",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    position: "fixed",
    bottom: "60px",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "0.75em",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
  },
  fillFormBtn: {
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "0.5rem",
    backgroundColor: "secondary.main",
    boxShadow: "none",
    "&:hover": { backgroundColor: "transparent", boxShadow: "none" },
  },
  accountListContainer: {
    display: "flex",
    flexWrap: "wrap",
    position: "absolute",
    backgroundColor: "secondary.main",
    borderRadius: "0.75em",
    width: "100%",
    bottom: "6px",
    backdropFilter: "blur(30px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    padding: "10px 12px",
    gap: 1,
  },
  accountBtn: {
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "0.5rem",
    backgroundColor: "secondary.main",
    boxShadow: "none",
    "&:hover": { backgroundColor: "transparent", boxShadow: "none" },
    color: "rgba(255, 255, 255, 0.36)",
  },
};

const constants = {
  fillFormBtn: "Valid Account",
  logoutBtn: "Logout",
};

function Navbar() {
  const [showAccounts, setShowAccounts] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSession();
  const isAuth = status === "authenticated";

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(removeLoginAccount());
    signOut();
  };

  const setAccount = (account: User) => {
    dispatch(
      setLoginAccount({
        username: account?.login?.username,
        password: account?.login?.password,
        isAccount: true,
      })
    );
  };

  const {
    data: loginAccounts,
    error,
    loading,
  } = useLoginAccounts(process.env.NEXT_PUBLIC_LOGIN_ACCOUNT_DATA_URL || "");

  return (
    <Box sx={styles.container}>
      {!loading && showAccounts && (
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Box sx={styles.accountListContainer}>
            {loginAccounts?.map((acc: User) => (
              <Button
                variant="contained"
                key={acc?.id?.value}
                sx={styles.accountBtn}
                onClick={() => {
                  setAccount(acc);
                  setShowAccounts(false);
                }}
              >
                {acc?.name?.first}
              </Button>
            ))}
          </Box>
        </Box>
      )}

      <Box sx={styles.innerContainer}>
        <Image src={logo} alt="Logo" width={120} />
        {isAuth ? (
          <Button
            variant="contained"
            endIcon={<ExitToAppIcon />}
            sx={styles.fillFormBtn}
            onClick={handleLogOut}
          >
            {data?.user?.name}
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<CasinoIcon />}
            sx={styles.fillFormBtn}
            onClick={() => {
              setShowAccounts(!showAccounts);
            }}
          >
            {constants.fillFormBtn}
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
