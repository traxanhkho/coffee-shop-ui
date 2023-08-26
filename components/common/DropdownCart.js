import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import ProductCard from "./ProductCard";
import { useProduct } from "@/context/ProductContext";

export default function DropdownCart() {
  const { shoppingCart } = useProduct();
  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="relative flex-shrink-0 rounded-full border-2 border-orange-400 bg-white p-1 text-black-400 hover:text-gray-500 ">
          <span className="sr-only">View notifications</span>
          <ShoppingCartIcon className="h-6 w-6" />
          {shoppingCart.length !== 0 && (
            <span className="flex absolute -top-[8px] right-[-8px] w-5 h-5 rounded-full bg-orange-400">
              <span className="m-auto text-white text-sm">
                {shoppingCart.length}
              </span>
            </span>
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute right-0 z-10 mt-2 min-w-[320px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-2 py-4">
            <ProductCard />
          </div>
        </div>
      </Transition>
    </Menu>
  );
}
