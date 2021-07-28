import React from "react";

import styled from "styled-components";
import useAcStore from "../acStore";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Button } from "@material-ui/core";
import useStore from "../store";
import { useHistory } from "react-router-dom";

const AccountActionBar = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 10px;
  .auto-col {
    align-self: center;
    color: gray;
    font-size: 0.8rem;
  }
`;
export default function HeaderAccountBar() {
  const loginUser = useAcStore((state) => state.loginUser);
  const logoutUser = useAcStore((state) => state.logoutUser);
  const setModal = useStore((state) => state.setModal);
  const history = useHistory();

  function handleLogOut() {
    logoutUser();
    history.push("/");
  }
  return (
    <>
      {loginUser ? (
        <AccountActionBar>
          <div className="auto-col">
            <AccountCircleIcon />
            <h2>{loginUser.name}</h2>
          </div>

          <Button
            variant="contained"
            color="default"
            startIcon={<LockOpenIcon />}
            onClick={() => handleLogOut()}
          >
            Logout
          </Button>
        </AccountActionBar>
      ) : (
        <AccountActionBar>
          <Button
            variant="contained"
            color="default"
            startIcon={<AccountCircleIcon />}
            onClick={() => setModal("login")}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="default"
            startIcon={<PersonAddIcon />}
            onClick={() => setModal("newUser")}
          >
            NewUser
          </Button>
        </AccountActionBar>
      )}
    </>
  );
}
