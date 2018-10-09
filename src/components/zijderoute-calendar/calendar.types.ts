export enum VISIBILITY_TYPES {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

export type CalendarEvents = {
  ['YYYY-MM-DD']?: CalendarEvent[],
};

export type CalendarEvent = {
  summary: string,
  location?: string,
  end: {
    dateTime: string,
  },
  start: {
    dateTime: string,
  },
  visibility: VISIBILITY_TYPES,
  color: string,
};

export type DayDescriptor = {
  number: number,
  isToday: boolean,
  isPrevMonth: boolean,
  isNextMonth: boolean,
  formatted: string,
};

export type StoredToken = {
  exp: number,
  token: string,
};
