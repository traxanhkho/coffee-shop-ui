import axios from "axios";

export async function getCategories() {
  try {
    const { data } = await axios.get('http://localhost:5000/api/genres');
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCategory(genreId) {
  try {
    const { data } = await axios.get(genreUrl(genreId));
    return data;
  } catch (error) {
    console.error(error);
  }
}
