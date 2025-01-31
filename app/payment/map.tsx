"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

  return location ? <Marker position={location} /> : null;
}
