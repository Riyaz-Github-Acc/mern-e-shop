/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import Button from "./Button";

const Card = ({ product }) => {
  return (
    <Link to={`/products/${product?.id}`}>
      <div className="flex flex-col gap-2 w-[280px] rounded-lg group hover:bg-zinc-200 hover:shadow-xl transition-all duration-500 overflow-hidden">
        <div className="relative w-[100%] h-[420px]">
          <img
            src={product?.images[0]}
            alt="product.images[0]"
            className="absolute w-[100%] h-[100%] object-cover z-10"
          />
          <img
            src={product?.images[1]}
            alt="product.images[1]"
            className="absolute w-[100%] h-[100%] object-cover group-hover:z-20"
          />

          {product?.qtyLeft <= 0 && (
            <div className="absolute top-3 right-2 text-sm text-white font-medium bg-red-500 px-2 py-1 rounded-md z-40">
              Out Of Stock!
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 px-4 py-4">
          <div className="text-xl font-semibold">{product?.name}</div>
          <h3 className="font-semibold">₹ {product?.price}</h3>
          {product?.qtyLeft <= 0 ? (
            <Button type="primaryBtn" btnType="addToCart">
              Read More
            </Button>
          ) : (
            <Button type="primaryBtn" btnType="addToCart">
              Add To Cart
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
