// src/components/MapWithRoute.tsx
'use client';

import React from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Props {
  origin: [number, number];
  destination: [number, number];
  routeGeoJSON: { type: string; coordinates: [number, number][] };
}

const MapWithRoute: React.FC<Props> = ({ origin, destination, routeGeoJSON }) => {
  // ← Aquí van los console.log justo al entrar al componente
  console.log("ORIGEN:", origin);
  console.log("DESTINO:", destination);
  console.log("COORDS RUTA:", routeGeoJSON.coordinates);

  // Calcular centro para el initialViewState
  const centerLng = (origin[0] + destination[0]) / 2;
  const centerLat = (origin[1] + destination[1]) / 2;

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: centerLng,
        latitude:  centerLat,
        zoom:      13,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {/* Marcadores */}
      <Marker longitude={origin[0]} latitude={origin[1]} color="red" />
      <Marker longitude={destination[0]} latitude={destination[1]} color="blue" />

      {/* Fuente y capa de la ruta */}
      <Source
        id="route"
        type="geojson"
        data={{
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: routeGeoJSON.coordinates,
              }
            }
          ]
        }}
      >
        <Layer
          id="route-line"
          type="line"
          paint={{
            'line-color': '#3b82f6',
            'line-width': 4,
          }}
        />
      </Source>
    </Map>
  );
};

export default MapWithRoute;
