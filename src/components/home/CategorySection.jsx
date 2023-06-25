/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "../Container";
import TitleLink from "../TitleLink";
import baseURL from "../../utils/baseURL";
import CategoryCard from "../CategoryCard";
import SpinLoading from "../loaders/SpinLoading";
import { fetchProductsAction } from "../../redux/slices/productsSlice";

const CategorySection = () => {
  // Get Products from the Store
  const {
    products: { products },
    loading,
    error,
  } = useSelector((state) => state?.products);

  // Dispatch
  let productUrl = `${baseURL}/products`;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchProductsAction({
        url: productUrl,
      })
    );
  }, [dispatch, productUrl]);

  return (
    <section className="my-24">
      <Container>
        <TitleLink title="Shop By Category" link="View All Categories" />

        <div className="flex flex-wrap flex-row items-center justify-center gap-10 lg:gap-4 mt-8">
          {error ? (
            "Something went wrong!"
          ) : loading ? (
            <SpinLoading />
          ) : (
            products?.map((product) => (
              <CategoryCard key={product._id} product={product} />
            ))
          )}
        </div>
      </Container>
    </section>
  );
};

export default CategorySection;
