import axios from "axios";

export const getLocationData = async () => {
  try {
    
    const { data } = await axios.get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    );

    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};


// export const getLocationDetails = (locationData) =>{
//     const 
// }