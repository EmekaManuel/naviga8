import {
  ArrowRight,
  MapPin,
  Trash2,
  LocateIcon,
  SaveIcon,
  DeleteIcon,
  Trash2Icon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import styled from "styled-components";
import styles from "./ProductDemo.module.scss";
import axios from "axios";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const apiUrl = "https://naviga8-backend-1.onrender.com";

if (!GOOGLE_MAPS_API_KEY) {
  throw new Error(
    "Google Maps API key is not defined in the environment variables."
  );
}
const loaderOptions = {
  googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  libraries: ["places", "drawing", "geometry", "visualization"] as any[],
};

export default function ProductDemo() {
  const center = { lat: 6.867507105156651, lng: 7.411941467662972 };
  const { isLoaded } = useJsApiLoader(loaderOptions);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [savedRoutes, setSavedRoutes] = useState<any[]>([]);

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const dummyRoutesData = [
    {
      id: "1",
      origin: {
        address: "123 Main St, New York, NY",
        latitude: 40.7128,
        longitude: -74.006,
      },
      destination: {
        address: "456 Broadway, New York, NY",
        latitude: 40.7082,
        longitude: -74.0103,
      },
      distance: "2.5 miles",
      duration: "12 mins",
      createdAt: new Date("2024-01-15T10:30:00Z"),
    },
    {
      id: "2",
      origin: {
        address: "Central Park, New York, NY",
        latitude: 40.7829,
        longitude: -73.9654,
      },
      destination: {
        address: "Times Square, New York, NY",
        latitude: 40.758,
        longitude: -73.9855,
      },
      distance: "3.2 miles",
      duration: "18 mins",
      createdAt: new Date("2024-01-16T14:45:00Z"),
    },
  ];
  const [pageView, setPageView] = useState("map");

  const togglePageView = () => {
    setPageView((prevPageView) =>
      prevPageView === "map" ? "savedRoutes" : "map"
    );
  };

  useEffect(() => {
    const fetchSavedRoutes = async () => {
      try {
        // Replace with actual user ID when authentication is implemented
        const response = await axios.get(
          `${apiUrl}/api/naviga8/savedlocations`
        );
        setSavedRoutes(response.data);
      } catch (error) {
        console.error("Error fetching saved routes:", error);
      }
    };

    fetchSavedRoutes();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          map?.panTo(location);
          map?.setZoom(15);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const saveRoute = async () => {
    if (!directionsResponse || !originRef.current || !destinationRef.current)
      return;

    try {
      const originPlace = await getPlaceDetails(originRef.current.value);
      const destinationPlace = await getPlaceDetails(
        destinationRef.current.value
      );

      const routeData = {
        userId: Math.random().toString(36).substring(2, 15),
        origin: {
          address: originRef.current.value,
          latitude: originPlace.lat,
          longitude: originPlace.lng,
        },
        destination: {
          address: destinationRef.current.value,
          latitude: destinationPlace.lat,
          longitude: destinationPlace.lng,
        },
        distance,
        duration,
      };
      console.log(routeData);

      const response = await axios.post(
        `${apiUrl}/api/naviga8/savelocations`,
        routeData
      );
      setSavedRoutes([...savedRoutes, response.data]);
    } catch (error) {
      console.error("Error saving route:", error);
    }
  };

  // Helper function to get place details
  const getPlaceDetails = (
    address: string
  ): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const location = results[0].geometry.location;
          resolve({
            lat: location.lat(),
            lng: location.lng(),
          });
        } else {
          reject(new Error("Geocode was not successful"));
        }
      });
    });
  };

  const calculateRoute = async () => {
    if (!originRef.current?.value || !destinationRef.current?.value) return;

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    // @ts-ignore
    setDistance(results.routes[0].legs[0].distance.text);
    // @ts-ignore
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    if (originRef.current) originRef.current.value = "";
    if (destinationRef.current) destinationRef.current.value = "";
  };

  const deleteRoute = async (routeId: string) => {
    try {
      await axios.delete(`${apiUrl}/api/naviga8/savedlocations/${routeId}`);
      setSavedRoutes(savedRoutes.filter((route) => route._id !== routeId));
    } catch (error) {
      console.error("Error deleting route:", error);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.product_demo}>
        <ToggleButton onClick={togglePageView}>
          {pageView === "map" ? "View Saved Routes" : "View Map"}
        </ToggleButton>{" "}
        {pageView === "map" && (
          <>
            {" "}
            <div>
              <StyledCard>
                <Section>
                  <InputGroup>
                    <MapPinIcon />
                    <Autocomplete>
                      <StyledInput ref={originRef} placeholder="Origin" />
                    </Autocomplete>
                  </InputGroup>
                  <InputGroup>
                    <MapPinIcon />
                    <Autocomplete>
                      <StyledInput
                        ref={destinationRef}
                        placeholder="Destination"
                      />
                    </Autocomplete>
                  </InputGroup>

                  <ButtonGroup>
                    <UiButton onClick={calculateRoute}>Get Route</UiButton>
                    <UiButton onClick={saveRoute}>Save </UiButton>
                    <ClearButton onClick={clearRoute}>
                      <TrashIcon />
                      Clear
                    </ClearButton>
                  </ButtonGroup>
                </Section>

                <CenterMapButton onClick={getUserLocation}>
                  <LocateIcon />
                </CenterMapButton>
              </StyledCard>
            </div>
            <GoogleMap
              center={userLocation || center}
              zoom={16}
              mapContainerStyle={{ width: "100%", height: "85%" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={(mapInstance) => setMap(mapInstance)}
            >
              {userLocation ? (
                <Marker position={userLocation} />
              ) : (
                <Marker position={center} />
              )}
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
            {directionsResponse && (
              <InfoBox>
                <p>Distance: {distance}</p>
                <p>Duration: {duration}</p>
              </InfoBox>
            )}{" "}
          </>
        )}
        {dummyRoutesData.length > 0 && (
          <SavedRoutesContainer>
            <h3>Saved Routes</h3>
            {savedRoutes.map((route, index) => (
              <SavedRouteItem key={route._id}>
                <div>
                  <p>From: {route.origin.address}</p>
                  <p>To: {route.destination.address}</p>
                  <p>Distance: {route.distance}</p>
                  <p>Duration: {route.duration}</p>
                </div>
                <Trash2Icon
                  color="red"
                  onClick={() => deleteRoute(route._id)}
                />
              </SavedRouteItem>
            ))}
          </SavedRoutesContainer>
        )}
      </div>
    </>
  );
}
const StyledCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100%;
  padding: 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  gap: 1rem;
`;
const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100%;
  padding: 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  gap: 1rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const ToggleButton = styled.div`
  display: flex;
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #6851cf;
  color: white;
  padding: 1rem;
  margin-bottom: 10px;
  width: fit-content;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

const StyledInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #ffffff;
  color: black;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  width: 50%;
`;

const UiButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6851cf;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  width: max-content;
  text-align: center;

  &:hover {
    background-color: #281675;
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  font-size: 0.875rem;
  width: 100%;
  text-align: center;

  &:hover {
    color: #c53030;
  }
`;

const CenterMapButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 50%;
  border: none;
  background-color: #4caf50;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: white;
  }
`;

const MapPinIcon = styled(MapPin)`
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
`;

const TrashIcon = styled(Trash2)`
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
`;

const InfoBox = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #f7fafc;
  border-radius: 0.375rem;
  width: 100%;
  text-align: center;
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #45a049;
  }
`;

const SavedRoutesContainer = styled.div`
  margin-top: 1rem;
  background-color: #f7fafc;
  border-radius: 0.375rem;
  padding: 1rem;
  color: black;
`;

const SavedRouteItem = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  color: black;
`;
