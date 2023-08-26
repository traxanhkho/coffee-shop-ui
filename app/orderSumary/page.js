"use client";
import Layouts from "@/components/Layouts";
import Modal from "@/components/common/Modal";
import Post from "@/components/common/Post";
import PriceFormmater from "@/components/common/PriceFormmater";
import { useOrder } from "@/context/OrderContext";
import {
  calculateTotalOrderPrice,
  calculateTotalProductPrice,
} from "@/utils/calculateTotalPriceOrders";

import _ from "lodash";
import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OrderSumary() {
  const { orders } = useOrder();
  const router = useRouter();

  const renderOrder = (products) => {
    const chunks = _.chunk(products, Math.ceil(products.length / 2)).slice(
      0,
      2
    );

    let ordinalNumber = 0;

    return chunks.map((chunk, index) => (
      <div key={index}>
        {chunk.map((product) => {
          ordinalNumber++;
          return (
            <div key={product._id}>
              <div className="flex justify-between items-center">
                <p className="text-base">{`${
                  ordinalNumber < 10 ? `0${ordinalNumber}` : ordinalNumber
                }. ${product.productId.name} x ${product.quantity}`}</p>
                <PriceFormmater
                  priceInVND={calculateTotalProductPrice(product) || 0}
                />
              </div>
              {product.note && (
                <p className="ml-4 text-xs text-gray-500">
                  *Lưu ý : {product.note}
                </p>
              )}
            </div>
          );
        })}
      </div>
    ));
  };

  if (orders.length === 0)
    return (
      <Layouts>
        <Modal onClose={() => router.push("/orderSumary")} />
        <div className="min-h-screen mx-auto  px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
          <p className="text-center">
            Đơn hàng của bạn đang trống , vui lòng đặt hàng hoặc đăng nhập để
            xem lịch sử đơn hàng!
          </p>
        </div>
      </Layouts>
    );

  return (
    <Layouts>
      <Modal onClose={() => router.push("/orderSumary")} />
      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl pt-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* Products */}
          <div className="mt-6">
            <h2 className="sr-only">Products purchased</h2>
            <div className="space-y-8">
              {orders.map((order) => (
                <div key={order._id}>
                  <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
                    <div className="flex sm:items-baseline sm:space-x-4">
                      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Đơn hàng #{order._id}
                      </h1>
                    </div>
                    <div>
                      <Post createdAt={order.createdAt} />
                    </div>
                  </div>
                  <div className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                    <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                      <div className=" lg:col-span-7">
                        <div className="mt-6 sm:mt-0">
                          <dt className="font-medium text-gray-900">
                            Danh sách sản phẩm
                          </dt>
                          <dd className="w-full grid grid-cols-1 sm:grid-cols-2 sm:gap-4 text-sm">
                            {renderOrder(order.products)}
                          </dd>
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
                              <p>Phụ phí (thời tiết xấu): 0đ</p>
                              <h4 className="font-medium">
                                Tổng đơn hàng:{" "}
                                <PriceFormmater
                                  className={"inline"}
                                  priceInVND={
                                    calculateTotalOrderPrice(order) || 0
                                  }
                                />
                              </h4>
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-900">
                              Thông tin giao hàng
                            </dt>
                            <dd className="mt-3 space-y-3 text-gray-500">
                              <span>
                                {
                                  order.orderShippingAddressInformation.address
                                    .city.name
                                }
                                ,{" "}
                              </span>
                              <span>
                                {
                                  order.orderShippingAddressInformation.address
                                    .district.name
                                }
                                ,{" "}
                              </span>
                              <span>
                                {
                                  order.orderShippingAddressInformation.address
                                    .ward.name
                                }
                                ,{" "}
                              </span>
                              <span>
                                {
                                  order.orderShippingAddressInformation.address
                                    .street
                                }
                              </span>
                              <p>
                                số liên hệ:{" "}
                                {
                                  order.orderShippingAddressInformation
                                    .numberPhone
                                }
                              </p>
                              <p>
                                Tên Khách hàng :{" "}
                                {order.orderShippingAddressInformation.name}
                              </p>
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
                              width: `calc((${order.status.step} * 2 + 1) / 8 * 100%)`,
                            }}
                          />
                        </div>
                        <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                          <div className="text-indigo-600">Đã đặt hàng</div>
                          <div
                            className={classNames(
                              order.status.step > 0 ? "text-indigo-600" : "",
                              "text-center"
                            )}
                          >
                            Đang xử lý
                          </div>
                          <div
                            className={classNames(
                              order.status.step > 1 ? "text-indigo-600" : "",
                              "text-center"
                            )}
                          >
                            Đang vận chuyển
                          </div>
                          {order.status.step !== 5 && (
                            <div
                              className={classNames(
                                order.status.step > 2 ? "text-indigo-600" : "",
                                "text-right"
                              )}
                            >
                              Đã giao hàng
                            </div>
                          )}
                          {order.status.step === 5 && (
                            <div
                              className={classNames(
                                order.status.step === 5 ? "text-red-600" : "",
                                "text-right"
                              )}
                            >
                              Giao hàng thất bại
                            </div>
                          )}
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
