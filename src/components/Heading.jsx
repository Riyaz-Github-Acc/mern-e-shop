/* eslint-disable react/prop-types */
const Heading = ({ children }) => {
  return (
    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{children}</h2>
  );
};

export default Heading;
