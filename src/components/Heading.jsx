/* eslint-disable react/prop-types */
const Heading = ({ children }) => {
  return (
    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">{children}</h2>
  );
};

export default Heading;
