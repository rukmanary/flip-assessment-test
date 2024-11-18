const transformObjectToArray = <T, R = T>(data: Record<string, T>): R[] => {
  return Object.entries(data).map(([_, value]) => value as unknown as R);
};

export { transformObjectToArray };
