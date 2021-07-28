import React from "react";
import styled from "styled-components";
import { MODE_IMAGE } from "../consistent";
import { splitDurationToNumberArray } from "../helperFunction";
import MapIcon from "@material-ui/icons/Map";
import { IconButton } from "@material-ui/core";
import { PATH_COLOR } from "../consistent";
import useStore from "../store";
import { setZoomScale } from "../helperFunction";
import { RoutePartType } from "../store";

const Card = styled.li`
  border-bottom: 1px solid lightgray;
  padding: 5px 20px;
  box-shadow: 0px 0px 5px 0px lightgrey;
  color: rgb(72, 72, 72);

  .path-icon {
    height: 20px;
    margin: 3px;
  }
  .duration-container {
    padding-bottom: 10px;
  }
  .duration {
    font-weight: 700;
    font-size: 1.2rem;
  }
  .tube-station {
    background-color: rgb(220, 220, 220, 0.3);
    padding: 2px 5px;
  }
  .toward-box {
    width: 5px;
    height: 20px;
    border-radius: 2px;
    background-color: rgb(72, 72, 72);
    margin: 3px 5px;
  }

  .tube-line {
    font-weight: 800;
    padding: 5px 0;
  }
`;

type Props = {
  part: RoutePartType;
};

export default function TravelPartCard({ part }: Props) {
  let durationArray = splitDurationToNumberArray(part.duration);
  const updateMapCenterCoordinates = useStore(
    (state) => state.updateMapCenterCoordinates
  );
  const setZoomScaleControl = useStore((state) => state.setZoomScaleControl);

  function zoomMap() {
    let centerLat =
      (part.coordinates[0][0] +
        part.coordinates[part.coordinates.length - 1][0]) /
      2;
    let centerLot =
      (part.coordinates[0][1] +
        part.coordinates[part.coordinates.length - 1][1]) /
      2;
    updateMapCenterCoordinates([centerLat, centerLot]);
    setZoomScaleControl(setZoomScale(part.duration));
  }
  return (
    <Card>
      <div className="auto-col space-between"></div>

      {part.mode === "foot" ? (
        <div className=" path-detail-container">
          <div className="auto-col space-between align-center">
            <div className="duration-container">
              <span className="duration">
                {durationArray[0] * 60 + durationArray[1]}
              </span>
              <span> mins</span>
            </div>
            <IconButton aria-label="view-map" onClick={() => zoomMap()}>
              <MapIcon fontSize="small" />
            </IconButton>
          </div>
          <div className="space-between align-center auto-col tube-station">
            <img className="path-icon" src={MODE_IMAGE[part.mode]} />
            <p style={PATH_COLOR[part.line_name]}>{part.from_point_name}</p>
            <b>{part.departure_time}</b>
          </div>
          <div className="toward-box"></div>
          <div className="space-between align-center auto-col tube-station">
            <img className="path-icon" src={MODE_IMAGE[part.mode]} />
            <p style={PATH_COLOR[part.line_name]}>{part.to_point_name}</p>
            <b>{part.arrival_time}</b>
          </div>
        </div>
      ) : null}

      {part.mode === "tube" ? (
        <div className="path-detail-container">
          <div className="auto-col space-between align-center">
            <div className="duration-container">
              <span className="duration">
                {durationArray[0] * 60 + durationArray[1]}
              </span>
              <span> mins</span>
            </div>
            <IconButton aria-label="view-map" onClick={() => zoomMap()}>
              <MapIcon fontSize="small" />
            </IconButton>
          </div>

          <p className="tube-line">
            {part.line_name} Line - - - {part.destination}
          </p>

          <div className="space-between align-center auto-col tube-station">
            <img className="path-icon" src={MODE_IMAGE[part.line_name]} />
            <p style={PATH_COLOR[part.line_name]}>{part.from_point_name}</p>
            <b>{part.departure_time}</b>
          </div>
          <div className="toward-box"></div>
          <div className="space-between align-center auto-col tube-station">
            <img className="path-icon" src={MODE_IMAGE[part.line_name]} />
            <p style={PATH_COLOR[part.line_name]}>{part.to_point_name}</p>
            <b>{part.arrival_time}</b>
          </div>
        </div>
      ) : null}

      {part.mode === "overground" ||
      part.mode === "train" ||
      part.mode === "dlr" ? (
        <div className="path-detail-container">
          <div className="auto-col space-between align-center">
            <div className="duration-container">
              <span className="duration">
                {durationArray[0] * 60 + durationArray[1]}
              </span>
              <span> mins</span>
            </div>
            <IconButton aria-label="view-map" onClick={() => zoomMap()}>
              <MapIcon fontSize="small" />
            </IconButton>
          </div>

          <p className="tube-line">Direction : {part.destination}</p>
          <div className="space-between align-center auto-col tube-station">
            <img className="path-icon" src={MODE_IMAGE[part.mode]} />
            <p style={PATH_COLOR[part.line_name]}>{part.from_point_name}</p>
            <b>{part.departure_time}</b>
          </div>
          <div className="toward-box"></div>
          <div className="space-between align-center auto-col tube-station">
            <img className="path-icon" src={MODE_IMAGE[part.mode]} />
            <p style={PATH_COLOR[part.line_name]}>{part.to_point_name}</p>
            <b>{part.arrival_time}</b>
          </div>
        </div>
      ) : null}

      {part.mode === "bus" ? (
        <div className="path-detail-container">
          <div className="auto-col space-between align-center">
            <div className="duration-container">
              <span className="duration">
                {durationArray[0] * 60 + durationArray[1]}
              </span>
              <span> mins</span>
            </div>
            <IconButton aria-label="view-map" onClick={() => zoomMap()}>
              <MapIcon fontSize="small" />
            </IconButton>
          </div>
          <p className="tube-line">
            {part.line_name} - - - {part.destination}
          </p>
          <div className="space-between align-center auto-col tube-station">
            <img className="path-icon" src={MODE_IMAGE[part.mode]} />
            <p>{part?.from_point?.place?.name}</p>
            <b>{part.departure_time}</b>
          </div>
          <div className="toward-box"></div>
          <div className="space-between align-center auto-col tube-station">
            <img className="path-icon" src={MODE_IMAGE[part.mode]} />
            <p>{part?.to_point?.place?.name}</p>
            <b>{part.arrival_time}</b>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
