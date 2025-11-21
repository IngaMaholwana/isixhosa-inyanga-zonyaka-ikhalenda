export const xhosaDays = [
  { english: "Sunday", xhosa: "iCawa", meaning: "Church Day" },
  { english: "Monday", xhosa: "uMvulo", meaning: "The Opening (of the work week)" },
  { english: "Tuesday", xhosa: "uLwesibini", meaning: "The Second (day)" },
  { english: "Wednesday", xhosa: "uLwesithathu", meaning: "The Third (day)" },
  { english: "Thursday", xhosa: "uLwesine", meaning: "The Fourth (day)" },
  { english: "Friday", xhosa: "uLwesihlanu", meaning: "The Fifth (day)" },
  { english: "Saturday", xhosa: "uMgqibelo", meaning: "The Closing/Ending (of the work week)" },
];

export const xhosaMonths = [
  { english: "January", xhosa: "EyoMqungu" },
  { english: "February", xhosa: "EyoMdumba" },
  { english: "March", xhosa: "EyoKwindla" },
  { english: "April", xhosa: "UTshazimpuzi" },
  { english: "May", xhosa: "UCanzibe" },
  { english: "June", xhosa: "Isilimela" },
  { english: "July", xhosa: "EyeKhala" },
  { english: "August", xhosa: "EyeThupha" },
  { english: "September", xhosa: "EyoMsintsi" },
  { english: "October", xhosa: "EyeDwarha" },
  { english: "November", xhosa: "EyeNkanga" },
  { english: "December", xhosa: "EyoMnga" },
];

export const xhosaSeasons = [
  { english: "Autumn", xhosa: "eyoKwindla", months: [2, 3, 4] },
  { english: "Winter", xhosa: "uBusika", months: [5, 6, 7] },
  { english: "Spring", xhosa: "iNtlakohlaza", months: [8, 9, 10] },
  { english: "Summer", xhosa: "uHlobo", months: [11, 0, 1] },
];

export const xhosaTerms = {
  day: "Usuku",
  days: "Iintsuku",
  month: "Inyanga",
  months: "Iinyanga",
  year: "Unyaka",
  years: "Iminyaka",
  today: "Namhlanje",
  yesterday: "Izolo",
  tomorrow: "Ngomso",
  holiday: "Usuku Olumisiweyo",
  newYear: "Unyaka Omtsha",
};

export const getSeasonForMonth = (monthIndex: number): typeof xhosaSeasons[0] | undefined => {
  return xhosaSeasons.find(season => season.months.includes(monthIndex));
};

export const getDayName = (dayIndex: number): string => {
  return xhosaDays[dayIndex].xhosa;
};

export const getMonthName = (monthIndex: number): string => {
  return xhosaMonths[monthIndex].xhosa;
};
