const API_BASE_URL = "https://your-backend-url.herokuapp.com/api/v1/stocks";

export const fetchStockData = async (symbol) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};
