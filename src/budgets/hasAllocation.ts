import {budgetAllocations} from "./budget-allocations";

export function hasAllocation(category: string) {
  return budgetAllocations.some(allocation => allocation.category === category);
}
