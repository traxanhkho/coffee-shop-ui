import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Link from "next/link";
import { useProduct } from "@/context/ProductContext";

function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { setOpenProductModal } = useProduct() ; 



  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/search?q=${searchTerm}`
        );
        setResults(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchTerm !== "") {
      fetchResults();
    } else {
      setResults([]); // Clear results if search term is empty
    }
  }, [searchTerm]);

  return (
    <div className="w-full sm:max-w-xs">
      <label htmlFor="search" className="sr-only">
        Tìm kiếm sản phẩm
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          id="search"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          placeholder="Tìm kiếm"
          type="search"
        />
        
        <ul className="absolute left-0 bg-c-orange-200 rounded-md w-full shadow overflow-hidden">
          {results.map((result) => (
            <li key={result._id}>
              <Link
                 href={`?productId=${result._id}`}
                 onClick={() => setOpenProductModal(true)}
                className="px-4 py-2 hover:text-orange-400 block border-b border-gray-200 "
              >
                {result.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
