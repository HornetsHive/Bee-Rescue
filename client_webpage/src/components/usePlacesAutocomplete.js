import { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

/*
This hook is used to initialize the Google Maps Places Autocomplete API.
It attempts to gracefully handle the case where the API fails to load.
The useEffect hook is called whenever a new character is typed into the input field,
so each keystroke is a unique API call that will do the whole initialization process.

FUTURE: place also contains the latitude and longitude of the location, which could save us a call to the Geocoding API
*/

//inputRef is a reference to the input element
//onPlaceSelected is a callback function that is called when a place is selected
const usePlacesAutocomplete = (apiKey, inputRef, onPlaceSelected) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [apiError, setApiError] = useState(false); //state variable to track API load status

  useEffect(() => {
    if(!apiKey){setApiError(true); return;}

    const initAutocomplete = async () => {
      //initialize the loader
      const loader = new Loader({
        apiKey,
        version: "weekly",
        libraries: ["places"],
      });

      try {
        //wait Google Maps API to load before initializing the autocomplete instance
        await loader.load();
        //initialize the autocomplete instance
        const autoCompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: ["us", "ca"] },
          fields: ["address_components", "geometry"],
          types: ["address"],
        });

        //add a listener to the autocomplete instance which calls the callback function when a place is selected
        autoCompleteInstance.addListener("place_changed", () => {
          if (onPlaceSelected) {
            //on selection, call the callback function passed in as a prop using the place selected as an argument
            onPlaceSelected(autoCompleteInstance.getPlace());
          }
        });

        //use the autcomplete hook to set the autocomplete instance
        setAutocomplete(autoCompleteInstance);
      } catch (error) {
        console.error("Error initializing Google Maps API:", error);
        setApiError(true);
      }
    };

    if (!autocomplete && inputRef.current && !apiError) {
      initAutocomplete();
    }
  }, [apiKey, inputRef, onPlaceSelected, autocomplete, apiError]);

  return autocomplete;
};

export default usePlacesAutocomplete;
