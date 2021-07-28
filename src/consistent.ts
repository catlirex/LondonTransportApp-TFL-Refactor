import { LoginUserType } from "./acStore";

export const createAPILink = (fromPoint: string, toPoint: string) =>
  `https://transportapi.com/v3/uk/public/journey/from/postcode:${fromPoint}/to/postcode:${toPoint}.json?app_id=7558d875&app_key=13aaeb933ff1d107d096127db22eccf7&service=tfl`;

const LOCAL_DB = "http://localhost:4000";

export function getUser(id: string) {
  return fetch(`${LOCAL_DB}/users/${id}`).then((response) => response.json());
}

export function postUser(newUserDetail: LoginUserType) {
  return fetch(`${LOCAL_DB}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserDetail),
  }).then((response) => {
    if (!response.ok) return alert("Username existed");
    return response.json();
  });
}

export function patchUpdateUser(loginUserId: string, updatedUser: any) {
  return fetch(`${LOCAL_DB}/users/${loginUserId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  }).then((response) => response.json());
}

type Image = {
  [foot: string]: string;
};

export const MODE_IMAGE: Image = {
  foot: "/assets/walkman.png",
  bus: "/assets/Buses.png",
  overground: "/assets/Overground.png",
  dlr: "/assets/DLR.png",
  train: "/assets/Train.png",

  Northern: "/assets/Northern.png",
  Central: "/assets/Central.png",
  Circle: "/assets/Circle.png",
  District: "/assets/District.png",
  Jubilee: "/assets/Jubilee.png",
  Metropolitan: "/assets/Metropolitan.png",
  Piccadilly: "/assets/Piccadilly.png",
  Victoria: "/assets/Victoria.png",
  Bakerloo: "/assets/Bakerloo.png",
  "Hammersmith & City": "/assets/HammerSmith_City.png",
  "Waterloo & City": "/assets/Waterloo_City.png",
};

type Color = {
  [foot: string]: { color: string };
};

export const PATH_COLOR: Color = {
  foot: { color: "lime" },
  bus: { color: "blue" },
  overground: { color: "#EE7C0E" },
  dlr: { color: "#00A4A7" },
  train: { color: "navy" },

  Northern: { color: "#000000" },
  Central: { color: "#E32017" },
  Circle: { color: "#FFD300" },
  District: { color: "#00782A" },
  Jubilee: { color: "rgb(80, 80, 80)" },
  Metropolitan: { color: "A9B0056" },
  Piccadilly: { color: "003688" },
  Victoria: { color: "#0098D4" },
  Bakerloo: { color: "#B36305" },
  "Hammersmith & City": { color: "#F3A9BB" },
  "Waterloo & City": { color: "#95CDBA" },
};
