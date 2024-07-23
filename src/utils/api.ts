import axios from 'axios';

const BASE_URL = 'https://akabab.github.io/superhero-api/api';

// Fetch all superheroes
export const fetchAllSuperheroes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all.json`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching all superheroes:', error);
    return [];
  }
};
