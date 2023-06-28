/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products-filters?category=${category.name}`}>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${category.image})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="relative w-[280px] h-[420px] hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-xl font-semibold capitalize">
            {category.name} ({category.products.length})
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
