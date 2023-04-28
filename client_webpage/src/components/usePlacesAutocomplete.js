import { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const usePlacesAutocomplete = (apiKey, inputRef, onPlaceSelected) => {
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    const initAutocomplete = async () => {
      const loader = new Loader({
        apiKey,
        version: "weekly",
        libraries: ["places"],
      });

      try {
        await loader.load();
        const autoCompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: ["us", "ca"] },
          fields: ["address_components", "geometry"],
          types: ["address"],
        });

        autoCompleteInstance.addListener("place_changed", () => {
          if (onPlaceSelected) {
            onPlaceSelected(autoCompleteInstance.getPlace());
          }
        });

        setAutocomplete(autoCompleteInstance);
      } catch (error) {
        console.error("Error initializing Google Maps API:", error);
      }
    };

    if (!autocomplete && inputRef.current) {
      initAutocomplete();
    }
  }, [apiKey, inputRef, onPlaceSelected, autocomplete]);

  return autocomplete;
};

export default usePlacesAutocomplete;
