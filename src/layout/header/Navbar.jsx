/* eslint-disable no-unused-vars */
import {
  Person4Outlined,
  VolunteerActivismOutlined,
  LocalMallOutlined,
  DragHandleOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import logo from "../../assets/images/logos/logo.png";

import Container from "../../components/Container";
import Search from "../../components/Search";

import { logoutAction } from "../../redux/slices/usersSlice";
import { getCartItemsFromLocalStorageAction } from "../../redux/slices/cartsSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // Find the User
  const user = JSON.parse(typeof window !== 'undefined' && localStorage.getItem("userToken"));
  const isLoggedIn = user?.token ? true : false;

  // Get Cart Items from Local Storage
  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, [dispatch]);
  const { cartItems } = useSelector((state) => state?.carts);

  // Logout Handler
  const handleLogout = () => {
    dispatch(logoutAction());

    // Reload
    window.location.reload();

    // Redirect
    window.location.href = "/login";
  };

  const menus = [
    {
      title: "Men",
      href: "/products-filters?category=men",
    },
    {
      title: "Women",
      href: "/products-filters?category=women",
    },
    {
      title: "Kids",
      href: "/products-filters?category=kids",
    },
    {
      title: "Shop",
      href: "/shop",
    },
  ];

  return (
    <div className="z-20 relative text-gray-700 bg-zinc-200">
      <Container>
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="py-1">
            <Link to="/" onClick={() => setOpen(false)}>
              <img
                src={logo}
                alt="logo"
                className="w-auto h-10 md:h-14 object-contain"
              />
            </Link>
          </div>

          <div className="w-[40%] hidden md:block rounded-md">
            <Search />
          </div>

          <div className="flex flex-row gap-3 md:gap-3 items-center">
            <nav className="flex flex-row gap-2 items-center">
              <div
                className={`md:flex md:flex-row gap-3 items-center text-[18px] font-medium ${
                  !open
                    ? "hidden"
                    : "z-10 absolute top-12 right-0 flex flex-col items-center justify-center gap-2 w-full bg-gray-500 text-stone-100 px-10 py-5 transition-all"
                }`}
              >
                {menus.map((menu, index) => (
                  <Link
                    key={index}
                    to={`${menu.href}`}
                    onClick={() => setOpen(false)}
                    className="hover:text-cyan-800"
                  >
                    {menu.title}
                  </Link>
                ))}
              </div>

              <div
                className="md:hidden visible cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <DragHandleOutlined />
              </div>
            </nav>

            <div className="flex flex-row items-center gap-2">
              {isLoggedIn ? (
                <Link to="/profile">
                  <Person4Outlined className="cursor-pointer" />
                </Link>
              ) : (
                <Link to="/login">
                  <Person4Outlined className="cursor-pointer" />
                </Link>
              )}

              {/* <VolunteerActivismOutlined className="cursor-pointer" /> */}
              <Link to="/shopping-cart" className="flex flex-row items-center">
                <LocalMallOutlined className="cursor-pointer" />
                <div className="flex items-center justify-center w-[22px] h-[22px] bg-cyan-800 text-sm text-white rounded-full p-1">
                  {cartItems?.length > 0 ? cartItems.length : 0}
                </div>
              </Link>

              {isLoggedIn && (
                <div onClick={handleLogout}>
                  <LogoutOutlined className="cursor-pointer" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
