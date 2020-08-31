import {endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths} from "date-fns";

export type DateRange = {
  start: Date,
  end: Date,
}

export type DateOption = {
  id: string,
  displayName: string,
  getRange: () => DateRange
}

export const dateOptions: DateOption[] = [
  {
    id: 'thisMonth',
    displayName: 'This month',
    getRange: () => ({
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date()),
    })
  },
  {
    id: 'lastMonth',
    displayName: 'Last month',
    getRange: () => ({
      start: startOfMonth(subMonths(new Date(), 1)),
      end: endOfMonth(subMonths(new Date(), 1)),
    })
  },
  {
    id: 'thisYear',
    displayName: 'This year',
    getRange: () => ({
      start: startOfYear(new Date()),
      end: endOfYear(new Date()),
    })
  },
  {
    id: 'allTime',
    displayName: 'All Time',
    getRange: () => ({
      start: new Date(0),
      end: new Date(3000, 0, 1),
    })
  },
];
