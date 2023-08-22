"use client";
// components/ProtectedRoute.js
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentCustomer } from "@/utils/getCurrentCustomer";
import Layouts from "./Layouts";
import { useCustomer } from "@/context/CustomerContext";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { currentCustomer, checkCustomerAuthentication } = useCustomer();
  const router = useRouter();

  if (loading) {
    return (
      <Layouts>
        <div className="min-h-screen">
          <p>Loading...</p>
        </div>
      </Layouts>
    );
  }


  const handleRouterChange = async () => {
    const customerIsAuthenticated = await checkCustomerAuthentication();
    if (!customerIsAuthenticated) {
      router.replace("/protectPage");
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRouterChange();

  }, []);

  return children;
};

export default ProtectedRoute;
