import React from "react";
import { Button, withStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import styled from "styled-components";
import useStore from "../store";
import useAcStore from "../acStore";

const StyledNav = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
`;

const GreenButton = withStyles(() => ({
  root: {
    color: "#2a2a2a",
    backgroundColor: "#bdece3",
    "&:hover": {
      backgroundColor: "grey",
    },
  },
}))(Button);

export default function FooterResultPage() {
  const setModal = useStore((state) => state.setModal);
  const history = useHistory();
  const loginUser = useAcStore((state) => state.loginUser);
  const searchResult = useStore((state) => state.searchResult);
  const searchValue = useStore((state) => state.searchValue);
  const updateJourney = useAcStore((state) => state.updateJourney);

  function handleOnClick() {
    if (!searchResult || !searchValue || !loginUser)
      return console.error("Error");

    let newJourney = {
      from: searchResult[0].route_parts[0].from_point_name,
      to: searchResult[0].route_parts[searchResult[0].route_parts.length - 1]
        .to_point_name,
      fromPostcode: searchValue.fromPostcode,
      toPostcode: searchValue.toPostcode,
    };

    let allJourney = [newJourney, ...loginUser["saved-journey"]];

    updateJourney(allJourney);
    setModal("success");
  }

  return (
    <StyledNav>
      <GreenButton variant="contained" onClick={() => history.push("/")}>
        <HomeIcon />
      </GreenButton>

      <GreenButton variant="contained" onClick={() => setModal("newSearch")}>
        New Search
      </GreenButton>
      <GreenButton
        variant="contained"
        disabled={loginUser ? false : true}
        onClick={() => handleOnClick()}
      >
        Save Journey
      </GreenButton>
    </StyledNav>
  );
}
