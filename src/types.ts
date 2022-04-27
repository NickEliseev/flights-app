export type TPassengerPrice = {
    total: {
      amount: string;
      currency: string;
      currencyCode: string;
    };
    passengerType: {
      uid: string;
      caption: string;
    };
    singlePassengerTotal: {
      amount: string;
      currency: string;
      currencyCode: string;
    };
    passengerCount: number;
    tariff: {
      amount: string;
      currency: string;
      currencyCode: string;
    };
    feeAndTaxes: {
      amount: string;
      currency: string;
      currencyCode: string;
    };
  };
  
  export type TPrice = {
    total: {
      amount: string;
      currency: string;
      currencyCode: string;
    };
    totalFeeAndTaxes: {
      amount: string;
      currency: string;
      currencyCode: string;
    };
    rates: {
      totalUsd: {
        amount: string;
        currencyCode: string;
      };
      totalEur: {
        amount: string;
        currencyCode: string;
      };
    };
    passengerPrices: Array<TPassengerPrice>;
  };
  
  export type TCarrier = {
    uid: string;
    caption: string;
    airlineCode: string;
  };
  
  export type TServicesStauses = unknown;
  
  export type TSegment = {
    classOfServiceCode: string;
    classOfService: {
      uid: string;
      caption: string;
    };
    departureAirport: {
      uid: string;
      caption: string;
    };
    departureCity: {
      uid: string;
      caption: string;
    };
    aircraft: {
      uid: string;
      caption: string;
    };
    travelDuration: number;
    arrivalCity: {
      uid: string;
      caption: string;
    };
    arrivalDate: string;
    flightNumber: string;
    techStopInfos: Array<unknown>;
    departureDate: string;
    stops: number;
    servicesDetails: {
      freeCabinLuggage: {};
      paidCabinLuggage: {};
      tariffName: string;
      fareBasis: {
        ADULT: string;
      };
      freeLuggage: {
        ADULT: {
          nil: boolean;
        };
      };
      paidLuggage: {};
    };
    airline: {
      uid: string;
      caption: string;
      airlineCode: string;
    };
    starting: boolean;
    arrivalAirport: {
      uid: string;
      caption: string;
    };
    operatingAirline: {
      uid: string;
      caption: string;
      airlineCode: string;
    };
  };
  
  export type TLeg = {
    duration: number;
    segments: Array<TSegment>;
  };
  
  export type TFlightInfo = {
    carrier: TCarrier;
    price: TPrice;
    servicesStatuses: TServicesStauses;
    legs: Array<TLeg>;
    //   airlineAlliance:
    //   exchange:
    //   isTripartiteContractDiscountApplied:
    //   international:
    //   seats:
    //   refund:
  };
  
  // Полный маршрут туда и обратно:
  export type TFullFlight = {
    hasExtendedFare: boolean;
    flight: TFlightInfo;
    flightToken: string;
  };
  
  export type TBestPrices = unknown;
  
  // Результаты поиска:
  export type TSerachResults = {
    flights: Array<TFullFlight>;
    bestPrices: TBestPrices;
  };