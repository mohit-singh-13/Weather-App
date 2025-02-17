export function getFromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");

  if (!localCoordinates) {
    // if local coordinates are not present, it means we have not granted location permission
    return false;
  } else {
    const coordinates: Coordinates =
      JSON.parse(localCoordinates);

    return coordinates;
  }
}
