"use client";
import _ from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getCurrentCustomer } from "@/utils/getCurrentCustomer";
import { useRouter } from "next/navigation";

const CustomerContext = createContext();

function CustomerProvider({ children }) {
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const router = useRouter();

  const getDataFromServer = async () => {
    const token = localStorage.getItem("currentCustomer");
    if (!token) return;

    try {
      const currentCustomer = await getCurrentCustomer(token);
      if (currentCustomer) {
        setCurrentCustomer(currentCustomer);
      }
    } catch (ex) {
      localStorage.removeItem("currentCustomer");
      console.error(ex);
    }
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

  const registerCustomer = async (data, setError) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/customers`,
        data
      );

      if (response.data) {
        router.push("/login");
      }

      return response.data;
    } catch (ex) {
      if (ex.response.status == 400) {
        setError("numberPhone", {
          type: "manual",
          message: "Số điện thoại đã được đăng ký.",
        });
      }
      console.error(ex);
    }
  };

  const signIn = async (data, setError) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/customers/auth`,
        data
      );

      if (response.data) {
        const currentCustomer = await getCurrentCustomer(response.data);
        localStorage.setItem("currentCustomer", response.data);
        setCurrentCustomer(currentCustomer);
        router.push("/");
      }

      return response.data;
    } catch (ex) {
      if (ex.response.status == 404) {
        setError("numberPhone", {
          type: "manual",
          message: "Số điện thoại hoặc mật khẩu không đúng.",
        });
      }
      console.error(ex);
    }
  };

  const logout = () => {
    localStorage.removeItem("currentCustomer");
    setCurrentCustomer(null);
  };

  // Function to set the authenticated user
  const shareValue = {
    setCurrentCustomer,
    currentCustomer,
    signIn,
    logout,
    registerCustomer,
  };

  return (
    <CustomerContext.Provider value={shareValue}>
      {children}
    </CustomerContext.Provider>
  );
}

export const useCustomer = () => useContext(CustomerContext);

export default CustomerProvider;
