import { Disclosure } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import DropdownCart from "./common/DropdownCart";
import Link from "next/link";
import LoginAvatar from "./common/LoginAvatar";
import LogoutButton from "./common/LogoutButton";
import { useCustomer } from "@/context/CustomerContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Search from "./Search";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { currentCustomer, logout } = useCustomer();
  const [navigation, setNavigation] = useState([
    { name: "Trang chủ", href: "/", current: true },
    { name: "Thông tin cá nhân & Giỏ hàng", href: "/checkout", current: false },
    { name: "Tình trạng đơn hàng", href: "/orderSumary", current: false },
  ]);
  const pathname = usePathname();

  useEffect(() => {
    setNavigation((nav) => {
      return nav.map((item) =>
        item.href !== pathname
          ? { ...item, current: false }
          : { ...item, current: true }
      );
    });
  }, [pathname]);

  return (
    <Disclosure as="header" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="relative z-10 flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
              </div>
              <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                <Search />
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:space-x-2 lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                <DropdownCart />
                {/* Profile dropdown */}
                {currentCustomer ? <LogoutButton /> : <LoginAvatar />}
              </div>
            </div>
            <nav
              className="hidden lg:flex lg:space-x-8 lg:py-2"
              aria-label="Global"
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                    "rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                    "block rounded-md py-2 px-3 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              {!currentCustomer && (
                <Link
                  href={"/login"}
                  className={classNames(
                    "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                    "block rounded-md py-2 px-3 text-base font-medium"
                  )}
                >
                  Đăng Nhập
                </Link>
              )}
              {currentCustomer && (
                <button
                  onClick={() => logout()}
                  className={classNames(
                    "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                    "block rounded-md py-2 px-3 text-base font-medium"
                  )}
                >
                  Đăng xuất
                </button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
