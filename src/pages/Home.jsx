import Slider from "../components/home/Slider";
import Button from "../components/Button";

import offerBanner from "../assets/images/home/offer-banner.jpeg";

const Home = () => {
  return (
    <div>
      <Slider />

      <div className="flex flex-col items-center justify-center gap-7 text-center my-16">
        <h2 className="text-5xl font-bold">
          Get 25% off during our one-time sale
        </h2>
        <p className="text-xl font-medium text-gray-500">
          Most of our products are limited releases that won&#39;t come back.
          <br />
          Get your favorite items while they&#39;re in stock.
        </p>
        <Button type="longBtn">Get access to our one-time sale</Button>
      </div>

      <div
        className="bg-cover bg-no-repeat bg-left-top w-[100%] h-[80vh] flex flex-col justify-center items-end pr-24"
        style={{ backgroundImage: `url(${offerBanner})` }}
      >
        <div></div>
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-bold">Summer Sale!</h3>
          <h2 className="text-5xl font-bold leading-tight tracking-wide">
            50% Off on All <br /> Products
          </h2>
          <div className="w-[100%] mt-3">
            <Button type="primaryBtn">Shop Now!</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
