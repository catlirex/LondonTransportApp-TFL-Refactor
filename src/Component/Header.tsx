import React from "react";
import styled from "styled-components";
import HeaderAccountBar from "./HeaderAccountBar";

const StyleHeader = styled.header`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  background-color: #bdece3;
  padding: 20px 50px;
  .logo {
    height: 10vh;
    border-radius: 10px;
  }
`;

export default function Header() {
  return (
    <StyleHeader>
      <img className="logo" src="/assets/logo.png" />
      <HeaderAccountBar />
    </StyleHeader>
  );
}
