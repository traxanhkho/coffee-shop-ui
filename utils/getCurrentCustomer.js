import axios from "axios";

export async function getCurrentCustomer(jwt) {
  try {
    const { data: currentUser } = await axios.get(
      "http://localhost:5000/api/customers/me",
      {
        headers: {
          "x-auth-token": jwt,
        },
      }
    );
  
    return currentUser;
  } catch (error) {
    console.error(error); 
  }
  
}
