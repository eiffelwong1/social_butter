import { useMap } from "@vis.gl/react-google-maps";

export const BackToPin = (myLatlng: google.maps.LatLng) => {
  const map = useMap("main");
  if (!map) {
    return <></>;
  }

  const marker = new google.maps.Marker({
    position: myLatlng,
    map,
    title: "Click to zoom",
  });

  google.maps.event.addListener(map, "center_changed", () => {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(() => {
      map.panTo(marker.getPosition() as google.maps.LatLng);
    }, 3000);
  });

  return <></>;
};

export const CenterPin = () => {
  const map = useMap("main");
  if (!map) {
    return;
  }

  google.maps.event.addListener(map, "bounds_change", () => {
    console.log("bound change")
    new google.maps.Marker({
      map: map,
      position: map.getCenter(),
    });
  });

  return <></>;
};
