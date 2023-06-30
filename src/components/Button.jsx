/* eslint-disable react/prop-types */
const Button = ({ children, type, onClick, disabled, btnType }) => {
  if (type === "primaryBtn") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="bg-cyan-800 hover:bg-cyan-900 focus:outline-none focus:shadow-lg text-lg text-white font-medium font-heading py-[14px] px-[50px] rounded-md disabled:bg-opacity-75 disabled:cursor-not-allowed"
      >
        {children}
      </button>
    );
  } else if (type === "longBtn") {
    return (
      <button
        disabled={disabled}
        className="bg-black hover:bg-opacity-80 focus:outline-none focus:shadow-lg text-lg md:text-xl text-white font-medium font-heading py-[12px] md:py-[14px] px-[20px] md:px-[50px] rounded-md disabled:bg-opacity-75 disabled:cursor-not-allowed"
      >
        {children}
      </button>
    );
  } else if (type === "addToCartBtn") {
    return (
      <button
        disabled={disabled}
        className="bg-cyan-800 hover:bg-cyan-900 focus:outline-none focus:shadow-lg text-md text-white font-medium font-heading py-[10px] px-[35px] mt-2 rounded-md disabled:bg-opacity-75 disabled:cursor-not-allowed"
      >
        {children}
      </button>
    );
  } else if (type === "paginationBtn") {
    return (
      <button
        disabled={disabled}
        className="w-10 h-10 bg-cyan-800 hover:bg-cyan-900 focus:outline-none focus:shadow-lg text-md text-white font-medium mt-2 rounded-md disabled:bg-opacity-75 disabled:cursor-not-allowed"
      >
        {children}
      </button>
    );
  } else if (type === "productPageBtn") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${
          btnType === "checkOut"
            ? "bg-red-500 hover:bg-red-400 whitespace-nowrap"
            : "bg-cyan-800 hover:bg-cyan-900"
        } w-[250px]  focus:outline-none focus:shadow-lg text-lg text-white font-medium font-heading py-[14px] rounded-md disabled:bg-opacity-75 disabled:cursor-not-allowed`}
      >
        {children}
      </button>
    );
  } else if (type === "greenBtn") {
    return (
      <button className="inline-flex  text-center mt-4 items-center rounded border border-transparent bg-green-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:border-zinc-200 focus:ring-zinc-200">
        {children}
      </button>
    );
  }
};

export default Button;
