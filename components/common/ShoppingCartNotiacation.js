import React from "react";

function ShoppingCartNotiacation(props) {
  return (
    <div className="text-[14px] mt-2 relative">
      <h4 className="font-semibold">{`4 x Trà sữa dâu`}</h4>
      <p className="capitalize">{`Size: Lớn`}</p>

      <p>{`+ trân châu đen x 2`}</p>

      <p className="absolute text-[16px] right-0 top-1/2 transform -translate-y-1/2">
        140.000 đ
      </p>
    </div>
  );
}

export default ShoppingCartNotiacation;
