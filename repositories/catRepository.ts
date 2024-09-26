import axios from 'axios'

export const getRandomCat = async (): Promise<string> => {
  const response = await axios.get('/api/images/search')
  return response.data[0].url
};
