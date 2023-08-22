
import numeral from 'numeral';

const PriceFormmater = ({ priceInVND , hasSymbol = "" , textBefore = "" }) => {
  const formattedPrice = numeral(priceInVND).format('0,0 VND');

  return <p>{`${textBefore}${hasSymbol} ${formattedPrice}đ`}</p>;
};

export default PriceFormmater;
