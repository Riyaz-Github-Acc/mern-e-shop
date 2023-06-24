/* eslint-disable react/prop-types */
const Button = ({ children, type, disabled }) => {
  if (type === "primaryBtn") {
    return (
      <button
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
        className="bg-black hover:bg-opacity-80 focus:outline-none focus:shadow-lg text-xl text-white font-medium font-heading py-[14px] px-[50px] rounded-md disabled:bg-opacity-75 disabled:cursor-not-allowed"
      >
        {children}
      </button>
    );
  }
};

export default Button;
