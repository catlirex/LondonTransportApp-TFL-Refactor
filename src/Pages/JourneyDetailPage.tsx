import React from "react";
import styled from "styled-components";
import JourneyDetailMap from "../MapComponent/JourneyDetailMap";
import { useHistory, useParams } from "react-router-dom";
import useStore from "../store";
import { Button } from "@material-ui/core";
import SearchResultCard from "../Component/SearchResultCard";
import HomeIcon from "@material-ui/icons/Home";
import TravelPartCard from "../Component/TravelPartCard";

const JourneyAside = styled.aside`
  height: 75vh;

  padding: 10px;
  position: fixed;
  overflow: scroll;
  left: 20px;
  width: 35vw;
  .travel-part-list {
    display: grid;
    gap: 3px;
    padding: 10px 0;
  }

  footer {
    position: fixed;
    bottom: 3vh;
    width: 40vw;
    left: 2vw;
    background-color: white;
    height: 50px;
    padding: 5px;
  }
  .search-info {
    padding: 3px;
    margin-bottom: 5px;
    background-color: rgb(232, 232, 232);
    border-radius: 5px;
  }
`;

export default function JourneyDetailPage() {
  const { resultIndex, searchPath } =
    useParams<{ resultIndex: string; searchPath: string }>();
  const history = useHistory();
  const searchResult = useStore((state) => state.searchResult);
  const setModal = useStore((state) => state.setModal);

  return (
    <>
      <JourneyAside>
        <div>
          <p className="search-info">
            From:{" "}
            {searchResult
              ? searchResult[Number(resultIndex)].route_parts[0].from_point_name
              : null}
          </p>
          <p className="search-info">
            To:{" "}
            {searchResult
              ? searchResult[Number(resultIndex)].route_parts[
                  searchResult[Number(resultIndex)].route_parts.length - 1
                ].to_point_name
              : null}
          </p>
        </div>
        {searchResult ? (
          <SearchResultCard
            index={Number(resultIndex)}
            result={searchResult[Number(resultIndex)]}
            searchPath={searchPath}
          />
        ) : null}

        <section>
          <h3>Travel Detail:</h3>
          <ul className="travel-part-list">
            {searchResult
              ? searchResult[Number(resultIndex)].route_parts.map(
                  (part, index) => (
                    <TravelPartCard key={index + part.mode} part={part} />
                  )
                )
              : null}
          </ul>
        </section>
        <footer>
          <Button variant="contained" onClick={() => history.push("/")}>
            <HomeIcon />
          </Button>
          <Button
            variant="contained"
            onClick={() => history.push(`/search/${searchPath}`)}
          >
            Back to Result
          </Button>
          <Button variant="contained" onClick={() => setModal("newSearch")}>
            New Search
          </Button>
        </footer>
      </JourneyAside>
      <div></div>
      {searchResult ? (
        <JourneyDetailMap result={searchResult[Number(resultIndex)]} />
      ) : null}
    </>
  );
}
