/* eslint-disable react/prop-types */
import { KeyboardBackspace } from "@mui/icons-material";

const TitleLink = ({ title, link }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 w-full">
      <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold whitespace-nowrap">
        {title}
      </h2>
      <div className="flex flex-row items-center gap-2 text-lg md:text-lg lg:text-xl font-medium text-cyan-800 cursor-pointer hover:text-red-500 hover:underline hover:gap-3 transition-all duration-200 whitespace-nowrap">
        {link}{" "}
        <div className="rotate-180">
          <KeyboardBackspace fontSize="medium" />
        </div>
      </div>
    </div>
  );
};

export default TitleLink;
