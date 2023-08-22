import { getCurrentCustomer } from "./getCurrentCustomer";

export const checkAuthentication = async () => {
  let token = "";
  token = localStorage.getItem("currentCustomer") || "";
  if (!token) return false;

  try {
    const data = await getCurrentCustomer(token);
    if (data) return true;
  } catch (ex) {
    console.log(ex);
    return false;
  }
};
