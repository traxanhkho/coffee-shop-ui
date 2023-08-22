export function addItemToShoppingCart(cartItem) {
  localStorage.setItem("shoppingCart", JSON.stringify(cartItem));
}

export const resetShoppingCart = () => {
  localStorage.removeItem("shoppingCart");
};
