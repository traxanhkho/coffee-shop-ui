import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import ProductCard from "./ProductCard";

export default function DropdownCart() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex-shrink-0 rounded-full border-2 border-orange-400 bg-white p-1 text-black-400 hover:text-gray-500 ">
          <span className="sr-only">View notifications</span>
          <ShoppingCartIcon className="h-6 w-6" />
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
