import CategoryCard from "./common/CategoryCard";
import { useRouter } from "next/navigation";
import { useProduct } from "@/context/ProductContext";
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
  const { setCategorySelected, categories } = useProduct();

  const handleSelectCategory = (category) => {
    setCategorySelected(category);
    const formattedCategory = category.name.replace(/ /g, "-");
    router.push(`?categorySelected=${formattedCategory}`);
  };

  return (
    <ul role="list" className="flex justify-center flex-wrap gap-6">
      {categories &&
        categories.map((category) => (
          <li key={category._id} className="inline-block">
            <button onClick={() => handleSelectCategory(category)}>
              <CategoryCard imgUrl={category.image?.url} name={category.name} />
            </button>
          </li>
        ))}
    </ul>
  );
}
