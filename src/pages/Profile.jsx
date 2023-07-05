import {
  AccountCircleOutlined,
  FavoriteBorderOutlined,
  Inventory2Outlined,
  LocalShippingOutlined,
  PaymentOutlined,
} from "@mui/icons-material";

import { useState } from "react";

import Container from "../components/Container";
import UserDetails from "../components/profile/UserDetails";
import OrderDetails from "../components/profile/OrderDetails";
import ShippingAddress from "../components/profile/ShippingAddress";
import Payment from "../components/profile/Payment";
import Wishlist from "../components/profile/Wishlist";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index) => {
    setActiveTab(index);
  };

  return (
    <Container>
      <div className="flex lg:flex-row flex-col justify-between gap-10 mt-14">
        <ul className="flex flex-col w-full lg:w-fit h-[100%] text-[18px] bg-gray-300">
          <li
            className={`flex flex-row gap-5 items-center hover:bg-red-500 hover:text-white py-3 pl-10 pr-48 border-b border-red-300 cursor-pointer ${
              activeTab === 0 ? "bg-red-500 text-white" : ""
            }`}
            onClick={() => handleClick(0)}
          >
            <AccountCircleOutlined />
            Profile
          </li>

          <li
            className={`flex flex-row gap-5 items-center hover:bg-red-500 hover:text-white py-3 pl-10 pr-24 border-b cursor-pointer ${
              activeTab === 1 ? "bg-red-500 text-white" : ""
            }`}
            onClick={() => handleClick(1)}
          >
            <Inventory2Outlined />
            Orders
          </li>

          {/* <li
            className={`flex flex-row gap-5 items-center hover:bg-red-500 hover:text-white py-3 pl-10 pr-24 border-b border-red-300 cursor-pointer ${
              activeTab === 2 ? "bg-red-500 text-white" : ""
            }`}
            onClick={() => handleClick(2)}
          >
            <PaymentOutlined />
            Payment
          </li> */}

          {/* <li
            className={`flex flex-row gap-5 items-center hover:bg-red-500 hover:text-white py-3 pl-10 pr-24 border-b border-red-300 cursor-pointer ${
              activeTab === 3 ? "bg-red-500 text-white" : ""
            }`}
            onClick={() => handleClick(3)}
          >
            <FavoriteBorderOutlined />
            Wishlist
          </li> */}
        </ul>

        <div className="w-full md:w-[100%] h-[100%] bg-gray-300 py-5 px-4 sm:px-10">
          {activeTab === 0 && <UserDetails />}
          {activeTab === 1 && <OrderDetails />}
          {/* {activeTab === 2 && <Payment />} */}
          {/* {activeTab === 3 && <Wishlist />} */}
        </div>
      </div>
    </Container>
  );
};

export default Profile;
