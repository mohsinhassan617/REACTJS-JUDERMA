import React, { useState, useEffect } from 'react';

const DoctorsNearYou = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Construct the API URL with user's location and a 100 km radius
          const apiUrl = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${longitude},${latitude},100000&limit=20&apiKey=afd4e1a552d34d6e913ce878dafff1b9`;

          // Fetch data from the Geoapify API
          fetch(apiUrl)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              setDoctors(data.features); // Geoapify returns features array
              setLoading(false);
            })
            .catch((error) => {
              setError(error);
              setLoading(false);
            });
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
    } else {
      setError(new Error('Geolocation is not supported by this browser.'));
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading doctors...</p>;
  }

  if (error) {
    return <p>Failed to fetch doctors: {error.message}</p>;
  }

  return (
    <div>
      <h3>Doctors Near You</h3>
      <ul>
        {doctors.map((doctor, index) => (
          <li key={index}>
            <p><strong>{doctor.properties.name}</strong></p>
            <p>Address: {doctor.properties.address_line2}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsNearYou;
