import {budgetAllocations} from "./budget-allocations";
import { chain } from "lodash";

export function hasAllocation(category: string) {
  return budgetAllocations.some(allocation => allocation.category === category);
}

export function getAllocation(category: string) {
  return chain(budgetAllocations)
    .filter(allocation => allocation.category === category)
    .maxBy(allocation => allocation.startDate)
    .value()
    .amount;
}
