import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import useAcStore from "../acStore";
import useStore from "../store";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

type Props = {
  className: string;
};

function Login({ className }: Props) {
  const classes = useStyles();
  const loginUser = useAcStore((state) => state.loginUser);
  const setLogInUser = useAcStore((state) => state.setLogInUser);
  const closeModal = useStore((store) => store.closeModal);
  const history = useHistory();

  function handleLogin(e: React.SyntheticEvent) {
    e.preventDefault();
    setLogInUser(e);
  }

  useEffect(() => {
    if (loginUser) {
      closeModal();
      history.push(`/logged-in/${loginUser.id}`);
    }
  }, [loginUser]);

  return (
    <div className={className}>
      <form className={classes.root} onSubmit={(e) => handleLogin(e)}>
        <h2>(: Welcome Back :)</h2>
        <TextField
          name="username"
          id="username"
          label="username"
          autoComplete="off"
          defaultValue=""
          variant="outlined"
          error={false}
          required
        />
        <TextField
          type="password"
          name="password"
          id="password"
          label="password"
          autoComplete="off"
          defaultValue=""
          variant="outlined"
          error={false}
          required
        />

        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default styled(Login)`
  form {
    display: grid;
    grid-gap: 10px;
    place-items: center;
  }
`;
