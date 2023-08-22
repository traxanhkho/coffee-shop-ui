import Link from "next/link";
import React from "react";
import ShoppingCartNotiacation from "./ShoppingCartNotiacation";
import { useProduct } from "@/context/ProductContext";
import ShoppingCartEmpty from "../ShoppingCartEmpty";

function ProductCard() {
  const { shoppingCart } = useProduct();

  return (
    <>
      <div className="flex justify-between align-center">
        <h2 className="font-semibold">Các món đã chọn</h2>
        <Link
          href="/checkout"
          className="inline-block rounded-md shadow px-2 py-1 bg-c-orange-200 font-semibold hover:opacity-80"
        >
          Thanh toán
        </Link>
      </div>
      <span className="block h-[2px] w-12 rounded-md mt-2 bg-orange-400"></span>
      {!shoppingCart.length && <ShoppingCartEmpty />}
      {shoppingCart.map((cartItem, index) => (
        <ShoppingCartNotiacation key={index} cartItem={cartItem} />
      ))}
    </>
  );
}

export default ProductCard;
