"use client";
import { FormEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/features/authSlice";
import { signIn } from "next-auth/react";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useRouter } from "next/navigation";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: -60,
  },
  fieldContainer: {
    "& > :not(style)": { width: "100%" },
    "& fieldset": {
      border: "none",
    },
    "& input": { padding: "14px 12px" },
  },
  inputField: {
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "0.75em",
  },
  loginBtn: {
    boxShadow: "none",
    backgroundImage: "linear-gradient(to bottom right, #7D76C6, #ACAAE1)",
    filter: "hue-rotate(32deg)",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    fontWeight: "500",
    width: "100%",
  },
};

const constants = {
  formTitle: "Sign in",
  usernamePlaceholder: "Username",
  passwordPlaceholder: "Password",
  loginBtn: "Login",
};

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const selectedVerifiedAccount = useAppSelector(
    (state) => state.validAccountReducer.user
  );
  const {
    username: selectedUsername,
    password: selectedPassword,
    isAccount,
  } = selectedVerifiedAccount;

  useEffect(() => {
    setUsername(selectedUsername);
    setPassword(selectedPassword);
  }, [selectedVerifiedAccount]);

  useEffect(() => {
    if (error !== "") {
      setIsErrorVisible(true);
      setTimeout(() => {
        setIsErrorVisible(false);
        setError("");
      }, 2000);
    }
  }, [error]);

  const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      isAccount &&
      selectedUsername === username &&
      selectedPassword === password
    ) {
      dispatch(logIn(username));
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError(res.error);
        return;
      }
      router.replace("/users");
    } else {
      setError("Invalid Acccount");
    }
  };

  return (
    <Box sx={styles.container}>
      <Grid container spacing={0} justifyContent="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            width="28rem"
          >
            <Paper
              variant="elevation"
              elevation={2}
              sx={{
                backgroundColor: !isErrorVisible ? "primary.main" : "#3a1d1d",
                borderRadius: "1.5em",
                padding: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                transition: "all 0.3s",
              }}
            >
              <Grid item>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ fontWeight: 600 }}
                  py={1}
                  textAlign="center"
                >
                  {!isErrorVisible ? constants.formTitle : error}
                </Typography>
              </Grid>
              <Grid item>
                <Box
                  component="form"
                  sx={styles.fieldContainer}
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => handleLogIn(e)}
                >
                  <Grid container direction="column" gap={1}>
                    <Grid item>
                      <TextField
                        type="text"
                        placeholder={constants.usernamePlaceholder}
                        name="username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                        fullWidth
                        sx={styles.inputField}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder={constants.passwordPlaceholder}
                        name="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        sx={styles.inputField}
                      />
                    </Grid>

                    <Grid item pt={1}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        sx={styles.loginBtn}
                      >
                        {constants.loginBtn}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
