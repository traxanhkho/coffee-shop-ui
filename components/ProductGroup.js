import Link from "next/link";
import { useEffect } from "react";
import { useProduct } from "@/context/ProductContext";
import { useRouter } from "next/navigation";
import Modal from "./common/Modal";
import PriceFormmater from "./common/PriceFormmater";

export default function ProductGroup() {
  const { products, categorySelected, setOpenProductModal } = useProduct();
  const router = useRouter();

  useEffect(() => {
    setOpenProductModal(false);
  }, []);

  return (
    <>
      <Modal onClose={() => router.push("/")} />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex items-center justify-between space-x-4">
            <h2 className="text-lg font-medium text-gray-900">
              {categorySelected
                ? `Danh sách sản phẩm ${categorySelected.name}`
                : "Danh sách tất cả sản phẩm"}
            </h2>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 sm:gap-y-10 lg:grid-cols-4">
            {products &&
              products.map((product) => (
                <div key={product._id} className="group relative">
                  <div className="aspect-w-4 aspect-h-4 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.image?.url}
                      alt="hình ảnh sản phẩm"
                      className="object-cover object-center"
                    />
                    <div
                      className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <div className="w-full rounded-md bg-white bg-opacity-75 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                        Thêm vào giỏ hàng
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-base font-medium text-gray-900">
                    <h3>
                      <Link
                        href={`?productId=${product._id}`}
                        onClick={() => setOpenProductModal(true)}
                        className="text-base font-semibold text-c-black-400"
                      >
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <div className="text-sm text-c-gray-200">
                      <PriceFormmater
                        textBefore="Giá tiền:"
                        priceInVND={product.price}
                      />
                    </div>
                  </div>
                </div>
              ))}
            {!products ||
              (products.length === 0 && (
                <p className="text-center">Danh sách sản phẩm đang trống.</p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
