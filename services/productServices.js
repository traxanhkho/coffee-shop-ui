import axios from "axios";

export async function getProductsByCategory(category) {
  try {
    if(!category) return [] ; 

    const response = await axios.get(`http://localhost:5000/api/products?category=${category}`);
    // setProducts(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}


export const getProducts = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/products");
    return data;
  } catch (error) {
    console.error(error);
  }
};


