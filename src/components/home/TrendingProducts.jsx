import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../Card";
import Container from "../Container";
import TitleLink from "../TitleLink";
import baseURL from "../../utils/baseURL";
import { fetchProductsAction } from "../../redux/slices/productsSlice";
import SpinLoading from "../loaders/SpinLoading";

const TrendingProducts = () => {
  // Get Products from the Store
  const { products, loading, error } = useSelector(
    (state) => state?.products?.products
  );

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
        <TitleLink title="Trending Products" link="Browse All Products" />

        <div className="flex flex-wrap flex-row items-center justify-center lg:justify-between gap-10 lg:gap-4 mt-8">
          {error
            ? "Something went wrong!"
            : loading
            ? // <SpinLoading />
              "loading..."
            : products?.map((product) => (
                <Card key={product._id} product={product} />
              ))}
        </div>
      </Container>
    </section>
  );
};

export default TrendingProducts;
