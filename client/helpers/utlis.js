export const isSuccess = (n) => {
  return n >= 200 && n < 300;
};

export const isError = (n) => {
  return n >= 400 && n < 500;
};

export const isInternalError = (n) => {
  return n >= 500;
};
