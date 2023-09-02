"use client";
import axios from "axios";
import Joi from "joi";
import Layouts from "@/components/Layouts";
import ShoppingCartEmpty from "@/components/ShoppingCartEmpty";
import Input from "@/components/common/Input";
import ShoppingCartNotiacation from "@/components/common/ShoppingCartNotiacation";
import { useCustomer } from "@/context/CustomerContext";
import { useProduct } from "@/context/ProductContext";

import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { validateForm } from "@/context/validateForm";
import CountrySelect from "@/components/CountrySelect";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { useOrder } from "@/context/OrderContext";
import PriceFormmater from "@/components/common/PriceFormmater";
import Modal from "@/components/common/Modal";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { currentCustomer, setCurrentCustomer } = useCustomer();
  const { shoppingCart, locationData, cleanShoppingCart } = useProduct();
  const { setOrders } = useOrder();

  const router = useRouter();

  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [totalPriceShoppingCart, setTotalPriceShoppingCart] = useState(0);

  const methods = useForm();

  const { handleSubmit, setError, setValue } = methods;

  const handleSetDefaultValues = () => {
    if (currentCustomer?.address && currentCustomer?.name) {
      const defaultValues = {
        name: currentCustomer.name,
        numberPhone: currentCustomer.numberPhone,
        street: currentCustomer.address.street,
        city: currentCustomer.address.city.id,
        district: currentCustomer.address.district.id,
        ward: currentCustomer.address.ward.id,
      };
      Object.keys(defaultValues).forEach((key) => {
        setValue(key, defaultValues[key]);
      });
    } else {
      setValue("numberPhone", currentCustomer?.numberPhone);
    }
  };

  useEffect(() => {
    handleSetDefaultValues();
  }, [currentCustomer]);

  useEffect(() => {
    if (shoppingCart) {
      let totalPrice = 0;
      shoppingCart.forEach((itemCart) => (totalPrice += itemCart.totalAmount));
      setTotalPriceShoppingCart(totalPrice);
    }
  }, []);

  const resetCountry = (location) => {
    if (location === "city") {
      setDistricts([]);
      setWards([]);
      setValue("district", "");
      setValue("ward", "");
    } else if (location === "district") {
      setWards([]);
      setValue("ward", "");
    }
  };

  const handleUpdateCustomer = async (data) => {
    if (!currentCustomer)
      return alert(`bạn chưa đăng nhập, vui lòng đăng nhập!`);

    const customer = _.pick(data, [
      "name",
      "city",
      "district",
      "ward",
      "street",
      "numberPhone",
    ]);

    const customerSchema = Joi.object({
      name: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      ward: Joi.string().required(),
      street: Joi.string().required(),
      numberPhone: Joi.string().required(),
    });

    const customerUpdated = {
      name: data.name,
      address: {
        city: data.city,
        district: data.district,
        ward: data.ward,
        street: data.street,
      },
    };

    const validationErrors = await validateForm(
      customerSchema,
      customer,
      setError
    );

    if (Object.keys(validationErrors).length > 0)
      return console.error(validationErrors);

    const loading = toast.loading("Đang cập nhật thông tin.", {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_KEY}/customers/${currentCustomer._id}`,
        customerUpdated
      );

      if (data) {
        toast.update(loading, {
          render: "Cập nhật thành công.",
          type: "success",
          isLoading: false,
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 1200,
          className: "custom-toast",
          theme: "dark",
          hideProgressBar: true,
        });

        setCurrentCustomer(data);
      }
    } catch (ex) {
      console.error(ex);

      toast.update(loading, {
        render: "Đã xảy ra lỗi.",
        type: "error",
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1200,
        isLoading: false,
        theme: "dark",
        hideProgressBar: true,
      });
    }
  };

  const handleOrderProducts = async (data) => {
    if (!currentCustomer)
      return alert(`bạn chưa đăng nhập, vui lòng đăng nhập!`);

    const customer = _.pick(data, [
      "name",
      "city",
      "district",
      "ward",
      "street",
      "numberPhone",
    ]);

    const customerSchema = Joi.object({
      name: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      ward: Joi.string().required(),
      street: Joi.string().required(),
      numberPhone: Joi.string().required(),
    });

    const validationErrors = await validateForm(
      customerSchema,
      customer,
      setError
    );

    if (Object.keys(validationErrors).length > 0)
      return console.error(validationErrors);

    const orderShippingAddressInformation = {
      name: data.name,
      address: {
        city: data.city,
        district: data.district,
        ward: data.ward,
        street: data.street,
      },
      numberPhone: data.numberPhone,
    };

    const orderProducts = shoppingCart.map((item) => {
      const product = {};
      product.note = item?.orderNote;
      product.productId = item._id;
      product.quantity = item.productQuantity;
      product.size = item.size._id;

      product.toppings = item.toppings
        .filter((topping) => topping.quantity > 0)
        .map((filteredTopping) => ({
          toppingId: filteredTopping._id,
          quantity: filteredTopping.quantity,
        }));

      return product;
    });

    const orderShoppingCart = {
      orderShippingAddressInformation: _.cloneDeep(
        orderShippingAddressInformation
      ),
      products: _.cloneDeep(orderProducts),
    };

    const loading = toast.loading("Đang đặt hàng...", {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    if (shoppingCart.length === 0)
      return toast.update(loading, {
        render: "Giỏ hàng đang trống.",
        type: "warning",
        isLoading: false,
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 800,
        className: "custom-toast",
        theme: "dark",
        closeButton: true,
        closeOnClick: true,
        hideProgressBar: true,
      });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/orders`,
        orderShoppingCart,
        {
          headers: {
            "x-auth-token": localStorage.getItem("currentCustomer"),
          },
        }
      );

      if (response) {
        toast.update(loading, {
          render: "Đã đặt hàng thành công.",
          type: "success",
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 1200,
          isLoading: false,
          theme: "dark",
          hideProgressBar: true,
        });

        setOrders((orders) => _.concat(orders, response.data));

        cleanShoppingCart();
      }
    } catch (ex) {
      console.error(ex);
      toast.update(loading, {
        render: "Đã xảy ra lỗi.",
        type: "error",
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1200,
        isLoading: false,
        theme: "dark",
        hideProgressBar: true,
      });
    }
  };

  // animation for hover button update .

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Layouts>
      {/* <ContainerWrapper> */}
      <Modal onClose={() => router.push("/checkout")} />
      <div className="py-8">
        <h4 className="text-center font-bold text-3xl">Xác nhận đơn hàng</h4>
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div className="h-full px-6 py-4">
            <div className="flex justify-between align-center ">
              <h2 className="font-semibold">Phương thức nhận hàng</h2>
              <div className="relative">
                <button
                  onClick={handleSubmit(handleUpdateCustomer)}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  className="px-2 py-1 rounded-md shadow bg-green-200 hover:bg-green-400"
                >
                  Cập nhật
                </button>
                {isHovering && (
                  <span className="absolute text-xs block min-w-[160px]  top-0 right-full">
                    *Lưu ý: Chỉ dùng để cập nhật thông tin chính.
                  </span>
                )}
              </div>
            </div>
            <span className="block h-[2px] w-12 rounded-md mt-2 bg-orange-400"></span>
            <form className="flex-column space-y-6 mt-4">
              <FormProvider {...methods}>
                <Input
                  name="name"
                  label="Tên Khách hàng"
                  placeholder={"Nhập tên khách hàng"}
                />

                <CountrySelect
                  fieldName={"city"}
                  data={locationData}
                  setData={setDistricts}
                  resetCountry={resetCountry}
                  label="Chọn Tỉnh/Thành"
                />

                <CountrySelect
                  fieldName={"district"}
                  data={districts}
                  setData={setWards}
                  resetCountry={resetCountry}
                  label="Chọn Quận/Huyện"
                />

                <CountrySelect
                  fieldName={"ward"}
                  data={wards}
                  resetCountry={resetCountry}
                  label="Chọn Phường/Xã"
                />

                <Input
                  name="street"
                  label="Số nhà tên đường"
                  placeholder={"Nhập tên đường và số nhà"}
                />
                <Input
                  name="numberPhone"
                  label="Số điện thoại"
                  placeholder={"Nhập số điện thoại liên lạc"}
                  type="number"
                />
              </FormProvider>
            </form>
            <h4 className="text-xs">
              *Lưu ý: bạn có thể thay đổi địa chỉ và thông tin nhận hàng, và bạn
              không cần phải nhấn nút cập nhật mỗi lần thay đổi thông tin. Nút
              cập nhật chỉ dành khi bạn muốn thay đổi thông tin chính.
            </h4>
          </div>
          <div className="rounded-md relative shadow-lg px-6 py-4">
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
            {!shoppingCart.length && <ShoppingCartEmpty />}
            {shoppingCart.map((cartItem, index) => (
              <ShoppingCartNotiacation key={index} cartItem={cartItem} />
            ))}

            <h2 className="font-semibold mt-4">Tổng cộng</h2>
            <span className="block h-[2px] w-12 rounded-md mt-1 bg-orange-400"></span>
            <ul className="mt-2">
              <li className="flex items-center justify-between py-4 border-b ">
                <p>Phí giao hàng</p>
                <p>0đ</p>
              </li>
              <li className="flex items-center justify-between py-4">
                <p>Thành tiền</p>
                <PriceFormmater priceInVND={totalPriceShoppingCart} />
              </li>
            </ul>
            <button
              onClick={handleSubmit(handleOrderProducts)}
              className="w-full h-10 rounded-3xl mb-[-10px] text-white bg-orange-400"
            >
              Đặt hàng
            </button>

            <button
              onClick={() => cleanShoppingCart()}
              className="absolute  top-full mt-4 hover:text-orange-400 left-1/2 transform -translate-x-1/2"
            >
              Xóa đơn hàng
            </button>
          </div>
        </div>
      </div>
      {/* </ContainerWrapper> */}
    </Layouts>
  );
}
