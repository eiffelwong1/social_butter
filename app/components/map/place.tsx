import React, { useRef, useState } from "react";
import { useAutocomplete } from "@vis.gl/react-google-maps";
import { Combobox } from "@headlessui/react";

// interface AutocompleteProps {
//   inputField: HTMLInputElement | null;
//   options?: google.maps.places.AutocompleteOptions;
//   onPlaceChanged: (place: google.maps.places.PlaceResult) => void;
// }

export const MyComponent = () => {
  const inputRef = useRef<any>(null);
  const [inputValue, setInputValue] = useState("");

  const onPlaceChanged = (place:any) => {
    if (place) {
      setInputValue(place.formatted_address || place.name);
    }

    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
  };

  useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged,
  });

  const handleInputChange = (event:any) => {
    setInputValue(event.target.value);
  };

  return (
    <Combobox>
    <Combobox.Input ref={inputRef} value={inputValue} onChange={handleInputChange} />
    </Combobox>
  );
};
