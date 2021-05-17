import {getAllocated} from "./getRemainingAllocation";
import {firstDate} from "../util/firstDate";
import {addMonths, endOfMonth} from "date-fns";

describe('getAllocated', () => {

  it('should return first month allocation', () => {

    const result = getAllocated('Richie', firstDate);

    expect(result).toEqual(120);
  });

  it('should return first month allocation when we are not looking at first day of the month', () => {

    const result = getAllocated('Richie', endOfMonth(firstDate));

    expect(result).toEqual(120);
  });

  it('should return second month allocation', () => {

    const result = getAllocated('Richie', addMonths(firstDate, 1));

    expect(result).toEqual(240);
  });

  it('should return allocation for first month after amount changed', () => {

    const result = getAllocated('Richie', new Date(2020, 0, 1));

    expect(result).toEqual(16 * 120 + 150);
  });

  it('should return allocation for first month after amount changed when we are looking at last day of month', () => {

    const result = getAllocated('Richie', endOfMonth(new Date(2020, 0, 1)));

    expect(result).toEqual(16 * 120 + 150);
  });

  it('should return allocation for second month after amount changed', () => {

    const result = getAllocated('Richie', new Date(2020, 1, 1));

    expect(result).toEqual(16 * 120 + 300);
  });

});
