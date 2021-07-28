import React from "react";
import DoneIcon from "@material-ui/icons/Done";
import styled from "styled-components";

type Props = {
  className: string;
};

function Success({ className }: Props) {
  return (
    <div className={className}>
      <DoneIcon fontSize="large" />
      <em>Saved</em>
    </div>
  );
}

export default styled(Success)`
  display: grid;
  place-items: center;
`;
