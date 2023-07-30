import GenreCard from "./common/GenreCard";
const genres = [
  {
    _id: "1",
    name: "bánh ngọt",
    imgUrl:
      "https://minio.thecoffeehouse.com/image/admin/1686899812_ic-tra-trai-cay.png",
  },
  {
    _id: "2",
    name: "nước ngọt các loại",
    imgUrl:
      "https://minio.thecoffeehouse.com/image/admin/1686899812_ic-tra-trai-cay.png",
  },
  {
    _id: "3",
    name: "đá xay",
    imgUrl:
      "https://minio.thecoffeehouse.com/image/admin/1686899812_ic-tra-trai-cay.png",
  },
  {
    _id: "4",
    name: "bánh ngọt",
    imgUrl:
      "https://minio.thecoffeehouse.com/image/admin/1686899812_ic-tra-trai-cay.png",
  },
  {
    _id: "5",
    name: "bánh ngọt",
    imgUrl:
      "https://minio.thecoffeehouse.com/image/admin/1686899812_ic-tra-trai-cay.png",
  },
];

export default function GenreGroup() {
  return (
    <ul role="list" className="flex justify-center flex-wrap gap-6">
      {genres.map((genreItem) => (
        <li key={genreItem._id} className="inline-block">
          <GenreCard imgUrl={genreItem.imgUrl} name={genreItem.name} />
        </li>
      ))}
    </ul>
  );
}
