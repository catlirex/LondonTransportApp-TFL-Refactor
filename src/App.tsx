import "./styles.css";
import React from "react";
import Header from "./Component/Header";
import { Route, Redirect, Switch } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import SearchResultPage from "./Pages/SearchResultPage";
import JourneyDetailPage from "./Pages/JourneyDetailPage";
import ModalContainer from "./modals/ModalContainer";
import { StyledWrapper } from "./Component/StyledWrapper";

export default function App() {
  return (
    <>
      <Header />
      <StyledWrapper>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>

          <Route path="/search/:searchPath/:resultIndex">
            <JourneyDetailPage />
          </Route>

          <Route path="/search/:searchPath">
            <SearchResultPage />
          </Route>

          <Route path="/search/">
            <Redirect to="/" />
          </Route>

          <Route path="/logged-in/:username" exact>
            <MainPage />
          </Route>

          <Route>
            <h3>Error 404</h3>{" "}
          </Route>
        </Switch>
      </StyledWrapper>
      <ModalContainer />
    </>
  );
}
