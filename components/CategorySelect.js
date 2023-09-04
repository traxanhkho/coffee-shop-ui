import CategoryCard from "./common/CategoryCard";
import { useRouter } from "next/navigation";
import { useProduct } from "@/context/ProductContext";
import { getProducts } from "@/services/productServices";
// const categories = [
//   {
//     _id: "1",
//     name: "bánh ngọt",
//     imgUrl:
//       "https://minio.thecoffeehouse.com/image/admin/1686899812_ic-tra-trai-cay.png",
//   },
//   {
//     _id: "2",
//     name: "nước ngọt các loại",
//     imgUrl:
//       "https://minio.thecoffeehouse.com/image/admin/1686899812_ic-tra-trai-cay.png",
//   },
//   {
//     _id: "3",
//     name: "đá xay",
//     imgUrl:
//       "https://minio.thecoffeehouse.com/image/admin/1686899812_ic-tra-trai-cay.png",
//   },
//   {
//     _id: "4",
//     name: "bánh ngọt",
//     imgUrl:
//       "https://minio.thecoffeehouse.com/image/admin/1686899812_ic-tra-trai-cay.png",
//   },
//   {
//     _id: "5",
//     name: "bánh ngọt",
//     imgUrl:
//       "https://minio.thecoffeehouse.com/image/admin/1686899812_ic-tra-trai-cay.png",
//   },
// ];

export default function CategorySelect() {
  const router = useRouter();
  const { setCategorySelected, categories, setCategories, setProducts } =
    useProduct();

  const handleSelectCategory = (category) => {
    if (category.isSelected) {
      const categoriesReset = categories.map((item) => ({
        ...item,
        isSelected: false,
      }));

      setCategories(categoriesReset);
      setCategorySelected(null);
      return router.push("/");
    }

    setCategorySelected(category);

    const categoriesUpdate = categories.map((item) =>
      item._id !== category._id
        ? { ...item, isSelected: false }
        : { ...item, isSelected: true }
    );

    setCategories(categoriesUpdate);

    const formattedCategory = category.name.trimRight().replace(/ /g, "-");
    router.push(`?categorySelected=${formattedCategory}`);
  };

  return (
    <ul role="list" className="flex justify-center flex-wrap gap-6">
      {categories &&
        categories.map((category) => (
          <li key={category._id} className="inline-block">
            <button onClick={() => handleSelectCategory(category)}>
              <CategoryCard
                isSelected={category.isSelected}
                imgUrl={category.image?.url}
                name={category.name}
              />
            </button>
          </li>
        ))}
    </ul>
  );
}
