import axios from "axios";

export async function getCategories() {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/genres`);
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
