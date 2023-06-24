/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Home from "../pages/Home";
import Login from "../pages/Login";

const AuthRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userToken"));
  // if (user) {
  //   return <Home />;
  // }

  const isLoggedIn = user?.token ? true : false;
  if (!isLoggedIn) return <Login />;
  return <>{children}</>;
};

export default AuthRoute;
