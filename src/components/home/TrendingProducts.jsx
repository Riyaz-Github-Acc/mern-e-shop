/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../Card";
import Container from "../Container";
import TitleLink from "../TitleLink";
import baseURL from "../../utils/baseURL";
import { fetchProductsAction } from "../../redux/slices/productsSlice";
import SpinLoading from "../loaders/SpinLoading";

const TrendingProducts = () => {
  // Get Data from the Store
  const {
    products: { products },
    loading,
    error,
  } = useSelector((state) => state?.products);

  // Build URL
  let productUrl = `${baseURL}/products?page=1&limit=4`;

  // Dispatch
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
        <TitleLink
          title="Trending Products"
          linkText="Browse All Products"
          link="/shop"
        />

        <div className="flex flex-wrap flex-row items-center justify-center gap-10 lg:gap-4 mt-8">
          {error ? (
            "Something went wrong!"
          ) : loading ? (
            <SpinLoading />
          ) : (
            products?.map((product) => (
              <Card key={product.id} product={product} />
            ))
          )}
        </div>
      </Container>
    </section>
  );
};

export default TrendingProducts;
