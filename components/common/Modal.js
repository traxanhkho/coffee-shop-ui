import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { addItemToShoppingCart } from "@/services/shoppingCartServices";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import RadioGroup from "./RadioGroup";
import { useProduct } from "@/context/ProductContext";
import QuantityProductForm from "./QuantityProductForm";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import ToppingSelector from "../ToppingSelector";
import PriceFormmater from "./PriceFormmater";

export default function Modal({ open, setOpen }) {
  const { productSelected , shoppingCart , setShoppingCart} = useProduct();
  const [selectedSize, setSelectedSize] = useState(null);

  const methods = useForm({
    defaultValues: {
      productQuantity: 1,
      toppings: [],
    },
  });

  const { control, register, setValue, handleSubmit, getValues, reset } =
    methods;

  const { fields } = useFieldArray({
    control,
    name: "toppings",
  });

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  useEffect(() => {
    if (productSelected) {
      setSelectedSize(productSelected.sizes.find((size) => size.name == "vừa"));
      setValue("toppings", productSelected.toppings);
    }
  }, [productSelected]);

  const handleSelectSize = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = (data) => {
    const formItem = _.cloneDeep(data);
    formItem.size = _.cloneDeep(selectedSize);

    const productSelectItem = _.pick(productSelected, ["name", "_id", "price"]);

    const cartItem = _.assign({}, productSelectItem, formItem);
    const shoppingCartUpdated = _.concat(shoppingCart, cartItem);

    setShoppingCart(shoppingCartUpdated);
    
    addItemToShoppingCart(shoppingCartUpdated);
  };

  const onSubmit = (data) => {
    handleAddToCart(data);
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 max-h-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormProvider {...methods}>
                    <div className="px-4 pt-5 sm:p-6">
                      <div className="mt-3 sm:mt-0 ">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium text-center pb-2 leading-6 text-gray-900 border-b border-gray-200"
                        >
                          Thêm món mới
                        </Dialog.Title>
                        <div className="mt-2">
                          {productSelected && (
                            <div className="grid grid-cols-5 gap-4">
                              <div className="col-span-2 aspect-w-4 aspect-h-4">
                                <img
                                  src={productSelected.image?.url}
                                  className=" rounded-md"
                                  alt="product picture"
                                />
                              </div>
                              <div className="col-span-3">
                                <h3 className="font-semibold text-xl">
                                  {productSelected.name}
                                </h3>
                                <p className="text-sm text-[#666]">
                                  {productSelected.description}
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                  <PriceFormmater
                                    priceInVND={productSelected.price}
                                  />
                                  <QuantityProductForm
                                    name={"productQuantity"}
                                    defaultValue={1}
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="mt-4 flex space-x-1 min-h-11 border rounded-md overflow-hidden">
                            <label className="bg-[#f5f5f5]">
                              <PencilSquareIcon className="h-6 w-6 m-3 text-gray-400" />
                            </label>
                            <input
                              {...register("orderNote")}
                              name="orderNote"
                              type="text"
                              className="flex-1 px-3 placeholder:text-sm border-none focus:ring-0 outline-0"
                              placeholder="Ghi chú thêm cho món này"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="min-h-[42px] bg-[#ededed] px-4 sm:px-6 flex items-center">
                        <h4 className="text-[#666] text-xs font-medium">
                          CHỌN SIZE (BẮT BUỘC)
                        </h4>
                      </div>

                      <div className="px-4 py-4 sm:p-6">
                        <RadioGroup
                          productSizes={productSelected?.sizes}
                          selectedSize={selectedSize}
                          onSelectSize={handleSelectSize}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="min-h-[42px] bg-[#ededed] px-4 sm:px-6 flex items-center">
                        <h4 className="text-[#666] text-xs font-medium">
                          CHỌN TOPPING (TÙY CHỌN)
                        </h4>
                      </div>

                      <div>
                        {productSelected?.toppings &&
                          fields.map((topping, index) => (
                            <div
                              key={topping._id}
                              className="p-4 sm:p-6 sm:py-2 border-b "
                            >
                              <ToppingSelector
                                fieldIndex={index}
                                topping={topping}
                              />
                            </div>
                          ))}

                        {!productSelected?.toppings?.length && (
                          <p className="py-2 px-6">
                            Hiện tại không còn topping cho sản phẩm này.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className=" px-4 pt-4 sm:p-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-full border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-500 sm:text-sm"
                      >
                        45.000đ - Thêm vào giỏ hàng
                      </button>
                    </div>
                  </FormProvider>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
