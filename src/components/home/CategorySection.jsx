/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "../Container";
import TitleLink from "../TitleLink";
import baseURL from "../../utils/baseURL";
import CategoryCard from "../CategoryCard";
import SpinLoading from "../loaders/SpinLoading";
import { fetchCategoriesAction } from "../../redux/slices/categoriesSlice";

const CategorySection = () => {
  // Get Data from the Store
  const {
    categories: { categories },
    loading,
    error,
  } = useSelector((state) => state?.categories);

  // Build URL
  let categoryUrl = `${baseURL}/categories?limit=4`;

  // Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction({ url: categoryUrl }));
  }, [dispatch, categoryUrl]);

  return (
    <section className="my-24">
      <Container>
        <TitleLink
          title="Shop By Category"
          linkText="View All Categories"
          link="/shop"
        />

        <div className="flex flex-wrap flex-row items-center justify-center gap-10 lg:gap-4 mt-8">
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

export default CategorySection;
