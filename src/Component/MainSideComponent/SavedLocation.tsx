import React from "react";
import { Button, withStyles } from "@material-ui/core";
import useAcStore from "../../acStore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import styled from "styled-components";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AddIcon from "@material-ui/icons/Add";
import WorkIcon from "@material-ui/icons/Work";
import SearchHistoryCard from "./SearchHistoryCard";
import useStore from "../../store";

const StyledBookmarkDiv = styled.div`
  display: grid;
  gap: 20px;
  grid-template-rows: auto auto;
  max-width: 30vw;
  color: #2a2a2a;

  .bookmark-location {
    min-height: 200px;
  }

  .container {
    grid-auto-rows: max-content;
    display: grid;
    gap: 10px;
  }

  .place-container {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 10px;
    padding-bottom: 10px;
  }

  .btn-container {
    gap: 10px;
  }
  .btn-bar {
    gap: 20px;
    max-width: fit-content;
    padding-top: 20px;
  }
`;

const DarkSquareButton = withStyles(() => ({
  root: {
    height: "50px",
    width: "50px",
    color: "white",
    backgroundColor: "#2a2a2a",
    "&:hover": {
      backgroundColor: "grey",
    },
  },
}))(Button);

const DarkButton = withStyles(() => ({
  root: {
    color: "white",
    backgroundColor: "#2a2a2a",

    "&:hover": {
      backgroundColor: "grey",
    },
  },
}))(Button);

export default function SavedLocation() {
  const loginUser = useAcStore((state) => state.loginUser);
  const setModal = useStore((state) => state.setModal);
  const setSelectedBookmarkPostcode = useAcStore(
    (state) => state.setSelectedBookmarkPostcode
  );
  function handleBookmarkClick(postcode: string) {
    setSelectedBookmarkPostcode(postcode);
    setModal("newSearch");
  }

  if (!loginUser)
    return (
      <StyledBookmarkDiv>
        <div className="container">
          <h3>Bookmarked Location & Saved Journey</h3>
          <em>Login to view shortcut</em>
          <div className="auto-col btn-container">
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
          </div>
        </div>
      </StyledBookmarkDiv>
    );
  else
    return (
      <StyledBookmarkDiv>
        <div className="container bookmark-location">
          <h3>Bookmarked Location</h3>
          <div>
            {Object.keys(loginUser["saved-place"]).length ? (
              <>
                <div className="place-container">
                  {Object.keys(loginUser["saved-place"]).map(function (key) {
                    return (
                      <DarkButton
                        key={key}
                        variant="contained"
                        color="default"
                        onClick={() =>
                          handleBookmarkClick(loginUser["saved-place"][key])
                        }
                      >
                        {key} - {loginUser["saved-place"][key]}
                      </DarkButton>
                    );
                  })}
                </div>
                <div className="auto-col btn-bar">
                  <DarkSquareButton
                    variant="contained"
                    color="default"
                    onClick={() => setModal("bookmark")}
                  >
                    <AddIcon fontSize="small" />
                  </DarkSquareButton>
                </div>
              </>
            ) : (
              <>
                <em>No bookmark yet</em>
                <div className="auto-col btn-bar">
                  <DarkSquareButton
                    variant="contained"
                    color="default"
                    onClick={() => setModal("bookmark")}
                  >
                    <AddIcon fontSize="small" />
                    <HomeOutlinedIcon />
                  </DarkSquareButton>
                  <DarkSquareButton
                    variant="contained"
                    color="default"
                    onClick={() => setModal("bookmark")}
                  >
                    <AddIcon fontSize="small" />
                    <WorkIcon />
                  </DarkSquareButton>

                  <DarkSquareButton
                    variant="contained"
                    color="default"
                    onClick={() => setModal("bookmark")}
                  >
                    <AddIcon />
                  </DarkSquareButton>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="container saved-journey">
          <h3>Saved Journey</h3>

          {Object.keys(loginUser["saved-journey"]).length ? (
            loginUser["saved-journey"].map((record, index) => (
              <SearchHistoryCard
                record={record}
                key={index}
                index={index}
                renderFrom={"journey"}
              />
            ))
          ) : (
            <>
              <em>Empty</em>
            </>
          )}
        </div>
      </StyledBookmarkDiv>
    );
}
