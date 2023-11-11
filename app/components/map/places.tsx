import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Combobox } from "@headlessui/react";
import { useMap } from "@vis.gl/react-google-maps";

export const PlacesAutocomplete = () => {

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete({ debounce: 300 });
  const map = useMap("main")

  console.log(ready, status, value, data);

  const handleSelect = async (address: string) => {
    console.log("selected", address);
    setValue(address, false);
    clearSuggestions();

    const result = await getGeocode({ address });
    const latlng = await getLatLng(result[0]);
    map?.panTo(latlng)

      new google.maps.Marker({
        position: map?.getCenter(),
        map,
        title: "Hello World!",
      });
  };

  return (
    <Combobox>
      <Combobox.Input
        className=""
        value={value}
        onChange={(event) => setValue(event.target.value)}
        // onSubmit={}
      />
      <Combobox.Options>
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <Combobox.Option
              key={place_id}
              value={description}
              onClick={() => handleSelect(description)}
            >
              <div className="bg-white">{description}</div>
            </Combobox.Option>
          ))}
      </Combobox.Options>
    </Combobox>
  );
};
