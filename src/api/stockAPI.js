const BASE_URL = "http://20.244.56.144/evaluation-service";

export const fetchAllStocks = async () => {
  const res = await fetch(`${BASE_URL}/stocks`);
  return res.json();
};

export const fetchStockPrices = async (ticker, minutes) => {
  const url = minutes
    ? `${BASE_URL}/stocks/${ticker}?minutes=${minutes}`
    : `${BASE_URL}/stocks/${ticker}`;
  const res = await fetch(url);
  return res.json();
};
