import {firstDate} from "../util/firstDate";

export type BudgetAllocation = {
  category: string,
  amount: number,
  startDate: Date,
}

export const budgetAllocations: BudgetAllocation[] = [
  {
    category: 'Clothes',
    amount: 70,
    startDate: firstDate,
  },
  {
    category: 'Groceries',
    amount: 400,
    startDate: firstDate,
  },
  {
    category: 'Entertainment',
    amount: 150,
    startDate: firstDate,
  },
  {
    category: 'Richie',
    amount: 120,
    startDate: firstDate,
  },
  {
    category: 'Richie',
    amount: 150,
    startDate: new Date(2020, 0, 1),
  },
  {
    category: 'Stef',
    amount: 120,
    startDate: firstDate,
  },
  {
    category: 'Stef',
    amount: 150,
    startDate: new Date(2020, 0, 1),
  },
];
