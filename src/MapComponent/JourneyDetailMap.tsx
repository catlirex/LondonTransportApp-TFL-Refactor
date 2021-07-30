import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
  CircleMarker,
} from "react-leaflet";
import useStore from "../store";
import { PATH_COLOR } from "../consistent";
import { setZoomScale } from "../helperFunction";
import { useEffect } from "react";
import { ResultType } from "../store";

type Props = { result: ResultType };

export default function JourneyDetailMap({ result }: Props) {
  const mapCenterCoordinates = useStore((state) => state.mapCenterCoordinates);
  const zoomScaleControl = useStore((state) => state.zoomScaleControl);
  const map = useStore((state) => state.map);
  const updateMap = useStore((state) => state.updateMap);

  useEffect(() => {
    if (map && mapCenterCoordinates.length)
      map?.flyTo(mapCenterCoordinates, zoomScaleControl, {
        duration: 1,
      });
  }, [mapCenterCoordinates]);

  if (!result || !mapCenterCoordinates.length) return <h2>Loading</h2>;

  return (
    <>
      <MapContainer
        whenCreated={(map) => updateMap(map)}
        center={mapCenterCoordinates}
        zoom={setZoomScale(result.duration)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {result.route_parts.map((part, index) => {
          return (
            <>
              <Polyline
                pathOptions={
                  part.mode === "tube"
                    ? PATH_COLOR[part.line_name]
                    : PATH_COLOR[part.mode]
                }
                positions={part.coordinates}
              />

              <CircleMarker
                center={part.coordinates[0]}
                pathOptions={{ color: "#0098D4" }}
                radius={3}
              ></CircleMarker>

              {index === result.route_parts.length - 1 ? (
                <Marker
                  position={part.coordinates[part.coordinates.length - 1]}
                >
                  <Popup>{part.to_point_name}</Popup>
                </Marker>
              ) : null}
              {index === 0 ? (
                <Marker position={part.coordinates[0]}>
                  <Popup>{part.from_point_name}</Popup>
                </Marker>
              ) : null}
            </>
          );
        })}
      </MapContainer>
    </>
  );
}
