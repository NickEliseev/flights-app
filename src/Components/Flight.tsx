import { Box, Text, chakra } from "@chakra-ui/react";
import { TSegment } from "../types";
import { timeBox, dateBox, cityAirport } from "../utils/functions";
import { DateSlot } from "./DateSlot";
import { TimeSlot } from "./TimeSlot";

export type TFlightProps = { duration: number; segments: Array<TSegment> };

export const Flight = ({ duration, segments }: TFlightProps) => {
  const departurePoint = segments[0];
  const departureDate = new Date(departurePoint.departureDate);
  const departureHours = departureDate.getHours();
  const departureMinutes = departureDate.getMinutes();
  const departureDay = departureDate.getDate();
  const departureMonth = departureDate.getMonth();
  const departureWeekDay = departureDate.getDay();

  const changeCount = segments.length - 1;

  const arrivalPoint = segments[changeCount];
  const arrivalDate = new Date(arrivalPoint.arrivalDate);
  const arrivalHours = arrivalDate.getHours();
  const arrivalMinutes = arrivalDate.getMinutes();
  const arrivalDay = arrivalDate.getDate();
  const arrivalMonth = arrivalDate.getMonth();
  const arrivalWeekDay = arrivalDate.getDay();
  const { departureCity, departureAirport } = departurePoint;

  console.log(arrivalPoint);

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        justifyContent="normal"
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={2}
      >
        <Text fontWeight="bold">
          {cityAirport(departureCity.caption, departureAirport.caption)}
        </Text>
        <Text
          color="primary"
          marginLeft={1}
          marginRight={1}
          fontWeight="semibold"
        >
          ({departurePoint.departureAirport.uid}) →
        </Text>

        <Text fontWeight="bold" marginLeft={1}>
          {cityAirport(
            arrivalPoint.arrivalCity?.caption,
            arrivalPoint.arrivalAirport?.caption
          )}
        </Text>
        <Text color="primary" marginLeft={1} fontWeight="semibold">
          ({arrivalPoint.arrivalAirport.uid})
        </Text>
      </Box>
      <hr />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        paddingTop={2}
      >
        <Box>
          <TimeSlot>{timeBox(departureHours, departureMinutes)}</TimeSlot>
          <DateSlot>
            {dateBox(departureDay, departureMonth, departureWeekDay)}
          </DateSlot>
        </Box>
        <Box>
          <Box display="inline" fontWeight="bold" lineHeight="2rem">
            ◷ {Math.floor(duration / 60)} ч {duration % 60} мин
          </Box>
        </Box>
        <Box>
          <DateSlot>
            {dateBox(arrivalDay, arrivalMonth, arrivalWeekDay)}
          </DateSlot>
          <TimeSlot>{timeBox(arrivalHours, arrivalMinutes)}</TimeSlot>
        </Box>
      </Box>
      <Box
        backgroundColor="black"
        height="1px"
        marginY="4"
        marginX="10"
        position="relative"
        display="flex"
        justifyContent="center"
      >
        {changeCount ? (
          <Box
            display="inline-block"
            color="accent"
            position="absolute"
            paddingX="2"
            background="white"
            marginTop="-3"
          >
            {changeCount} пересадка
          </Box>
        ) : null}
      </Box>
      <Box marginLeft={2}>
        Рейс выполняет: {departurePoint.airline.uid}{" "}
        {departurePoint.airline.caption}
      </Box>
    </Box>
  );
};
