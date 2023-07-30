import Link from "next/link";
import React from "react";

function GenreCard({ imgUrl, name }) {
  return (
    <Link href="#" className="group transition-colors">
      <div className="h-24 w-24 flex bg-c-orange-200 group-hover:bg-orange-200 rounded-md shadow">
        <div className="h-12 w-12 m-auto">
          <img src={imgUrl} className="w-full h-full object-contain" />
        </div>
      </div>
      <p className="w-24 font-bold group-hover:text-orange-500 text-xs mt-2 text-center text-ellipsis overflow-hidden  line-clamp-2 capitalize">
        {name}
      </p>
    </Link>
  );
}

export default GenreCard;
