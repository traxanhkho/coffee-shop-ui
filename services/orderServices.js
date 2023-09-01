import axios from "axios";

export async function getOrdersByCustomer() {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_KEY}/orders/getOrdersByCustomer`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("currentCustomer"),
        },
      }
    );
    return data;
  } catch (ex) {
    console.error(ex);
  }
}
