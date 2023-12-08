export function EventsDataPatcher(events: any) {
  const deserializedEvents = events?.map((event: any) => {
    return {
      ...event,
      createdAt: new Date(event?.createdAt),
      updatedAt: new Date(event?.updatedAt),
      date: new Date(event?.date),
    };
  });

  return deserializedEvents;
}