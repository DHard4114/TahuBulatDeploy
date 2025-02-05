"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapComponent({
  location,
  setLocation,
}: {
  location: [number, number] | null;
  setLocation: (loc: [number, number]) => void;
}) {
  return (
    <MapContainer
      center={location || [-6.2088, 106.8456]}
      zoom={13}
      style={{ height: "200px", width: "100%" }}
      className="rounded-md border"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LocationMarker location={location} setLocation={setLocation} />
    </MapContainer>
  );
}

function LocationMarker({
  location,
  setLocation,
}: {
  location: [number, number] | null;
  setLocation: (loc: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      setLocation([e.latlng.lat, e.latlng.lng]);
    },
  });

  return location ? <Marker position={location} icon={customIcon} /> : null;
}
