import axios from "axios";

export async function getCurrentCustomer(jwt) {
  try {
    const { data: currentUser } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_KEY}/customers/me`,
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
