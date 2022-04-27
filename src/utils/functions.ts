export const weekDayToString = (weekDayNum: number) => {
  if (weekDayNum === 1) return "пн";
  else if (weekDayNum === 2) return "вт";
  else if (weekDayNum === 3) return "ср";
  else if (weekDayNum === 4) return "чт";
  else if (weekDayNum === 5) return "пт";
  else if (weekDayNum === 6) return "сб";
  else if (weekDayNum === 7) return "вс";
  else return null;
};

export const monthToString = (monthNum: number) => {
  if (monthNum === 1) return "янв";
  else if (monthNum === 2) return "фев";
  else if (monthNum === 3) return "мар";
  else if (monthNum === 4) return "апр";
  else if (monthNum === 5) return "май";
  else if (monthNum === 6) return "июн";
  else if (monthNum === 7) return "июл";
  else if (monthNum === 8) return "авг";
  else if (monthNum === 9) return "сен";
  else if (monthNum === 10) return "окт";
  else if (monthNum === 11) return "ноя";
  else if (monthNum === 12) return "дек";
  else return null;
};

export const timeBox = (hours: number, minutes: number) => {
  return (
    (hours.toString().length < 2 ? `0${hours}` : hours) +
    ":" +
    (minutes.toString().length < 2 ? `${minutes}0` : minutes)
  );
};

export const dateBox = (day: number, month: number, weekDay: number) => {
  return day + " " + monthToString(month) + ". " + weekDayToString(weekDay);
};

export const cityAirport = (city: string, airport: string) => {
  return `${city || ''}, ${airport}`;
};

