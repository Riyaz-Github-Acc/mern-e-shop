import { Link } from "react-router-dom";

import offerBanner from "../assets/images/home/offer-banner.jpeg";

import Button from "../components/Button";
import Heading from "../components/Heading";
import Slider from "../components/home/Slider";
import Container from "../components/Container";
import TrendingProducts from "../components/home/TrendingProducts";
import CategorySection from "../components/home/CategorySection";

const Home = () => {
  return (
    <div>
      <Slider />

      <Container>
        <div className="flex flex-col items-center justify-center gap-5 text-center my-16">
          <Heading>Get 25% off during our one-time sale</Heading>

          <div className="flex flex-col gap-2 md:gap-1 text-lg md:text-xl font-medium text-gray-500 px-1">
            <p>
              Most of our products are limited releases that won&#39;t come
              back.
            </p>
            <p>Get your favorite items while they&#39;re in stock.</p>
          </div>
          <div className="mt-2">
            <Button type="longBtn">Get access to our one-time sale</Button>
          </div>
        </div>
      </Container>

      <CategorySection />

      <div
        className="bg-cover bg-no-repeat bg-left-top w-[100%] h-[80vh] flex flex-col justify-center items-end pr-24"
        style={{ backgroundImage: `url(${offerBanner})` }}
      >
        <div></div>
        <div className="flex flex-col gap-6">
          <h3 className="text-xl md:text-2xl font-bold">Summer Sale!</h3>
          <div className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide flex flex-col gap-1 md:gap-4">
            <h2>50% Off on All</h2>
            <h2>Products</h2>
          </div>
          <div className="w-[100%] mt-3">
            <Link to="/shop">
              <Button type="primaryBtn">Shop Now!</Button>
            </Link>
          </div>
        </div>
      </div>

      <TrendingProducts />
    </div>
  );
};

export default Home;
