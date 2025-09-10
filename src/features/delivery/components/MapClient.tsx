"use client";

import React from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapClientProps {
  center: [number, number];
  route: [number, number][];
}

export default function MapClient({ center, route }: MapClientProps) {
  return (
    <MapContainer center={center} zoom={15} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={route} color="#F0C419" />
    </MapContainer>
  );
}