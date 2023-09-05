"use client";
import _ from "lodash";
import { getCategories } from "@/services/categorySevices";
import { getProducts, getProductsByCategory } from "@/services/productServices";
import { createContext, useContext, useEffect, useState } from "react";
import { getLocationData } from "@/utils/getLocationData";

const ProductContext = createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = useState();
  const [productSelected, setProductSelected] = useState(null);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [openProductModal, setOpenProductModal] = useState(false);

  useEffect(() => {
    const getDataFromServer = async () => {
      setCategories(await getCategories());
      setLocationData(await getLocationData());

      const storedCart = localStorage.getItem("shoppingCart");
      if (storedCart) {
        setShoppingCart(JSON.parse(storedCart));
      }
    };
    getDataFromServer();
  }, []);

  useEffect(() => {
    const updateProduct = async () => {
      try {
        if (categorySelected)
          setProducts(await getProductsByCategory(categorySelected._id));
        else setProducts(await getProducts());
      } catch (error) {
        console.error(error);
      }
    };

    updateProduct();
  }, [categorySelected, categories]);

  const cleanShoppingCart = () => {
    localStorage.removeItem("shoppingCart");
    setShoppingCart([]);
  };

  // Function to set the authenticated user
  const productValue = {
    categorySelected,
    products,
    setProducts,
    productSelected,
    categories,
    setCategories,
    shoppingCart,
    locationData,
    setShoppingCart,
    setCategorySelected,
    setProductSelected,
    cleanShoppingCart,
    openProductModal,
    setOpenProductModal,
  };

  return (
    <ProductContext.Provider value={productValue}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);

export default ProductProvider;
