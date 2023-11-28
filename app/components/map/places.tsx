import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Combobox } from "@headlessui/react";
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

type placesAutocompleteInputType = {
  searchLocation?: string;
  setSearchLocation?: any;
  onComplete?: any;
};

export const PlacesAutocomplete = ({
  searchLocation,
  setSearchLocation,
  onComplete
}: placesAutocompleteInputType) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete({ debounce: 300 });
  const map = useMap("main");

  const [displayLocation, setDisplayLocation] = useState<string | null>(null);
  //our default data
  useEffect(() => {
    displayLocation ?? setValue(searchLocation ?? "");
  }, []);

  const handleSelect = async (address: string) => {
    console.log("selected", address);
    setValue(address, false);
    setSearchLocation(address);
    clearSuggestions();

    const result = await getGeocode({ address });
    const latlng = await getLatLng(result[0]);
    map?.panTo(latlng);

    new google.maps.Marker({
      position: map?.getCenter(),
      map,
      title: "Hello World!",
    });

    onComplete && onComplete()
  };

  return (
    <Combobox value={value} onChange={handleSelect}>
      <Combobox.Input
        value={value}
        onChange={(event) => {
          setDisplayLocation(event.target.value);
          setValue(event.target.value);
        }}
      />
      <Combobox.Options>
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <Combobox.Option key={place_id} value={description}>
              <div className="bg-white">{description}</div>
            </Combobox.Option>
          ))}
      </Combobox.Options>
    </Combobox>
  );
};
