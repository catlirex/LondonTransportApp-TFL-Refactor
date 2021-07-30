import React from "react";
import styled from "styled-components";
import useStore from "../store";
import NewSearch from "./NewSearch";
import Login from "./Login";
import NewUser from "./NewUser";
import AddBookmark from "./AddBookmark";
import Success from "./Success";

interface ModalsType {
  [key: string]: string | null;
}

const modals: ModalsType = {
  "": null,
  newSearch: NewSearch,
  login: Login,
  newUser: NewUser,
  bookmark: AddBookmark,
  success: Success,
};

type Props = {
  className?: string;
};

function ModalContainer({ className }: Props) {
  const modal = useStore((store) => store.modal);
  const closeModal = useStore((store) => store.closeModal);

  const Modal = modals[modal];

  if (!modal) return null;

  return (
    <div className={`modal-container ${className}`}>
      <div className="modal">
        <button className="close-modal" onClick={closeModal}>
          &times;
        </button>
        {Modal ? <Modal /> : null}
      </div>
    </div>
  );
}

export default styled(ModalContainer)`
  position: absolute;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;

  display: grid;
  place-content: center;

  background-color: rgb(189, 236, 227, 0.5);

  z-index: 1000;

  .modal {
    border-radius: 5px;
    padding: 20px 40px;
    background-color: white;
    position: relative;

    display: grid;
    grid-gap: 5px;
  }

  .close-modal {
    position: absolute;

    top: -10px;
    right: -10px;

    justify-self: end;
    border-radius: 50%;
    border: solid 2px navy;
    background-color: #6dd6c2;

    width: 30px;
    height: 30px;

    font-size: 1.5rem;
    color: navy;

    display: grid;
    place-content: center;
  }
`;
