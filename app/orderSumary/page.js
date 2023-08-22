"use client";
import Layouts from "@/components/Layouts";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useCustomer } from "@/context/CustomerContext";
import { useOrder } from "@/context/OrderContext";
import { getCurrentCustomer } from "@/utils/getCurrentCustomer";
import _ from "lodash";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const products = [
  {
    id: 1,
    name: "Nomad Tumbler",
    description:
      "This durable and portable insulated tumbler will keep your beverage at the perfect temperature during your next adventure.",
    href: "#",
    price: "35.00",
    status: "Trạng thái đơn hàng",
    step: 1,
    items: [
      {
        _id: "abc1",
        name: "trà sen vàng",
        quantity: 2,
        price: "20.000",
      },
      {
        _id: "abc2",
        name: "cà phê sữa",
        quantity: 1,
        price: "20.000",
      },
      {
        _id: "abc3",
        name: "cà phê đen",
        quantity: 4,
        price: "20.000",
      },
      {
        _id: "abc4",
        name: "coca cola",
        quantity: 2,
        price: "20.000",
      },
      {
        _id: "abc5",
        name: "tà tưa socola",
        quantity: 2,
        price: "20.000",
      },
    ],
    date: "March 24, 2021",
    datetime: "2021-03-24",
    address: ["20 trần phú", "Lộc thọ", "Nha trang"],
    email: "f•••@example.com",
    note: "mì cay hs cấp 2, mì bò cấp 5.",
    phone: "0367219606",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-01.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
  {
    id: 2,
    name: "Minimalist Wristwatch",
    description:
      "This contemporary wristwatch has a clean, minimalist look and high quality components.",
    href: "#",
    price: "149.00",
    status: "Shipped",
    step: 0,
    items: [
      {
        _id: "abc1",
        name: "trà sen vàng",
        quantity: 2,
        price: "20.000",
      },
      {
        _id: "abc2",
        name: "cà phê sữa",
        quantity: 1,
        price: "20.000",
      },
      {
        _id: "abc3",
        name: "cà phê đen",
        quantity: 4,
        price: "20.000",
      },
      {
        _id: "abc4",
        name: "coca cola",
        quantity: 2,
        price: "20.000",
      },
      {
        _id: "abc5",
        name: "tà tưa socola",
        quantity: 2,
        price: "20.000",
      },
    ],
    date: "March 23, 2021",
    datetime: "2021-03-23",
    address: ["30 tân hải", "Vĩnh trường", "Nha trang"],
    email: "f•••@example.com",
    note: "cho e nhiều rau ít cay nhé.",
    phone: "0367219606",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-02.jpg",
    imageAlt:
      "Arm modeling wristwatch with black leather band, white watch face, thin watch hands, and fine time markings.",
  },
  // More products...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OrderSumary() {
  const { currentCustomer } = useCustomer();
  const router = useRouter();
  const { orders } = useOrder();

  const renderOrder = (items) => {
    const chunks = _.chunk(items, Math.ceil(items.length / 2)).slice(0, 2);

    let ordinalNumber = 0;

    return chunks.map((chunk, index) => {
      return (
        <div key={index}>
          {chunk.map((item) => {
            ordinalNumber++;
            return (
              <>
                <div key={item._id} className="flex justify-between">
                  <p className="text-base">{`${
                    ordinalNumber < 10 ? `0${ordinalNumber}` : ordinalNumber
                  }. ${item.name} x ${item.quantity}`}</p>
                  <span className="text-base">40.000đ</span>
                </div>
                <p className="ml-4 text-xs text-gray-500">
                  *Lưu ý : thêm trân châu
                </p>
              </>
            );
          })}
        </div>
      );
    });
  };

  if (orders.length === 0)
    return (
      <Layouts>
        <div className="min-h-screen">
          <p>
            Đơn hàng của bạn đang trống , vui lòng đặt hàng hoặc đăng nhập để
            xem lịch sử đơn hàng!
          </p>
        </div>
      </Layouts>
    );

  return (
    <Layouts>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl pt-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* Products */}
          <div className="mt-6">
            <h2 className="sr-only">Products purchased</h2>

            <div className="space-y-8">
              {products.map((product) => (
                <div key={product.id}>
                  <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
                    <div className="flex sm:items-baseline sm:space-x-4">
                      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Đơn hàng #54879
                      </h1>
                    </div>
                    <p className="text-sm text-gray-600">
                      Đặt hàng vào{" "}
                      <time
                        dateTime="2021-03-22"
                        className="font-medium text-gray-900"
                      >
                        20-08-2023
                      </time>
                    </p>
                  </div>
                  <div className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                    <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                      <div className=" lg:col-span-7">
                        <div className="mt-6 sm:mt-0">
                          <div className="w-full grid grid-cols-1 sm:grid-cols-2 sm:gap-4 text-sm">
                            {renderOrder(product.items)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 lg:col-span-5 lg:mt-0">
                        <dl className="grid grid-cols-2 gap-x-6 text-sm">
                          <div>
                            <dt className="font-medium text-gray-900">
                              Hóa đơn
                            </dt>

                            <dd className="mt-2 flex-column text-black-400">
                              <p>Phí ship: 0đ</p>
                              <p>Phụ phí (thời tiết xấu): 8.000đ</p>
                              <h4 className="font-medium">
                                Tổng đơn hàng: 128.000đ
                              </h4>
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-900">
                              Địa chỉ giao hàng
                            </dt>
                            <dd className="mt-3 space-y-3 text-gray-500">
                              <span>{product.address[0]}, </span>
                              <span>{product.address[1]}, </span>
                              <span>{product.address[2]}</span>
                              <p>{product.phone}</p>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8">
                      <h4 className="sr-only">Status</h4>
                      <p className="text-sm font-medium text-gray-900">
                        Trạng thái đơn hàng
                      </p>
                      <div className="mt-6" aria-hidden="true">
                        <div className="overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-indigo-600"
                            style={{
                              width: `calc((${product.step} * 2 + 1) / 8 * 100%)`,
                            }}
                          />
                        </div>
                        <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                          <div className="text-indigo-600">Đã đặt hàng</div>
                          <div
                            className={classNames(
                              product.step > 0 ? "text-indigo-600" : "",
                              "text-center"
                            )}
                          >
                            Đang xử lý
                          </div>
                          <div
                            className={classNames(
                              product.step > 1 ? "text-indigo-600" : "",
                              "text-center"
                            )}
                          >
                            Đang vận chuyển
                          </div>
                          <div
                            className={classNames(
                              product.step > 2 ? "text-indigo-600" : "",
                              "text-right"
                            )}
                          >
                            Đã giao hàng
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
}
