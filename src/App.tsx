import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filters } from "./Components/Filters";
import { FlightCard } from "./Components/FlightCard";
import flights from "./flights.json";
import { TSerachResults } from "./types";
import { calculateTransfer, sortFlights, sortTranfer } from "./utils/sorting";

export const mockData = flights as { result: TSerachResults };
const initialShowCount = 2;
const showCountStep = 2;

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const carriers = searchParams.getAll("carrier");
  const minPrice = searchParams.get("min-price");
  const maxPrice = searchParams.get("max-price");
  const transferCount = searchParams.get("transfer");

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

  const filteredByTransfer = filteredByCarriers.filter(({ flight }) => {
    switch (transferCount) {
      case "1":
        return calculateTransfer(flight.legs) === 2;
      case "0":
        return calculateTransfer(flight.legs) === 0;
      default:
        return flight;
    }
  });

  return (
    <Flex padding="5">
      <Box width="15%" marginRight="2rem">
        <Filters flights={filteredByPrice} />
      </Box>
      <VStack width="65%" alignItems="center">
        <Box width="80%">
          {filteredByTransfer
            .slice(
              0,
              filteredByTransfer.length < parseInt(showCount) - 1
                ? filteredByTransfer.length
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
        {filteredByTransfer.length > parseInt(showCount) && (
          <Button
            width="20%"
            onClick={() => {
              const newParams = searchParams.set(
                "show-count",
                parseInt(showCount) + showCountStep > filteredByTransfer.length
                  ? filteredByTransfer.length.toString()
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
