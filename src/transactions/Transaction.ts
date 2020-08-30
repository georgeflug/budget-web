export type TransactionSplit = {
  amount: number,
  budget: string,
  description: string
}

export type Transaction = {
  recordId: number,
  version: number,
  createdAt: string, // "2019-07-02T00:00:00.000Z"
  account: string, //"Checking",
  pending: boolean,
  plaidId: string, // "qDwqpr3Re9tMx6bMQVk1hwxEVKPVRauJXPzBz",
  postedDate: string, // "2019-07-02T00:00:00.000Z"
  postedDescription: string,
  splits: TransactionSplit[],
  totalAmount: 2156.12
}