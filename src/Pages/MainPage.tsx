import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useAcStore from "../acStore";
import SavedLocation from "../Component/MainSideComponent/SavedLocation";
import SearchAside from "../Component/MainSideComponent/SearchAside";
import SearchHistory from "../Component/MainSideComponent/SearchHistory";
import InitialMap from "../MapComponent/InitialMap";
import useStore from "../store";

const ActionAside = styled.aside`
  height: 80vh;
  display: grid;
  grid-template-rows: 150px auto auto 1fr;
  gap: 15px;
  padding: 0 10px;
  overflow: scroll;
`;

export default function MainPage() {
  const setModal = useStore((state) => state.setModal);
  const loginUser = useAcStore((state) => state.loginUser);
  const history = useHistory();

  useEffect(() => {
    if (loginUser) history.push(`/logged-in/${loginUser.id}`);
  });
  return (
    <>
      <ActionAside>
        <SearchAside />
        <SavedLocation />
        <SearchHistory />
      </ActionAside>
      <InitialMap />
    </>
  );
}
