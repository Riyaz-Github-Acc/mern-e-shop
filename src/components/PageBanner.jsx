/* eslint-disable react/prop-types */
import pageBanner from "../assets/images/page/page-banner.jpeg";

const PageBanner = ({ pageTitle }) => {
  return (
    <section className="mb-24">
      <div
        style={{
          // background: `linear-gradient(90deg, rgba(239,68,68,0.7), rgba(21,94,117,0.7)), url(${pageBanner})`,
          background: `linear-gradient(90deg, rgba(21,94,117,0.3), rgba(21,94,117,0.4)), url(${pageBanner})`,
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="flex items-center justify-center w-full h-[340px]"
      >
        <h1 className="uppercase text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
          {pageTitle}
        </h1>
      </div>
    </section>
  );
};

export default PageBanner;
