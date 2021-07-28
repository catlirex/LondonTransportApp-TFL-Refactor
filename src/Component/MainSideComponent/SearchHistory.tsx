import React from "react";
import useAcStore from "../../acStore";
import useStore from "../../store";
import SearchHistoryCard from "./SearchHistoryCard";
import styled from "styled-components";

const SearchHistoryList = styled.ul`
  display: grid;
  gap: 10px;
  padding: 10px 0;
`;

export default function SearchHistory() {
  const loginUser = useAcStore((state) => state.loginUser);
  const noLoginSearchHistory = useStore((state) => state.noLoginSearchHistory);

  return (
    <div>
      <h3>Searched History</h3>
      <SearchHistoryList>
        {loginUser ? (
          loginUser.history.length === 0 ? (
            <em>No history, search one</em>
          ) : (
            loginUser.history.map((record, index) => (
              <SearchHistoryCard
                record={record}
                key={index}
                index={index}
                renderFrom={"history"}
              />
            ))
          )
        ) : noLoginSearchHistory.length === 0 ? (
          <em>No history, search one</em>
        ) : (
          noLoginSearchHistory.map((record, index) => (
            <SearchHistoryCard
              record={record}
              key={index}
              index={index}
              renderFrom={"history"}
            />
          ))
        )}
      </SearchHistoryList>
    </div>
  );
}
