export const calculateTotalPrice = (product) => {
  let totalPrice = product.price * product.productQuantity;

  if (product.size) {
    totalPrice += product.size.price;
  }

  if (product.toppings) {
    product.toppings.forEach((topping) => {
      if (topping.quantity) totalPrice += topping.price * topping.quantity;
    });
  }

  return totalPrice;
};
