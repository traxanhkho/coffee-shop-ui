import Link from "next/link";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
  {
    id: 1,
    name: "Đường Đen Sữa Đá",
    category: "UI Kit",
    href: "#",
    price: "45.000 đ",
    imageSrc:
      "https://product.hstatic.net/1000075078/product/1686716532_dd-suada_4f58fb2c8ea8448f81610fb7a8fbb618.jpg",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  {
    id: 2,
    name: "Đường Đen Sữa Đá",
    category: "UI Kit",
    href: "#",
    price: "45.000 đ",
    imageSrc:
      "https://product.hstatic.net/1000075078/product/1686716532_dd-suada_4f58fb2c8ea8448f81610fb7a8fbb618.jpg",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  {
    id: 3,
    name: "Đường Đen Sữa Đá",
    category: "UI Kit",
    href: "#",
    price: "45.000 đ",
    imageSrc:
      "https://product.hstatic.net/1000075078/product/1686716532_dd-suada_4f58fb2c8ea8448f81610fb7a8fbb618.jpg",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  {
    id: 4,
    name: "Đường Đen Sữa Đá",
    category: "UI Kit",
    href: "#",
    price: "45.000 đ",
    imageSrc:
      "https://product.hstatic.net/1000075078/product/1686716532_dd-suada_4f58fb2c8ea8448f81610fb7a8fbb618.jpg",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  
  // More products...
];

export default function ProductGroup() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-lg font-medium text-gray-900">
            Danh sách Bánh Ngọt
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 sm:gap-y-10 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-w-4 aspect-h-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
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
                  <Link href="#" className="text-base font-semibold text-c-black-400" >
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                <p className="text-sm text-c-gray-200">Giá tiền: {product.price}</p>
              </div>
              {/* <p className="mt-1 text-sm text-gray-500">{product.category}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
