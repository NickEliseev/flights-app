import { Box, Img } from "@chakra-ui/react";

type HeaderPropsType = {
  uid: string;
  caption: string;
  price: string;
};

export const Header = ({ uid, caption, price }: HeaderPropsType) => {
  return (
    <Box
      background="primary"
      display="flex"
      justifyContent="space-between"
      color="white"
      padding="2"
      height="50px"
    >
      <Img
        height="100%"
        src={`https://daisycon.io/images/airline/?width=100&height=75&color=0087c9&iata=${uid}`}
        alt={`${uid} ${caption}`}
      />
      <Box display="flex" flexDirection="column">
        <Box
          textAlign="right"
          fontWeight="bold"
          fontSize="large"
          letterSpacing="1.5px"
        >
          {price} ₽
        </Box>
        <Box fontSize="xs" marginTop="-1">
          Стоимость для одного взрослого пассажира
        </Box>
      </Box>
    </Box>
  );
};
