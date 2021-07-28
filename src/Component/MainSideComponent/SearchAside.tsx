import React from "react";
import useStore from "../../store";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const StyledSearchDiv = styled.div`
  display: grid;
  grid-auto-rows: max-content;

  gap: 10px;
  max-width: 30vw;
  color: #2a2a2a;
`;

export default function SearchAside() {
  const setModal = useStore((state) => state.setModal);

  return (
    <StyledSearchDiv>
      <h3>Get me to somewhere ...</h3>
      <p>Search London Tube and Bus</p>

      <Button
        variant="contained"
        color="default"
        startIcon={<SearchIcon />}
        onClick={() => setModal("newSearch")}
      >
        New Journey
      </Button>
    </StyledSearchDiv>
  );
}
