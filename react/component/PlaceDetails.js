import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Map from "./Map";
<Map places={[place, ...nearbyPlaces]} />


const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/place/${id}`)
      .then((response) => {
        setPlace(response.data.place);
        setNearbyPlaces(response.data.nearbyPlaces);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {place ? (
        <>
          <h1>{place.name}</h1>
          <p>{place.description}</p>
          <h2>Nearby Attractions</h2>
          <ul>
            {nearbyPlaces.map((p) => (
              <li key={p.id}>{p.name} - {p.distance} km away</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlaceDetails;
