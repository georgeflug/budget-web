export type Transaction = {
  recordId: number,
  version: number,
  createdAt: Date,
  modifiedAt: Date,
  postedDate: Date,
  account: string,
  postedDescription: string,
  isSplit: boolean,
  amount: number,
  category: string,
  notes: string,
}
