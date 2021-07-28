import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useAcStore from "../../acStore";
import useStore from "../../store";
import { SearchHistory } from "../../store";

type StyledProps = {
  onClick: any;
  colorPointer: number;
  loggedIn: boolean;
};

const HistoryCard = styled.li<StyledProps>`
  background-color: ${(props) => (props.colorPointer ? "#95e1d3" : "#bdece3")};

  list-style: none;
  max-width: 30vw;
  width: 100%;
  padding 10px;
  border-radius:5px;
  box-shadow: 0px 1px 5px 1px lightgray;
  position: relative;


  h3{
      font-weight:400;
      font-size:1rem
  }
   .toward-box {
    width: 3px;
    height: 20px;
    border-radius: 2px;
    background-color: rgb(72, 72, 72);
    margin: 3px 3px;
  }

  

  .del-card {
    
    position: absolute;

    top: -5px;
    right: -5px;

    justify-self: end;
    border-radius: 50%;
    
    background-color: lightgray;

    width: 20px;
    height: 20px;

    font-size: 1rem;
    color: gray;

    display: grid;
    place-content: center;
    visibility:hidden;
    opacity:0;
    transition: 0.5s cubic-bezier(.8,-0.29,.96,.56);
  }

  &:hover .del-card{
    visibility:  ${(props) => (props.loggedIn ? "visible" : "hidden")};
    opacity: ${(props) => (props.loggedIn ? "1" : "0")};
  }
`;

type Props = {
  record: SearchHistory;
  index: number;
  renderFrom: string;
};

export default function SearchHistoryCard({
  record,
  index,
  renderFrom,
}: Props) {
  const getSearchResult = useStore((state) => state.getSearchResult);
  const clearSearchResult = useStore((state) => state.clearSearchResult);
  const updateSearchValue = useStore((state) => state.updateSearchValue);
  const setViewHistory = useStore((state) => state.setViewHistory);
  const loginUser = useAcStore((state) => state.loginUser);
  const updateJourney = useAcStore((state) => state.updateJourney);
  const updateHistory = useAcStore((state) => state.updateHistory);

  const history = useHistory();
  let colorPointer = index % 2;
  let loggedIn = false;
  if (loginUser) loggedIn = true;

  function handleOnClick() {
    setViewHistory(true);
    clearSearchResult();
    updateSearchValue(record.fromPostcode, record.toPostcode);
    getSearchResult(record.fromPostcode, record.toPostcode);
    history.push(`/search/from-${record.fromPostcode}-to-${record.toPostcode}`);
  }

  function deleteCard(e: React.SyntheticEvent) {
    e.stopPropagation();
    if (!loginUser) return console.error("No User Found");

    if (renderFrom === "journey") {
      let newArray = [...loginUser["saved-journey"]].filter((place) => {
        if (
          place.fromPostcode === record.fromPostcode &&
          place.toPostcode === record.toPostcode
        )
          return null;
        return place;
      });
      updateJourney(newArray);
    }
    if (renderFrom === "history") {
      let newArray = [...loginUser["history"]].filter((place) => {
        if (
          place.fromPostcode === record.fromPostcode &&
          place.toPostcode === record.toPostcode
        )
          return null;
        return place;
      });
      updateHistory(newArray);
    }
  }

  return (
    <>
      <HistoryCard
        loggedIn={loggedIn}
        colorPointer={colorPointer}
        onClick={() => handleOnClick()}
      >
        <button className="del-card" onClick={(e) => deleteCard(e)}>
          &times;
        </button>
        <h3>
          {record.from} ({record.fromPostcode})
        </h3>
        <div className="toward-box"></div>
        <h3>
          {record.to} ({record.toPostcode})
        </h3>
      </HistoryCard>
    </>
  );
}
