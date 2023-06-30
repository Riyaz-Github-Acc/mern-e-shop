/* eslint-disable no-unused-vars */
import {
  Person4Outlined,
  VolunteerActivismOutlined,
  LocalMallOutlined,
  DragHandleOutlined,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Container from "../../components/Container";
import logo from "../../assets/images/logos/logo.png";

const Navbar = () => {
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

  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  // Store the Link in LocalStorage
  useEffect(() => {
    localStorage.setItem("activeLink", location.pathname);
    setActiveLink(location.pathname);
  }, [location]);

  // Get Link from LocalStorage
  useEffect(() => {
    const storedActiveLink = localStorage.getItem("activeLink");
    setActiveLink(storedActiveLink || "/");
  }, []);

  // Find the User
  const user = JSON.parse(localStorage.getItem("userToken"));
  const isLoggedIn = user?.token ? true : false;

  return (
    <div className="z-20 relative bg-zinc-200">
      <Container>
        <div className="flex flex-row items-center justify-between">
          <div className="py-1">
            <Link to="/" onClick={() => setOpen(false)}>
              <img src={logo} alt="logo" className="w-auto h-10 md:h-14" />
            </Link>
          </div>

          <div className="flex flex-row gap-3 md:gap-5 items-center">
            <nav className="flex flex-row gap-4 items-center">
              <div
                className={`md:flex md:flex-row gap-5 items-center text-[18px] font-medium ${
                  !open
                    ? "hidden"
                    : "z-10 absolute top-12 right-0 flex flex-col items-center justify-center gap-2 w-full bg-gray-500 text-stone-100 px-10 py-5 transition-all"
                }`}
              >
                {menus.map((menu, index) => (
                  <Link
                    key={index}
                    to={`${menu.href}`}
                    onClick={() => {
                      setActiveLink(menu.href);
                      setOpen(false);
                    }}
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

            <div className="flex flex-row gap-3 md:gap-4 items-center">
              {isLoggedIn ? (
                <Link to="/profile">
                  <Person4Outlined className="cursor-pointer" />
                </Link>
              ) : (
                <Link to="/login">
                  <Person4Outlined className="cursor-pointer" />
                </Link>
              )}

              <VolunteerActivismOutlined className="cursor-pointer" />
              <Link to="/shopping-cart">
                <LocalMallOutlined className="cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
