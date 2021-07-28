import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import useStore from "../store";
import { setZoomScale } from "../helperFunction";

export default function ToFromMap() {
  const searchResult = useStore((state) => state.searchResult);
  const [firstCoordinate, setFirstCoordinate] = useState<
    [number, number] | null
  >(null);
  const [lastCoordinate, setLastCoordinate] = useState<[number, number] | null>(
    null
  );
  const updateMapCenterCoordinates = useStore(
    (state) => state.updateMapCenterCoordinates
  );
  const mapCenterCoordinates = useStore((state) => state.mapCenterCoordinates);

  useEffect(() => {
    if (!searchResult || searchResult.length === 0) return;

    setFirstCoordinate(searchResult[0].route_parts[0].coordinates[0]);
    let routeLength = searchResult[0].route_parts.length;
    let coordinatesLength =
      searchResult[0].route_parts[routeLength - 1].coordinates.length;
    setLastCoordinate(
      searchResult[0].route_parts[routeLength - 1].coordinates[
        coordinatesLength - 1
      ]
    );
  }, [searchResult]);

  useEffect(() => {
    if (!firstCoordinate || !lastCoordinate) return;
    let centerLat = (firstCoordinate[0] + lastCoordinate[0]) / 2;
    let centerLot = (firstCoordinate[1] + lastCoordinate[1]) / 2;
    updateMapCenterCoordinates([centerLat, centerLot]);
  }, [firstCoordinate, lastCoordinate, updateMapCenterCoordinates]);

  if (
    !searchResult ||
    searchResult.length === 0 ||
    !firstCoordinate ||
    mapCenterCoordinates.length === 0
  )
    return <h1>Loading...</h1>;

  return (
    <MapContainer
      center={mapCenterCoordinates}
      zoom={setZoomScale(searchResult[0].duration)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={firstCoordinate}>
        <Popup>{searchResult[0].route_parts[0].from_point_name}</Popup>
      </Marker>
      {lastCoordinate ? (
        <Marker position={lastCoordinate}>
          <Popup>
            {
              searchResult[0].route_parts[
                searchResult[0].route_parts.length - 1
              ].to_point_name
            }
          </Popup>
        </Marker>
      ) : null}
      {lastCoordinate ? (
        <Polyline positions={[firstCoordinate, lastCoordinate]} />
      ) : null}
    </MapContainer>
  );
}
