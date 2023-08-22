import React from "react";
import ProductProvider from "./ProductContext";
import CustomerProvider from "./CustomerContext";
import OrderProvider from "./OrderContext";

function DataProvider({ children }) {
  return (
    <ProductProvider>
      <CustomerProvider>
        <OrderProvider>{children}</OrderProvider>
      </CustomerProvider>
    </ProductProvider>
  );
}

export default DataProvider;
