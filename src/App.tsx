import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filters } from "./Components/Filters";
import { FlightCard } from "./Components/FlightCard";
import flights from "./flights.json";
import { TSerachResults } from "./types";
import { sortFlights } from "./utils/sorting";

export const mockData = flights as { result: TSerachResults };
const initialShowCount = 2;
const showCountStep = 2;

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const carriers = searchParams.getAll("carrier");
  const minPrice = searchParams.get("min-price");
  const maxPrice = searchParams.get("max-price");

  const showCount =
    searchParams.get("show-count") || initialShowCount.toString();

  const sortedFlights = sortFlights(
    searchParams.get("sort"),
    mockData.result.flights
  );
  const filteredByPrice = sortedFlights
    .filter(
      ({ flight }) =>
        !maxPrice || parseInt(maxPrice) > parseInt(flight.price.total.amount)
    )
    .filter(
      ({ flight }) =>
        !minPrice || parseInt(minPrice) < parseInt(flight.price.total.amount)
    ); // переписать функцию красиво

  const filteredByCarriers = filteredByPrice.filter(
    ({ flight }) => !carriers.length || carriers.includes(flight.carrier.uid)
  );

  console.log(filteredByCarriers.length);

  return (
    <Flex padding="5">
      <Box width="15%" marginRight="2rem">
        <Filters flights={filteredByPrice} />
      </Box>
      <VStack width="65%" alignItems="baseline">
        <Box width="80%">
          {filteredByCarriers
            .slice(
              0,
              filteredByCarriers.length < parseInt(showCount) - 1
                ? filteredByCarriers.length
                : parseInt(showCount)
            )
            .map(({ flight: { carrier, price, legs }, flightToken }) => {
              return (
                <FlightCard
                  carrier={carrier}
                  price={price}
                  legs={legs}
                  key={flightToken}
                />
              );
            })}
        </Box>
        {filteredByCarriers.length > parseInt(showCount) && (
          <Button
            onClick={() => {
              const newParams = searchParams.set(
                "show-count",
                parseInt(showCount) + showCountStep > filteredByCarriers.length
                  ? filteredByCarriers.length.toString()
                  : (parseInt(showCount) + showCountStep).toString()
              );
              setSearchParams(searchParams);
            }}
          >
            Показать еще
          </Button>
        )}
      </VStack>
    </Flex>
  );
}

export default App;
