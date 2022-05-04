import { TFullFlight, TLeg } from "../types";

export const priceAsc = (flights: TFullFlight[]) =>
  flights.sort((a, b) => {
    const aPrice = parseInt(a.flight.price.total.amount);
    const bPrice = parseInt(b.flight.price.total.amount);
    if (aPrice > bPrice) return 1;
    if (aPrice < bPrice) return -1;
    return 0;
  });

const legsFlightDuration = (legs: TLeg[]) =>
  legs.reduce((acc, cur) => acc + cur.duration, 0);

export const flightDuration = (flights: TFullFlight[]) =>
  flights.sort((a, b) => {
    const aDuration = legsFlightDuration(a.flight.legs);
    const bDuration = legsFlightDuration(b.flight.legs);
    if (aDuration > bDuration) return 1;
    if (aDuration < bDuration) return -1;
    return 0;
  });

export const sortFlights = (sortDirection: string, flights: TFullFlight[]) => {
  const flightsToSort = [...flights];
  switch (sortDirection) {
    case "price-asc":
      return priceAsc(flightsToSort);
    case "price-desc":
      return priceAsc(flightsToSort).reverse();
    case "flight-duration":
      return flightDuration(flightsToSort);
    default:
      return flights;
  }
};

export const calculateTransfer = (legs: TLeg[]) =>
  legs.reduce((acc, cur) => {
    if (cur.segments.length > 1) {
      return acc + cur.segments.length - 1;
    }
    if (cur.segments.length <= 1) {
      return acc;
    }
  }, 0);

