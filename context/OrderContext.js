"use client";
import _ from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import { useCustomer } from "./CustomerContext";
import { getOrdersByCustomer } from "@/services/orderServices";

const OrderContext = createContext();

function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const { currentCustomer } = useCustomer();

  const getDataFromServer = async () => {
    if (currentCustomer) {
      setOrders(await getOrdersByCustomer());
    } else {
      setOrders([]);
    }
  };

  useEffect(() => {
    getDataFromServer();
  }, [currentCustomer]);

  // Function to set the authenticated user
  const dataShare = {
    orders,
    setOrders,
  };

  return (
    <OrderContext.Provider value={dataShare}>{children}</OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);

export default OrderProvider;
