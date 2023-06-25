/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import Button from "./Button";
import CircularLoading from "./loaders/CircularLoading";

const Card = ({ product }) => {
  return (
    <Link>
      <div className="flex flex-col gap-2 w-[280px]">
        <div>
          <img
            src={product.images[0]}
            alt="product.images[0]"
            className="rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2 px-3">
          <div className="text-xl font-semibold mt-3">{product.name}</div>
          <h3 className="font-semibold">₹ {product.price}</h3>
          <Button type="addToCartBtn">Add To Cart</Button>

          {/* {loading ? (
            <Button type="innerBtn" disabled>
              <div className="flex flex-row items-center justify-center gap-2">
                <div>Loading...</div>
                <CircularLoading />
              </div>
            </Button>
          ) : (
            <Button type="innerBtn">Add To Cart</Button>
          )} */}
        </div>
      </div>
    </Link>
  );
};

export default Card;
