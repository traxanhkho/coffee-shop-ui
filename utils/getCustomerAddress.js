export function getCustomerAddress(address) {
  let addressNames = [];
  const addressKeys = Object.keys(address);

  addressKeys.forEach((key) => {
    const value = address[key];
    if (value && key !== "street") {
      addressNames.push(value.name);
    } else {
      addressNames.push(value);
    }
  });

  let addressNamesString = addressNames.join(", ");
  return addressNamesString;
}
