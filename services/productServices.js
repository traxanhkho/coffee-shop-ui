import axios from "axios";

export async function getProductsByCategory(category) {
  try {
    if(!category) return [] ; 

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/products/getProductByGenreId/${category}`);
    // setProducts(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export const getProducts = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/products`);
    return data;
  } catch (error) {
    console.error(error);
  }
};


