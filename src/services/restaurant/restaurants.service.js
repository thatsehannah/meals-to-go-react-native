import { mocks, mockImages } from "./mock";
import camelize from "camelize";

export const restaurantsRequest = (coords) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[coords];

    if (!mock) {
      reject("not found");
    }

    console.log("Mock restaurants found");
    resolve(mock);
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    restaurant.photos = restaurant.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * mockImages.length - 1)];
    });

    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  console.log("Restaurants have been mapped");
  return camelize(mappedResults);
};
