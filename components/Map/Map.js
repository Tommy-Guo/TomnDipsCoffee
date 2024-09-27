'use client';

// Map uses 'use client' but the API key is URL locked, so even though the user has access to the key, no harm can be done.

import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const defaultIconUrl = '../images/map-pointer.webp';

const Map = ({ scrollableSectionRef }) => {
  const [cafes, setCafes] = useState([]);
  const mapRef = useRef(null); // Ref to store the map instance

  useEffect(() => {
    const fetchIdentifiers = async () => {
      const response = await fetch('/api');
      const data = await response.json();
      return data.identifiers;
    };

    const fetchCafesData = async () => {
      const identifiers = await fetchIdentifiers();
      const cafesData = await Promise.all(identifiers.map(async (identifier) => {
        const response = await fetch(`/cafes/${identifier}/${identifier}.json`);
        const data = await response.json();
        return data;
      }));
      setCafes(cafesData);
    };

    fetchCafesData();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const map = L.map('map', {
        center: [43.692366719510346, -79.41738474464456],
        zoom: 12,
        scrollWheelZoom: true
      });
      L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x.webp?optimize=true&access_token=${process.env.NEXT_PUBLIC_MAP_TOKEN}`, {
        maxZoom: 18,
        // id: 'mapbox/dark-v11',
        id: 'mapbox/outdoors-v11',
        tileSize: 512,
        zoomOffset: -1
      }).addTo(map);
      mapRef.current = map;

      cafes.forEach(cafe => {
        const iconUrl = `/api/${cafe.identifier}/icon`;

        const icon = L.divIcon({
          className: 'custom-icon',
          html: `
            <div style="position: relative; background-color: white !important; color: black !important;">
              <img src="${defaultIconUrl}" alt="Map pointer" style="position: absolute; top: 0; left: 0; width: 30px; height: 47.427385892116185px;">
              <img src="${iconUrl}" alt="${cafe.name} icon " style="position: absolute; top: 0; left: 0; width: 32px; height: 32px; background-color: white !important; border-radius: 6px; border: 2px solid white">
            </div>
          `,
          iconSize: [32, 32]
        });

        const marker = L.marker([cafe.lat, cafe.lng], { icon: icon }).addTo(map);
        marker.on('click', () => {
          const cafeElement = document.getElementById(cafe.identifier);
          if (cafeElement) {
            cafeElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });

      });

      return () => {
        map.remove();
      };
    }
  }, [cafes, scrollableSectionRef]);

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (mapRef.current) {
            const userLocationMarker = L.marker([latitude, longitude], {
              icon: L.icon({
                iconUrl: '/images/location-dot.webp',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              }),
            }).addTo(mapRef.current);
            mapRef.current.setView([latitude, longitude], 14);
          }
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div id="map" className={styles.map}>
      <button onClick={handleLocation} className={styles.floating_button} alt="Add your location!" aria-label="Add your location!"><FontAwesomeIcon icon={faLocationDot} /></button>
    </div>
  );
};

export default Map;
