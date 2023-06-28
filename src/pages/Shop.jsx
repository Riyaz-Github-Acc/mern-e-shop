/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import baseURL from "../utils/baseURL";
import Container from "../components/Container";
import CategoryCard from "../components/CategoryCard";
import SpinLoading from "../components/loaders/SpinLoading";
import { fetchCategoriesAction } from "../redux/slices/categoriesSlice";
import PageBanner from "../components/PageBanner";

const Shop = () => {
  // Get Data from the Store
  const {
    categories: { categories },
    loading,
    error,
  } = useSelector((state) => state?.categories);

  // Build URL
  let categoryUrl = `${baseURL}/categories?limit=3`;

  // Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction({ url: categoryUrl }));
  }, [dispatch, categoryUrl]);

  return (
    <section>
      <PageBanner pageTitle="Shop" />
      <Container>
        <div className="flex flex-wrap flex-row items-center justify-center gap-10 lg:gap-4">
          {error ? (
            "Something went wrong!"
          ) : loading ? (
            <SpinLoading />
          ) : (
            categories?.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))
          )}
        </div>
      </Container>
    </section>
  );
};

export default Shop;
