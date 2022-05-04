import {
  Box,
  Checkbox,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { TFlightInfo, TFullFlight } from "../types";

export const Filters = ({ flights }: { flights: TFullFlight[] }) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const uniqCarriers = (flights: TFlightInfo[]) => {
    return flights.reduce((acc, { carrier, price }) => {
      if (acc[carrier.uid]) {
        if (parseInt(acc[carrier.uid].price) < parseInt(price.total.amount))
          return acc;
      }
      return {
        ...acc,
        [carrier.uid]: {
          price: price.total.amount,
          caption: carrier.caption,
        },
      };
    }, {});
  };

  const selectedCarriersUids = searchParams.getAll("carrier");
  const selectedTransfer = searchParams.getAll("transfer");

  return (
    <Box>
      <Box fontWeight="bold">Сортировать</Box>
      <RadioGroup
        onChange={(sort) => {
          searchParams.set("sort", sort);
          setSearchParams(searchParams);
        }}
        defaultValue="1"
        display="flex"
        flexDirection="column"
      >
        <Radio value="price-asc" marginTop={2}>
          <Text fontSize="smaller">- по возрастанию цены</Text>
        </Radio>
        <Radio value="price-desc">
          <Text fontSize="smaller"> - по убываю цене</Text>
        </Radio>
        <Radio value="flight-duration">
          <Text fontSize="smaller"> - по времени в пути</Text>
        </Radio>
      </RadioGroup>
      <Flex flexDirection="column" marginTop={8}>
        <Box fontWeight="bold">Фильтровать</Box>
        <Checkbox
          isChecked={searchParams.getAll("transfer").includes("1")}
          onChange={() => {
            if (selectedTransfer.includes("1")) {
              searchParams.delete("transfer");
              selectedTransfer.forEach((num) => {
                if (num !== "1") {
                  searchParams.append("transfer", num);
                }
              });
            } else {
              searchParams.set("transfer", "1");
            }
            setSearchParams(searchParams);
          }}
          marginTop={2}
        >
          <Text fontSize="smaller"> - 1 пересадка</Text>
        </Checkbox>
        <Checkbox
          isChecked={selectedTransfer.includes("0")}
          onChange={() => {
            if (selectedTransfer.includes("0")) {
              searchParams.delete("transfer");
              selectedTransfer.forEach((num) => {
                if (num !== "0") {
                  searchParams.append("transfer", num);
                }
              });
            } else {
              searchParams.append("transfer", "0");
            }
            setSearchParams(searchParams);
          }}
        >
          <Text fontSize="smaller"> - без пересадок</Text>
        </Checkbox>
      </Flex>
      <Flex flexDirection="column" marginTop={8}>
        <Box fontWeight="bold" marginBottom={2}>
          Цена
        </Box>
        <Flex flexDirection="row">
          <Box fontSize="s">От</Box>
          <Input
            defaultValue={searchParams.get("min-price")}
            onBlur={(event: ChangeEvent<HTMLInputElement>) => {
              searchParams.set("min-price", event.target.value.toString());
              setSearchParams(searchParams);
            }}
            size="xs"
            placeholder="0"
            marginLeft="7px"
          ></Input>
        </Flex>
        <Flex flexDirection="row" marginTop={4}>
          <Text fontSize="s">До</Text>
          <Input
            defaultValue={searchParams.get("max-price")}
            onBlur={(event: ChangeEvent<HTMLInputElement>) => {
              searchParams.set("max-price", event.target.value.toString());
              setSearchParams(searchParams);
            }}
            size="xs"
            placeholder="1000000"
            marginLeft={1}
          ></Input>
        </Flex>
      </Flex>
      <Flex flexDirection="column" marginTop={8}>
        <Box fontWeight="bold" marginBottom={2}>
          Авиакомпания
        </Box>
        {Object.entries(
          uniqCarriers(flights.map((flight) => flight.flight))
        ).map(([uid, { price, caption }]) => (
          <Checkbox
            isChecked={selectedCarriersUids.includes(uid)}
            onChange={() => {
              if (selectedCarriersUids.includes(uid)) {
                searchParams.delete("carrier");
                selectedCarriersUids.forEach((selectedCarrierUid) => {
                  if (selectedCarrierUid != uid) {
                    searchParams.append("carrier", selectedCarrierUid);
                  }
                });
              } else {
                searchParams.append("carrier", uid);
              }
              setSearchParams(searchParams);
            }}
          >
            <Text fontSize="xs">
              {" "}
              - {uid} {caption} от {price} р.
            </Text>
          </Checkbox>
        ))}
      </Flex>
    </Box>
  );
};
