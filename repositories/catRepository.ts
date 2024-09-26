import axios from 'axios'

export const getRandomCat = async (): Promise<string> => {
  const response = await axios.get('https://api.thecatapi.com/v1/images/search')
  return response.data[0].url
};
