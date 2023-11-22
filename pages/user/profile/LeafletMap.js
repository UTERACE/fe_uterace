import React, { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'

const LeafletMap = ({
  center,
  positions,
  startPoint,
  endPoint,
  id = 'leafletMap' + Math.random(),
}) => {
  useEffect(() => {
    if (center) {
      try {
        const L = require('leaflet')
        const map = L.map(id).setView(center || [51.505, -0.09], 15)
        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {}
        ).addTo(map)
        L.polyline(positions, { color: 'red' }).addTo(map)
        const customStartIcon = L.icon({
          iconUrl: '/flag.png',
          iconSize: [20, 20], // Set the icon size (width, height)
          iconAnchor: [10, 20],
        })
        const customEndIcon = L.icon({
          iconUrl: '/finish.png',
          iconSize: [20, 20], // Set the icon size (width, height)
          iconAnchor: [10, 20],
        })
        const marker = [
          {
            position: startPoint || [51.505, -0.09],
            text: 'Start',
            icon: customStartIcon,
          },
          {
            position: endPoint || [51.51, -0.1],
            text: 'End',
            icon: customEndIcon,
          },
        ]
        marker.forEach((item) => {
          L.marker(item.position, { icon: item.icon })
            .addTo(map)
            .bindPopup(item.text)
        })
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  return <div id={id} style={{ height: '35rem' }} />
}

export default LeafletMap
