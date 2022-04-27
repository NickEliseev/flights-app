import { Box, Button, StackDivider, VStack } from "@chakra-ui/react";
import { TCarrier, TLeg, TPrice } from "../types";
import { Flight } from "./Flight";
import { Header } from "./Header";

type TFlightCardProps = {
  carrier: TCarrier;
  price: TPrice;
  legs: Array<TLeg>;
};

export const FlightCard = ({
  carrier: { uid, caption },
  price,
  legs,
}: TFlightCardProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      padding="4"
    >
      <Header uid={uid} caption={caption} price={price.total.amount} />
      <VStack align="stretch" divider={<StackDivider borderColor="primary" />}>
        {legs.map((leg, i) => {
          return (
            <Flight duration={leg.duration} segments={leg.segments} key={i} />
          );
        })}
      </VStack>
      <Button background="accent" color="white" padding="4" marginTop={2}>
        ВЫБРАТЬ
      </Button>
    </Box>
  );
};
