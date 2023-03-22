export type calculateCashOutNaturalFeeProps = {
    amount: number,
    configData: Record<string, any>,
    date: string,
    transactionHistory: Record<string, any>[] | null,
    userId: number,
};