/* eslint-disable no-unused-vars */
import {
  Person4Outlined,
  VolunteerActivismOutlined,
  LocalMallOutlined,
  DragHandleOutlined,
} from "@mui/icons-material";

import { useState } from "react";
import { Link } from "react-router-dom";

import Container from "../../components/Container";
import logo from "../../assets/images/logos/logo.png";

const Navbar = () => {
  // Find the User
  const user = JSON.parse(localStorage.getItem("userToken"));
  const isLoggedIn = user?.token ? true : false;

  const [open, setOpen] = useState(false);

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
                    : "z-10 absolute top-16 right-0 flex flex-col items-center justify-center gap-2 w-full bg-slate-600 text-stone-100 px-10 py-5 transition-all"
                }`}
              >
                <Link
                  to="/men"
                  onClick={() => setOpen(false)}
                  className="hover:text-cyan-800"
                >
                  Men
                </Link>
                <Link
                  to="/women"
                  onClick={() => setOpen(false)}
                  className="hover:text-cyan-800"
                >
                  Women
                </Link>
                <Link
                  to="/kids"
                  onClick={() => setOpen(false)}
                  className="hover:text-cyan-800"
                >
                  Kids
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="hover:text-cyan-800"
                >
                  Shop
                </Link>
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
              <LocalMallOutlined className="cursor-pointer" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
