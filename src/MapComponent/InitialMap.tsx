import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function InitialMap() {
  return (
    <MapContainer center={[51.5236, -0.129]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[51.5236, -0.129]}>
        <Popup>
          <b>London</b> <br /> A Beautiful City
        </Popup>
      </Marker>
    </MapContainer>
  );
}
