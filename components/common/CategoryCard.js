import React from "react";

function CategoryCard({ imgUrl, name , isSelected = false }) {
  return (
    <div className="group transition-colors">
      <div className={`h-24 w-24 flex  ${isSelected ? "bg-orange-200" : "bg-c-orange-200"} group-hover:bg-orange-200 rounded-md shadow`}>
        <div className="h-12 w-12 m-auto">
          <img src={imgUrl} alt="category picture" className="w-full h-full object-cover" />
        </div>
      </div>
      <p className={`w-24 font-bold ${isSelected ? "text-orange-500" : ""} group-hover:text-orange-500 text-xs mt-2 text-center text-ellipsis overflow-hidden  line-clamp-2 capitalize`}>
        {name}
      </p>
    </div>
  );
}

export default CategoryCard;
