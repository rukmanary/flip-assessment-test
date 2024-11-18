const searchTransactions = (item: any, query: string): boolean => {
  return (
    item.amount.toString().includes(query) ||
    item.beneficiary_bank.toLowerCase().includes(query) ||
    item.beneficiary_name.toLowerCase().includes(query) ||
    item.sender_bank.toLowerCase().includes(query)
  );
};

export { searchTransactions };
