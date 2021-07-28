import React from "react";
import create from "zustand";
import { getUser, patchUpdateUser } from "./consistent";

type ViewHistoryType = {
  from: string;
  to: string;
  fromPostcode: string;
  toPostcode: string;
};

interface SavedPlaceType {
  [key: string]: string;
}

export type LoginUserType = {
  id: string;
  name: string;
  password: string;
  "saved-place": SavedPlaceType;
  history: ViewHistoryType[];
  "saved-journey": ViewHistoryType[];
};

type AcStoreType = {
  loginUser: LoginUserType | null;
  setLogInUser: (e: React.SyntheticEvent) => void;
  logoutUser: () => void;
  newRegUserSetLogin: (user: LoginUserType) => void;
  addHistoryToLoginUser: (newHistory: ViewHistoryType) => void;
  updateHistory: (updatedHistory: ViewHistoryType[]) => void;
  updateJourney: (updatedJourney: ViewHistoryType[]) => void;
  addSavePlace: (updatedObj: any) => void;
  selectedBookmarkPostcode: string | null;
  setSelectedBookmarkPostcode: (postcode: string) => void;
};

const useAcStore = create<AcStoreType>((set, get) => ({
  loginUser: null,
  setLogInUser: (e) => {
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    getUser(target.username.value).then((data) => {
      if (data.password && data.password === target.password.value)
        set({ loginUser: data });
      else alert("Username or Password incorrect");
    });
  },
  logoutUser: () => {
    set({ loginUser: null });
  },
  newRegUserSetLogin: (newRegUser) => set({ loginUser: newRegUser }),
  addHistoryToLoginUser: (newHistory) => {
    const id = get().loginUser?.id;
    const userHistory = get().loginUser?.history;
    if (!id || !userHistory) return console.error("No Login User");
    let history = [newHistory, ...userHistory];
    patchUpdateUser(id, { history }).then((data) => set({ loginUser: data }));
  },
  updateHistory: (updatedHistory) => {
    const id = get().loginUser?.id;
    if (!id) return console.error("No Login User");
    patchUpdateUser(id, { history: updatedHistory }).then((data) =>
      set({ loginUser: data })
    );
  },

  updateJourney: (updatedJourney) => {
    const id = get().loginUser?.id;
    if (!id) return console.error("No Login User");
    patchUpdateUser(id, {
      "saved-journey": updatedJourney,
    }).then((data) => set({ loginUser: data }));
  },

  addSavePlace: (updatedObj) => {
    const id = get().loginUser?.id;
    if (!id) return console.error("No Login User");
    patchUpdateUser(id, { "saved-place": updatedObj }).then((data) =>
      set({ loginUser: data })
    );
  },
  selectedBookmarkPostcode: null,
  setSelectedBookmarkPostcode: (postcode) =>
    set({ selectedBookmarkPostcode: postcode }),
}));

export default useAcStore;
