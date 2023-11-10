import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Combobox } from "@headlessui/react";

export const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete({ debounce: 300 });

  console.log(ready, status, value, data);

  const handleSelect = async (address: string) => {
    console.log("selected", address);
    setValue(address, false);
    clearSuggestions();

    const result = await getGeocode({ address });
    const { lat, lng } = await getLatLng(result[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox name="z-40">
      <Combobox.Input
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
              {description}
            </Combobox.Option>
          ))}
      </Combobox.Options>
    </Combobox>
  );
};
