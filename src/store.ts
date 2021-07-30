import create from "zustand";
import { createAPILink } from "./consistent";
import Leaflet from "leaflet";

export type RoutePartType = {
  mode: string;
  from_point_name: string;
  from_point: {
    place: { name: string } | null;
  };
  to_point_name: string;
  to_point: {
    place: { name: string } | null;
  };
  destination: string;
  destination_point: {
    place: string | null;
  };
  line_name: string;
  duration: string;
  departure_time: string;
  arrival_time: string;
  departure_datetime: string;
  arrival_datetime: string;
  coordinates: [number, number][];
};

export type ResultType = {
  duration: string;
  route_parts: RoutePartType[];
  departure_time: string;
  arrival_time: string;
  departure_datetime: string;
  arrival_datetime: string;
};

export type SearchHistory = {
  from: string;
  fromPostcode: string;
  to: string;
  toPostcode: string;
};

type StoreType = {
  viewHistory: boolean;
  setViewHistory: (arg: boolean) => void;
  modal: string;
  setModal: (modal: string) => void;
  closeModal: () => void;
  searchResult: ResultType[] | null;
  getSearchResult: (from: string, to: string) => void;
  clearSearchResult: () => void;
  searchValue: { fromPostcode: string; toPostcode: string } | null;
  updateSearchValue: (from: string, to: string) => void;
  noLoginSearchHistory: SearchHistory[];
  addNoLoginSearchHistory: (arg: SearchHistory) => void;
  delLoginSearchHistory: (arg: SearchHistory[]) => void;
  mapCenterCoordinates: [number, number] | [];
  updateMapCenterCoordinates: (arg: [number, number]) => void;
  map: Leaflet.Map | null;
  updateMap: (arg: Leaflet.Map) => void;
  zoomScaleControl: number | undefined;
  setZoomScaleControl: (zoomLevel: number) => void;
};

const useStore = create<StoreType>((set, get) => ({
  viewHistory: false,
  setViewHistory: (boolean) => set({ viewHistory: boolean }),
  modal: "",
  setModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: "" }),
  searchResult: [],
  getSearchResult: (fromPostCode, toPostCode) => {
    fetch(createAPILink(fromPostCode, toPostCode))
      .then((resp) => resp.json())
      .then((data) => {
        let usefulData = data.routes;
        usefulData.map((routes: ResultType) => {
          routes.route_parts.map((part) => {
            part.coordinates = part.coordinates.map(([lan, lon]) => [lon, lan]);
          });
        });
        set({ searchResult: [...usefulData] });
      })
      .catch((error) => {
        console.error("Error:", error);
        set({ searchResult: [] });
      });
  },
  clearSearchResult: () => {
    set({ searchResult: null });
  },
  searchValue: null,
  updateSearchValue: (fromPostcode, toPostcode) => {
    set({ searchValue: { fromPostcode, toPostcode } });
  },

  noLoginSearchHistory: [],
  addNoLoginSearchHistory: (newHistory) =>
    set({
      noLoginSearchHistory: [newHistory, ...get().noLoginSearchHistory],
    }),
  delLoginSearchHistory: (historyArray) =>
    set({ noLoginSearchHistory: historyArray }),

  mapCenterCoordinates: [],
  updateMapCenterCoordinates: (array) => {
    set({ mapCenterCoordinates: array });
  },

  map: null,
  updateMap: (newMap) => set({ map: newMap }),
  zoomScaleControl: undefined,
  setZoomScaleControl: (zoomLevel) => set({ zoomScaleControl: zoomLevel }),
}));

export default useStore;
