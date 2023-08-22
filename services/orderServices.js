import axios from "axios";

export async function getOrdersByCustomer() {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/orders/getOrdersByCustomer",
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
