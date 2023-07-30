"use client";

import ContainerWrapper from "@/components/ContainerWrapper";
import Layouts from "@/components/Layouts";
import Input from "@/components/common/Input";
import ProductCard from "@/components/common/ProductCard";
import RenderCity from "@/components/common/RenderCity";
import ShoppingCartNotiacation from "@/components/common/ShoppingCartNotiacation";
import Textarea from "@/components/common/Textarea";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    setError,
  } = useForm();

  return (
    <Layouts>
      {/* <ContainerWrapper> */}
      <div className=" py-8">
        <h4 className="text-center font-bold text-3xl">Xác nhận đơn hàng</h4>
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div className="h-full px-6 py-4">
            <div className="flex justify-between align-center ">
              <h2 className="font-semibold">Phương thức thanh toán</h2>
              <button
                className="px-2 py-1 rounded-md shadow bg-green-200"
              >
                Cập nhật
              </button>
            </div>
            <span className="block h-[2px] w-12 rounded-md mt-2 bg-orange-400"></span>
            <form className="flex-column space-y-6 mt-4">
              <Input
                register={register}
                name="name"
                errors={errors}
                label="Tên Khách hàng"
                placeholder={"Nhập tên khách hàng"}
              />
              <RenderCity register={register} watch={watch} errors={errors} />
              <Input
                register={register}
                name="street"
                label="Số nhà tên đường"
                errors={errors}
                placeholder={"Nhập tên đường và số nhà"}
              />
              <Input
                register={register}
                name="numberPhone"
                label="Số điện thoại"
                errors={errors}
                placeholder={"Nhập số điện thoại liên lạc"}
                type="number"
              />
              <Textarea
                register={register}
                name="note"
                label={"Thêm ghi chú đơn hàng"}
                errors={errors}
                rows={4}
              />
            </form>
          </div>
          <div className="rounded-md shadow-lg px-6 py-4">
            <div className="flex justify-between align-center ">
              <h2 className="font-semibold">Các món đã chọn</h2>
              <Link
                href={"/"}
                className="px-2 py-1 rounded-md shadow bg-c-orange-200"
              >
                Thêm món
              </Link>
            </div>
            <span className="block h-[2px] w-12 rounded-md mt-2 bg-orange-400"></span>
            <div className="text-[14px] mt-2 relative">
              <h4 className="font-semibold">4 x cà phê sữa</h4>
              <p className="capitalize">{`Size: Vừa`}</p>
              <p>+ Thạch rau câu x 2</p>
              <p className="absolute text-[16px] right-0 top-1/2 transform -translate-y-1/2">
                140.000 đ
              </p>
            </div>
            <ShoppingCartNotiacation />
            <ShoppingCartNotiacation />

            <h2 className="font-semibold mt-4">Tổng cộng</h2>
            <span className="block h-[2px] w-12 rounded-md mt-1 bg-orange-400"></span>
            <ul className="mt-2">
              <li className="flex items-center justify-between py-4 border-b ">
                <p>Phí giao hàng</p>
                <p>0đ</p>
              </li>
              <li className="flex items-center justify-between py-4">
                <p>Thành tiền</p>
                <p>200.000 đ</p>
              </li>
            </ul>
            <button className="w-full h-10 rounded-3xl mb-[-10px] text-white bg-orange-400">
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
      {/* </ContainerWrapper> */}
    </Layouts>
  );
}
