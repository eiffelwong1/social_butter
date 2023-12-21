import { useMap } from "@vis.gl/react-google-maps";
import { db } from "~/modules/db.server";

export function BoundChangeListener({ onBoundChange }: any) {
  const map = useMap("main");
  if (!map) {
    return <></>;
  }

  async function updateMapPins() {
    if (!map) {
      return <></>;
    }
    const curLatLngBounds = map.getBounds();
    if (curLatLngBounds === undefined) {
      console.warn("google map bounds_changed unable to get bound");
      return <></>;
    }
    onBoundChange && onBoundChange(curLatLngBounds);
    return <></>;
  }

  google.maps.event.addListener(map, "tilesloaded", updateMapPins);
}
