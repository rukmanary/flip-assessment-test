const searchTransactions = (item: any, query: string): boolean => {
  return (
    item.amount.toString().includes(query) ||
    item.beneficiary_bank.toLowerCase().includes(query) ||
    item.beneficiary_name.toLowerCase().includes(query) ||
    item.sender_bank.toLowerCase().includes(query)
  );
};

const sortByAscendingName = (data: Array<any>) => {
  return [...data].sort((a, b) =>
    a.beneficiary_name.localeCompare(b.beneficiary_name, 'id-ID'),
  );
};

const sortByDescendingName = (data: Array<any>) => {
  return [...data].sort((a, b) =>
    b.beneficiary_name.localeCompare(a.beneficiary_name, 'id-ID'),
  );
};

const sortByNewestDate = (data: Array<any>) => {
  return [...data].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
};

const sortByOldestDate = (data: Array<any>) => {
  return [...data].sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
};

export {
  searchTransactions,
  sortByAscendingName,
  sortByDescendingName,
  sortByNewestDate,
  sortByOldestDate,
};
